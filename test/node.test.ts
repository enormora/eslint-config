import assert from 'node:assert';
import { suite, test } from 'mocha';
import nodePlugin from 'eslint-plugin-n';
import { baseConfig } from '../configs/presets/base/base.ts';
import { nodeConfig, nodeConfigFileConfig, nodeEntryPointFileConfig } from '../configs/presets/node/node.ts';
import {
    checkAllPluginRulesConfigured,
    assertConfigToHaveNoValidationIssues,
    checkUnknownPluginRulesAreNotConfigured,
    mergeConfigRules
} from './rules-configuration.ts';

const nodeConfigRules = mergeConfigRules([ ...baseConfig, nodeConfig ]);
const nodeUnicornRules = [ 'unicorn/no-unsafe-sqlite-interpolation' ];

suite('node preset', function () {
    test('all eslint-plugin-n rules are configured', function () {
        checkAllPluginRulesConfigured({
            ruleConfigSet: nodeConfig.rules,
            pluginRules: nodePlugin.rules,
            pluginName: 'eslint-plugin-node'
        });
    });

    test('no unknown eslint-plugin-n rules are configured', function () {
        checkUnknownPluginRulesAreNotConfigured({
            ruleConfigSet: nodeConfig.rules,
            pluginRules: nodePlugin.rules,
            pluginName: 'eslint-plugin-node'
        });
    });

    test('node-owned unicorn rules are configured', function () {
        for (const ruleName of nodeUnicornRules) {
            assert.ok(Object.hasOwn(nodeConfigRules ?? {}, ruleName), `${ruleName} not configured`);
        }
    });

    test('node preset config has no validation errors with base', function () {
        assert.deepStrictEqual(
            assertConfigToHaveNoValidationIssues([ ...baseConfig, nodeConfig ]),
            [],
            'node preset config must have no validation errors with base'
        );
    });

    test('node config file preset config has no validation errors', function () {
        assertConfigToHaveNoValidationIssues(nodeConfigFileConfig);
    });

    test('node entry point file preset config has no validation errors', function () {
        assertConfigToHaveNoValidationIssues(nodeEntryPointFileConfig);
    });
});
