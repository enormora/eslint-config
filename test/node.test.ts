import { suite, test } from 'mocha';
import nodePlugin from 'eslint-plugin-n';
import { nodeConfig, nodeConfigFileConfig, nodeEntryPointFileConfig } from '../configs/presets/node/node.ts';
import {
    checkAllPluginRulesConfigured,
    assertConfigToHaveNoValidationIssues,
    checkUnknownPluginRulesAreNotConfigured
} from './rules-configuration.ts';

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

    test('node preset config has no validation errors', function () {
        assertConfigToHaveNoValidationIssues(nodeConfig);
    });

    test('node config file preset config has no validation errors', function () {
        assertConfigToHaveNoValidationIssues(nodeConfigFileConfig);
    });

    test('node entry point file preset config has no validation errors', function () {
        assertConfigToHaveNoValidationIssues(nodeEntryPointFileConfig);
    });
});
