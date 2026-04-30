import eslintCommentsPlugin from '@eslint-community/eslint-plugin-eslint-comments';
import test from 'ava';
import { rules as importPluginRules } from 'eslint-plugin-import-x';
import noSecretsPlugin from 'eslint-plugin-no-secrets';
import prettierPlugin from 'eslint-plugin-prettier';
import { baseWithPrettierConfig } from '../configs/presets/base-with-prettier/base-with-prettier.js';
import {
    checkAllCoreRulesConfigured,
    checkAllPluginRulesConfigured,
    checkConfigToHaveNoValidationIssues,
    checkUnknownCoreRulesAreNotConfigured,
    checkUnknownPluginRulesAreNotConfigured
} from './rules-configuration.js';

test('all core rules are configured', checkAllCoreRulesConfigured, {
    ruleConfigSet: baseWithPrettierConfig.rules
});

test('does not contain removed core rules', checkUnknownCoreRulesAreNotConfigured, {
    ruleConfigSet: baseWithPrettierConfig.rules
});

test('all eslint-plugin-no-secrets rules are configured', checkAllPluginRulesConfigured, {
    ruleConfigSet: baseWithPrettierConfig.rules,
    pluginRules: noSecretsPlugin.rules,
    pluginName: 'eslint-plugin-no-secrets'
});

test('no unknown eslint-plugin-no-secrets rules are configured', checkUnknownPluginRulesAreNotConfigured, {
    ruleConfigSet: baseWithPrettierConfig.rules,
    pluginRules: noSecretsPlugin.rules,
    pluginName: 'eslint-plugin-no-secrets'
});

test('all eslint-plugin-import rules are configured', checkAllPluginRulesConfigured, {
    ruleConfigSet: baseWithPrettierConfig.rules,
    pluginRules: importPluginRules,
    pluginName: 'eslint-plugin-import'
});

test('no unknown eslint-plugin-import rules are configured', checkUnknownPluginRulesAreNotConfigured, {
    ruleConfigSet: baseWithPrettierConfig.rules,
    pluginRules: importPluginRules,
    pluginName: 'eslint-plugin-import'
});

test('all @eslint-community/eslint-plugin-eslint-comments rules are configured', checkAllPluginRulesConfigured, {
    ruleConfigSet: baseWithPrettierConfig.rules,
    pluginRules: eslintCommentsPlugin.rules,
    pluginName: 'eslint-plugin-eslint-comments'
});

test(
    'no unknown @eslint-community/eslint-plugin-eslint-comments rules are configured',
    checkUnknownPluginRulesAreNotConfigured,
    {
        ruleConfigSet: baseWithPrettierConfig.rules,
        pluginRules: eslintCommentsPlugin.rules,
        pluginName: 'eslint-plugin-eslint-comments'
    }
);

test('all eslint-plugin-prettier rules are configured', checkAllPluginRulesConfigured, {
    ruleConfigSet: baseWithPrettierConfig.rules,
    pluginRules: prettierPlugin.rules,
    pluginName: 'eslint-plugin-prettier'
});

test('no unknown eslint-plugin-prettier rules are configured', checkUnknownPluginRulesAreNotConfigured, {
    ruleConfigSet: baseWithPrettierConfig.rules,
    pluginRules: prettierPlugin.rules,
    pluginName: 'eslint-plugin-prettier'
});

test(
    'base-with-prettier preset config has no validation errors',
    checkConfigToHaveNoValidationIssues,
    baseWithPrettierConfig
);
