import test from 'ava';
import noSecretsPlugin from 'eslint-plugin-no-secrets';
import unicornPlugin from 'eslint-plugin-unicorn';
import promisePlugin from 'eslint-plugin-promise';
import importPlugin from 'eslint-plugin-import';
import eslintCommentsPlugin from 'eslint-plugin-eslint-comments';
import arrayFunctionPlugin from 'eslint-plugin-array-func';
import sonarjsPlugin from 'eslint-plugin-sonarjs';
import prettierPlugin from 'eslint-plugin-prettier';
import { baseConfig } from '../configs/base.js';
import {
    checkAllCoreRulesConfigured,
    checkUnknownCoreRulesAreNotConfigured,
    checkAllPluginRulesConfigured,
    checkUnknownPluginRulesAreNotConfigured
} from './rules-configuration.js';

test('all core rules are configured', checkAllCoreRulesConfigured, {
    ruleConfigSet: baseConfig.rules
});

test('does not contain removed core rules', checkUnknownCoreRulesAreNotConfigured, {
    ruleConfigSet: baseConfig.rules
});

test('all eslint-plugin-no-secrets rules are configured', checkAllPluginRulesConfigured, {
    ruleConfigSet: baseConfig.rules,
    pluginRules: noSecretsPlugin.rules,
    pluginName: 'eslint-plugin-no-secrets'
});

test('no unknown eslint-plugin-no-secrets rules are configured', checkUnknownPluginRulesAreNotConfigured, {
    ruleConfigSet: baseConfig.rules,
    pluginRules: noSecretsPlugin.rules,
    pluginName: 'eslint-plugin-no-secrets'
});

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

test('all eslint-plugin-import rules are configured', checkAllPluginRulesConfigured, {
    ruleConfigSet: baseConfig.rules,
    pluginRules: importPlugin.rules,
    pluginName: 'eslint-plugin-import'
});

test('no unknown eslint-plugin-import rules are configured', checkUnknownPluginRulesAreNotConfigured, {
    ruleConfigSet: baseConfig.rules,
    pluginRules: importPlugin.rules,
    pluginName: 'eslint-plugin-import'
});

test('all eslint-plugin-eslint-comments rules are configured', checkAllPluginRulesConfigured, {
    ruleConfigSet: baseConfig.rules,
    pluginRules: eslintCommentsPlugin.rules,
    pluginName: 'eslint-plugin-eslint-comments'
});

test('no unknown eslint-plugin-eslint-comments rules are configured', checkUnknownPluginRulesAreNotConfigured, {
    ruleConfigSet: baseConfig.rules,
    pluginRules: eslintCommentsPlugin.rules,
    pluginName: 'eslint-plugin-eslint-comments'
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
