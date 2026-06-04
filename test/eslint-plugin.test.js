import assert from 'node:assert';
import { suite, test } from 'mocha';
import eslintPluginPlugin from 'eslint-plugin-eslint-plugin';
import { createEslintPluginConfig } from '../configs/presets/eslint-plugin/eslint-plugin.js';
import {
    checkAllPluginRulesConfigured,
    checkConfigToHaveNoValidationIssues,
    checkUnknownPluginRulesAreNotConfigured
} from './rules-configuration.js';

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
        checkConfigToHaveNoValidationIssues(eslintPluginConfig);
    });

    test('the docs URL pattern is applied to require-meta-docs-url', function () {
        assert.deepStrictEqual(
            eslintPluginConfig.rules['eslint-plugin/require-meta-docs-url'],
            [ 'error', { pattern: sampleDocsUrlPattern } ]
        );
    });

    test('the description pattern is applied to require-meta-docs-description', function () {
        assert.deepStrictEqual(
            eslintPluginConfig.rules['eslint-plugin/require-meta-docs-description'],
            [ 'error', { pattern: sampleDescriptionPattern } ]
        );
    });

    test('throws when docsUrlPattern does not contain the {{name}} placeholder', function () {
        assert.throws(
            () => {
                return createEslintPluginConfig({
                    docsUrlPattern: 'https://example.com/rules/foo.md',
                    descriptionPattern: sampleDescriptionPattern
                });
            },
            TypeError
        );
    });

    test('throws when docsUrlPattern is not a string', function () {
        assert.throws(
            () => {
                return createEslintPluginConfig({
                    docsUrlPattern: undefined,
                    descriptionPattern: sampleDescriptionPattern
                });
            },
            TypeError
        );
    });

    test('throws when descriptionPattern is not a string', function () {
        assert.throws(
            () => {
                return createEslintPluginConfig({
                    docsUrlPattern: sampleDocsUrlPattern,
                    descriptionPattern: undefined
                });
            },
            TypeError
        );
    });
});
