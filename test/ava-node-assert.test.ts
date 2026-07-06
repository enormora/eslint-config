import assert from 'node:assert';
import nodeAssertPlugin from '@enormora/eslint-plugin-node-assert';
import { suite, test } from 'mocha';
import {
    avaNodeAssertConfig,
    testSupportConfig as avaNodeAssertTestSupportConfig
} from '../configs/presets/ava-node-assert/ava-node-assert.ts';
import { avaConfig } from '../configs/presets/ava/ava.ts';
import { nodeAssertConfig } from '../configs/presets/node-assert/node-assert.ts';
import { testSupportConfig } from '../configs/presets/test-base/test-base.ts';
import {
    assertConfigToHaveNoValidationIssues,
    checkAllPluginRulesConfigured,
    checkUnknownPluginRulesAreNotConfigured,
    findMissingConfiguredRuleNames
} from './rules-configuration.ts';

suite('ava node assert preset', function () {
    test('includes all AVA rules', function () {
        assert.deepStrictEqual(
            findMissingConfiguredRuleNames(avaConfig.rules, avaNodeAssertConfig.rules),
            [],
            'AVA node assert preset must include every AVA rule'
        );
    });

    test('includes all node assert rules', function () {
        assert.deepStrictEqual(
            findMissingConfiguredRuleNames(nodeAssertConfig.rules, avaNodeAssertConfig.rules),
            [],
            'AVA node assert preset must include every node assert rule'
        );
    });

    test('no unknown node assert rules are configured', function () {
        checkUnknownPluginRulesAreNotConfigured({
            ruleConfigSet: avaNodeAssertConfig.rules,
            pluginRules: nodeAssertPlugin.rules,
            pluginName: '@enormora/eslint-plugin-node-assert'
        });
    });

    test('all node assert plugin rules are configured', function () {
        checkAllPluginRulesConfigured({
            ruleConfigSet: avaNodeAssertConfig.rules,
            pluginRules: nodeAssertPlugin.rules,
            pluginName: '@enormora/eslint-plugin-node-assert'
        });
    });

    test('config has no validation errors', function () {
        assert.deepStrictEqual(
            assertConfigToHaveNoValidationIssues(avaNodeAssertConfig),
            [],
            'AVA node assert preset config must have no validation errors'
        );
    });

    test('testSupportConfig includes shared test support and node assert rules', function () {
        assert.deepStrictEqual(
            findMissingConfiguredRuleNames(testSupportConfig.rules, avaNodeAssertTestSupportConfig.rules),
            [],
            'AVA node assert testSupportConfig must include shared test support rules'
        );
        assert.deepStrictEqual(
            findMissingConfiguredRuleNames(nodeAssertConfig.rules, avaNodeAssertTestSupportConfig.rules),
            [],
            'AVA node assert testSupportConfig must include node assert rules'
        );
    });
});
