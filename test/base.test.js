import test from 'ava';
import noSecretsPlugin from 'eslint-plugin-no-secrets';
import importPlugin from 'eslint-plugin-import';
import eslintCommentsPlugin from 'eslint-plugin-eslint-comments';
import { baseConfig } from '../configs/base.js';
import {
    checkAllCoreRulesConfigured,
    checkUnknownCoreRulesAreNotConfigured,
    checkAllPluginRulesConfigured,
    checkUnknownPluginRulesAreNotConfigured,
    checkConfigToHaveNoValidationIssues
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

test('base preset config has no validation errors', checkConfigToHaveNoValidationIssues, baseConfig);
