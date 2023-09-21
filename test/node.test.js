import test from 'ava';
import nodePlugin from 'eslint-plugin-n';
import { nodeConfig } from '../configs/node.js';
import { checkAllPluginRulesConfigured, checkUnknownPluginRulesAreNotConfigured } from './rules-configuration.js';

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
