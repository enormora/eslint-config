import assert from 'node:assert';
import { suite, test } from 'mocha';
import eslintPluginPlugin from 'eslint-plugin-eslint-plugin';
import { createEslintPluginConfig } from '../configs/presets/eslint-plugin/eslint-plugin.ts';
import {
    checkAllPluginRulesConfigured,
    assertConfigToHaveNoValidationIssues,
    checkUnknownPluginRulesAreNotConfigured
} from './rules-configuration.ts';

const sampleDocsUrlPattern = 'https://example.com/rules/{{name}}.md';
const sampleDescriptionPattern = '^(Enforce|Require|Disallow)';
const eslintPluginConfig = createEslintPluginConfig({
    docsUrlPattern: sampleDocsUrlPattern,
    descriptionPattern: sampleDescriptionPattern
});

suite('eslint-plugin preset', function () {
    test('all eslint-plugin-eslint-plugin rules are configured', function () {
        checkAllPluginRulesConfigured({
            ruleConfigSet: eslintPluginConfig.rules,
            pluginRules: eslintPluginPlugin.rules,
            pluginName: 'eslint-plugin-eslint-plugin'
        });
    });

    test('no unknown eslint-plugin-eslint-plugin rules are configured', function () {
        checkUnknownPluginRulesAreNotConfigured({
            ruleConfigSet: eslintPluginConfig.rules,
            pluginRules: eslintPluginPlugin.rules,
            pluginName: 'eslint-plugin-eslint-plugin'
        });
    });

    test('eslint-plugin preset config has no validation errors', function () {
        assert.deepStrictEqual(
            assertConfigToHaveNoValidationIssues(eslintPluginConfig),
            [],
            'eslint-plugin preset config must have no validation errors'
        );
    });

    test('the docs URL pattern is applied to require-meta-docs-url', function () {
        const rules = eslintPluginConfig.rules ?? {};
        assert.deepStrictEqual(
            rules['eslint-plugin/require-meta-docs-url'],
            [ 'error', { pattern: sampleDocsUrlPattern } ],
            'eslint-plugin preset must configure the docs URL pattern'
        );
    });

    test('the description pattern is applied to require-meta-docs-description', function () {
        const rules = eslintPluginConfig.rules ?? {};
        assert.deepStrictEqual(
            rules['eslint-plugin/require-meta-docs-description'],
            [ 'error', { pattern: sampleDescriptionPattern } ],
            'eslint-plugin preset must configure the description pattern'
        );
    });

    test('throws when docsUrlPattern does not contain the {{name}} placeholder', function () {
        assert.throws(
            function createWithInvalidDocsUrlPattern() {
                return createEslintPluginConfig({
                    docsUrlPattern: 'https://example.com/rules/foo.md',
                    descriptionPattern: sampleDescriptionPattern
                });
            },
            TypeError,
            'createEslintPluginConfig must reject docs URL patterns without the rule name placeholder'
        );
    });

    test('throws when docsUrlPattern is not a string', function () {
        assert.throws(
            function createWithMissingDocsUrlPattern() {
                return createEslintPluginConfig({
                    docsUrlPattern: undefined as unknown as string,
                    descriptionPattern: sampleDescriptionPattern
                });
            },
            TypeError,
            'createEslintPluginConfig must reject non-string docs URL patterns'
        );
    });

    test('throws when descriptionPattern is not a string', function () {
        assert.throws(
            function createWithMissingDescriptionPattern() {
                return createEslintPluginConfig({
                    docsUrlPattern: sampleDocsUrlPattern,
                    descriptionPattern: undefined as unknown as string
                });
            },
            TypeError,
            'createEslintPluginConfig must reject non-string description patterns'
        );
    });
});
