import assert from 'node:assert';
import nodeAssertPlugin from '@enormora/eslint-plugin-node-assert';
import { suite, test } from 'mocha';
import { mochaConfig } from '../configs/presets/mocha/mocha.ts';
import {
    mochaNodeAssertConfig,
    testSupportConfig as mochaNodeAssertTestSupportConfig
} from '../configs/presets/mocha-node-assert/mocha-node-assert.ts';
import { nodeAssertConfig } from '../configs/presets/node-assert/node-assert.ts';
import { testSupportConfig } from '../configs/presets/test-base/test-base.ts';
import {
    assertConfigToHaveNoValidationIssues,
    checkAllPluginRulesConfigured,
    checkUnknownPluginRulesAreNotConfigured,
    findMissingConfiguredRuleNames
} from './rules-configuration.ts';

suite('mocha node assert preset', function () {
    test('includes all Mocha rules', function () {
        assert.deepStrictEqual(
            findMissingConfiguredRuleNames(mochaConfig.rules, mochaNodeAssertConfig.rules),
            [],
            'Mocha node assert preset must include every Mocha rule'
        );
    });

    test('includes all node assert rules', function () {
        assert.deepStrictEqual(
            findMissingConfiguredRuleNames(nodeAssertConfig.rules, mochaNodeAssertConfig.rules),
            [],
            'Mocha node assert preset must include every node assert rule'
        );
    });

    test('no unknown node assert rules are configured', function () {
        checkUnknownPluginRulesAreNotConfigured({
            ruleConfigSet: mochaNodeAssertConfig.rules,
            pluginRules: nodeAssertPlugin.rules,
            pluginName: '@enormora/eslint-plugin-node-assert'
        });
    });

    test('all node assert plugin rules are configured', function () {
        checkAllPluginRulesConfigured({
            ruleConfigSet: mochaNodeAssertConfig.rules,
            pluginRules: nodeAssertPlugin.rules,
            pluginName: '@enormora/eslint-plugin-node-assert'
        });
    });

    test('config has no validation errors', function () {
        assert.deepStrictEqual(
            assertConfigToHaveNoValidationIssues(mochaNodeAssertConfig),
            [],
            'Mocha node assert preset config must have no validation errors'
        );
    });

    test('testSupportConfig includes shared test support and node assert rules', function () {
        assert.deepStrictEqual(
            findMissingConfiguredRuleNames(testSupportConfig.rules, mochaNodeAssertTestSupportConfig.rules),
            [],
            'Mocha node assert testSupportConfig must include shared test support rules'
        );
        assert.deepStrictEqual(
            findMissingConfiguredRuleNames(nodeAssertConfig.rules, mochaNodeAssertTestSupportConfig.rules),
            [],
            'Mocha node assert testSupportConfig must include node assert rules'
        );
    });
});
