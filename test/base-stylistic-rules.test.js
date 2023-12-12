import test from 'ava';
import prettierPlugin from 'eslint-plugin-prettier';
import destructuringPlugin from 'eslint-plugin-destructuring';
import stylisticPlugin from '@stylistic/eslint-plugin';
import { baseConfig } from '../configs/base.js';
import { checkAllPluginRulesConfigured, checkUnknownPluginRulesAreNotConfigured } from './rules-configuration.js';

test('all eslint-plugin-prettier rules are configured', checkAllPluginRulesConfigured, {
    ruleConfigSet: baseConfig.rules,
    pluginRules: prettierPlugin.rules,
    pluginName: 'eslint-plugin-prettier'
});

test('no unknown eslint-plugin-prettier rules are configured', checkUnknownPluginRulesAreNotConfigured, {
    ruleConfigSet: baseConfig.rules,
    pluginRules: prettierPlugin.rules,
    pluginName: 'eslint-plugin-prettier'
});

test('all eslint-plugin-destructuring rules are configured', checkAllPluginRulesConfigured, {
    ruleConfigSet: baseConfig.rules,
    pluginRules: destructuringPlugin.rules,
    pluginName: 'eslint-plugin-destructuring'
});

test('no unknown eslint-plugin-destructuring rules are configured', checkUnknownPluginRulesAreNotConfigured, {
    ruleConfigSet: baseConfig.rules,
    pluginRules: destructuringPlugin.rules,
    pluginName: 'eslint-plugin-destructuring'
});

test('all @stylistic/eslint-plugin rules are configured', checkAllPluginRulesConfigured, {
    ruleConfigSet: baseConfig.rules,
    pluginRules: stylisticPlugin.rules,
    pluginName: '@stylistic'
});

test('no unknown @stylistic/eslint-plugin rules are configured', checkUnknownPluginRulesAreNotConfigured, {
    ruleConfigSet: baseConfig.rules,
    pluginRules: stylisticPlugin.rules,
    pluginName: '@stylistic'
});
