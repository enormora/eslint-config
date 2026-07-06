import assert from 'node:assert';
import nodeAssertPlugin from '@enormora/eslint-plugin-node-assert';
import { suite, test } from 'mocha';
import { nodeAssertConfig } from '../configs/presets/node-assert/node-assert.ts';
import { testSupportConfig } from '../configs/presets/test-base/test-base.ts';
import {
    testSupportConfig as vitestNodeAssertTestSupportConfig,
    vitestNodeAssertConfig
} from '../configs/presets/vitest-node-assert/vitest-node-assert.ts';
import { vitestConfig } from '../configs/presets/vitest/vitest.ts';
import {
    assertConfigToHaveNoValidationIssues,
    checkAllPluginRulesConfigured,
    checkUnknownPluginRulesAreNotConfigured,
    findMissingConfiguredRuleNames
} from './rules-configuration.ts';

suite('vitest node assert preset', function () {
    test('includes all Vitest rules', function () {
        assert.deepStrictEqual(
            findMissingConfiguredRuleNames(vitestConfig.rules, vitestNodeAssertConfig.rules),
            [],
            'Vitest node assert preset must include every Vitest rule'
        );
    });

    test('includes all node assert rules', function () {
        assert.deepStrictEqual(
            findMissingConfiguredRuleNames(nodeAssertConfig.rules, vitestNodeAssertConfig.rules),
            [],
            'Vitest node assert preset must include every node assert rule'
        );
    });

    test('no unknown node assert rules are configured', function () {
        checkUnknownPluginRulesAreNotConfigured({
            ruleConfigSet: vitestNodeAssertConfig.rules,
            pluginRules: nodeAssertPlugin.rules,
            pluginName: '@enormora/eslint-plugin-node-assert'
        });
    });

    test('all node assert plugin rules are configured', function () {
        checkAllPluginRulesConfigured({
            ruleConfigSet: vitestNodeAssertConfig.rules,
            pluginRules: nodeAssertPlugin.rules,
            pluginName: '@enormora/eslint-plugin-node-assert'
        });
    });

    test('config has no validation errors', function () {
        assert.deepStrictEqual(
            assertConfigToHaveNoValidationIssues(vitestNodeAssertConfig),
            [],
            'Vitest node assert preset config must have no validation errors'
        );
    });

    test('testSupportConfig includes shared test support and node assert rules', function () {
        assert.deepStrictEqual(
            findMissingConfiguredRuleNames(testSupportConfig.rules, vitestNodeAssertTestSupportConfig.rules),
            [],
            'Vitest node assert testSupportConfig must include shared test support rules'
        );
        assert.deepStrictEqual(
            findMissingConfiguredRuleNames(nodeAssertConfig.rules, vitestNodeAssertTestSupportConfig.rules),
            [],
            'Vitest node assert testSupportConfig must include node assert rules'
        );
    });
});
