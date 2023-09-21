import test from 'ava';
import avaPlugin from 'eslint-plugin-ava';
import { avaConfig } from '../configs/ava.js';
import { checkAllPluginRulesConfigured, checkUnknownPluginRulesAreNotConfigured } from './rules-configuration.js';

test('all eslint-plugin-ava rules are configured', checkAllPluginRulesConfigured, {
    ruleConfigSet: avaConfig.rules,
    pluginRules: avaPlugin.rules,
    pluginName: 'eslint-plugin-ava'
});

test('no unknown eslint-plugin-ava rules are configured', checkUnknownPluginRulesAreNotConfigured, {
    ruleConfigSet: avaConfig.rules,
    pluginRules: avaPlugin.rules,
    pluginName: 'eslint-plugin-ava'
});
