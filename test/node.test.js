import test from 'ava';
import nodePlugin from 'eslint-plugin-n';
import { nodeConfig, nodeConfigFileConfig, nodeEntryPointFileConfig } from '../configs/node.js';
import {
    checkAllPluginRulesConfigured,
    checkUnknownPluginRulesAreNotConfigured,
    checkConfigToHaveNoValidationIssues
} from './rules-configuration.js';

test('all eslint-plugin-n rules are configured', checkAllPluginRulesConfigured, {
    ruleConfigSet: nodeConfig.rules,
    pluginRules: nodePlugin.rules,
    pluginName: 'eslint-plugin-node'
});

test('no unknown eslint-plugin-n rules are configured', checkUnknownPluginRulesAreNotConfigured, {
    ruleConfigSet: nodeConfig.rules,
    pluginRules: nodePlugin.rules,
    pluginName: 'eslint-plugin-node'
});

test('node preset config has no validation errors', checkConfigToHaveNoValidationIssues, nodeConfig);

test(
    'node config file preset config has no validation errors',
    checkConfigToHaveNoValidationIssues,
    nodeConfigFileConfig
);

test(
    'node entry point file preset config has no validation errors',
    checkConfigToHaveNoValidationIssues,
    nodeEntryPointFileConfig
);
