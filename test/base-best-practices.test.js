import test from 'ava';
import unicornPlugin from 'eslint-plugin-unicorn';
import promisePlugin from 'eslint-plugin-promise';
import arrayFunctionPlugin from 'eslint-plugin-array-func';
import sonarjsPlugin from 'eslint-plugin-sonarjs';
import { baseConfig } from '../configs/base.js';
import { checkAllPluginRulesConfigured, checkUnknownPluginRulesAreNotConfigured } from './rules-configuration.js';

test('all eslint-plugin-unicorn rules are configured', checkAllPluginRulesConfigured, {
    ruleConfigSet: baseConfig.rules,
    pluginRules: unicornPlugin.rules,
    pluginName: 'eslint-plugin-unicorn'
});

test('no unknown eslint-plugin-unicorn rules are configured', checkUnknownPluginRulesAreNotConfigured, {
    ruleConfigSet: baseConfig.rules,
    pluginRules: unicornPlugin.rules,
    pluginName: 'eslint-plugin-unicorn'
});

test('all eslint-plugin-promise rules are configured', checkAllPluginRulesConfigured, {
    ruleConfigSet: baseConfig.rules,
    pluginRules: promisePlugin.rules,
    pluginName: 'eslint-plugin-promise'
});

test('no unknown eslint-plugin-promise rules are configured', checkUnknownPluginRulesAreNotConfigured, {
    ruleConfigSet: baseConfig.rules,
    pluginRules: promisePlugin.rules,
    pluginName: 'eslint-plugin-promise'
});

test('all eslint-plugin-array-func rules are configured', checkAllPluginRulesConfigured, {
    ruleConfigSet: baseConfig.rules,
    pluginRules: arrayFunctionPlugin.rules,
    pluginName: 'eslint-plugin-array-func'
});

test('no unknown eslint-plugin-array-func rules are configured', checkUnknownPluginRulesAreNotConfigured, {
    ruleConfigSet: baseConfig.rules,
    pluginRules: arrayFunctionPlugin.rules,
    pluginName: 'eslint-plugin-array-func'
});

test('all eslint-plugin-sonarjs rules are configured', checkAllPluginRulesConfigured, {
    ruleConfigSet: baseConfig.rules,
    pluginRules: sonarjsPlugin.rules,
    pluginName: 'eslint-plugin-sonarjs'
});

test('no unknown eslint-plugin-sonarjs rules are configured', checkUnknownPluginRulesAreNotConfigured, {
    ruleConfigSet: baseConfig.rules,
    pluginRules: sonarjsPlugin.rules,
    pluginName: 'eslint-plugin-sonarjs'
});
