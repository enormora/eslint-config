import assert from 'node:assert';
import nodeAssertPlugin from '@enormora/eslint-plugin-node-assert';
import { suite, test } from 'mocha';
import { nodeAssertConfig } from '../configs/presets/node-assert/node-assert.ts';
import { testRuleSet } from '../configs/presets/test-base/test-base.ts';
import {
    checkAllPluginRulesConfigured,
    assertConfigToHaveNoValidationIssues,
    checkUnknownPluginRulesAreNotConfigured
} from './rules-configuration.ts';

suite('node assert preset', function () {
    test('all node assert plugin rules are configured', function () {
        checkAllPluginRulesConfigured({
            ruleConfigSet: nodeAssertConfig.rules,
            pluginRules: nodeAssertPlugin.rules,
            pluginName: '@enormora/eslint-plugin-node-assert'
        });
    });

    test('no unknown node assert plugin rules are configured', function () {
        checkUnknownPluginRulesAreNotConfigured({
            ruleConfigSet: nodeAssertConfig.rules,
            pluginRules: nodeAssertPlugin.rules,
            pluginName: '@enormora/eslint-plugin-node-assert'
        });
    });

    test('node assert preset config has no validation errors', function () {
        assert.deepStrictEqual(
            assertConfigToHaveNoValidationIssues(nodeAssertConfig),
            [],
            'node assert preset config must have no validation errors'
        );
    });

    test('test base includes the node assert preset plugin', function () {
        assert.deepStrictEqual(
            testRuleSet.plugins,
            nodeAssertConfig.plugins,
            'testRuleSet must expose the node assert plugin'
        );
    });

    test('test base includes the node assert preset rules', function () {
        const nodeAssertRuleNames = Object.keys(nodeAssertConfig.rules ?? {});
        const missingRuleNames = nodeAssertRuleNames.filter(function isMissingRuleName(ruleName) {
            return !Object.hasOwn(testRuleSet.rules, ruleName);
        });

        assert.deepStrictEqual(missingRuleNames, [], 'testRuleSet must include every node assert rule');
    });
});
