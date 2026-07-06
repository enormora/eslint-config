import assert from 'node:assert';
import nodeAssertPlugin from '@enormora/eslint-plugin-node-assert';
import { suite, test } from 'mocha';
import { nodeAssertConfig } from '../configs/presets/node-assert/node-assert.ts';
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
});
