import dprintPlugin from '@ben_12/eslint-plugin-dprint';
import stylisticPlugin from '@stylistic/eslint-plugin';
import test from 'ava';
import destructuringPlugin from 'eslint-plugin-destructuring';
import { baseConfig } from '../configs/presets/base/base.js';
import { checkAllPluginRulesConfigured, checkUnknownPluginRulesAreNotConfigured } from './rules-configuration.js';

test('all @ben_12/eslint-plugin-dprint rules are configured', checkAllPluginRulesConfigured, {
    ruleConfigSet: baseConfig.rules,
    pluginRules: dprintPlugin.rules,
    pluginName: '@ben_12/eslint-plugin-dprint'
});

test('no unknown @ben_12/eslint-plugin-dprint rules are configured', checkUnknownPluginRulesAreNotConfigured, {
    ruleConfigSet: baseConfig.rules,
    pluginRules: dprintPlugin.rules,
    pluginName: '@ben_12/eslint-plugin-dprint'
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
