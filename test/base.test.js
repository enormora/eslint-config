import eslintCommentsPlugin from '@eslint-community/eslint-plugin-eslint-comments';
import test from 'ava';
import { rules as importPluginRules } from 'eslint-plugin-import-x';
import noSecretsPlugin from 'eslint-plugin-no-secrets';
import { baseConfig } from '../configs/presets/base/base.js';
import {
    checkAllCoreRulesConfigured,
    checkAllPluginRulesConfigured,
    checkConfigToHaveNoValidationIssues,
    checkUnknownCoreRulesAreNotConfigured,
    checkUnknownPluginRulesAreNotConfigured,
    mergeConfigRules
} from './rules-configuration.js';

const baseConfigRules = mergeConfigRules(baseConfig);

test('all core rules are configured', checkAllCoreRulesConfigured, {
    ruleConfigSet: baseConfigRules
});

test('does not contain removed core rules', checkUnknownCoreRulesAreNotConfigured, {
    ruleConfigSet: baseConfigRules
});

test('all eslint-plugin-no-secrets rules are configured', checkAllPluginRulesConfigured, {
    ruleConfigSet: baseConfigRules,
    pluginRules: noSecretsPlugin.rules,
    pluginName: 'eslint-plugin-no-secrets'
});

test('no unknown eslint-plugin-no-secrets rules are configured', checkUnknownPluginRulesAreNotConfigured, {
    ruleConfigSet: baseConfigRules,
    pluginRules: noSecretsPlugin.rules,
    pluginName: 'eslint-plugin-no-secrets'
});

test('all eslint-plugin-import rules are configured', checkAllPluginRulesConfigured, {
    ruleConfigSet: baseConfigRules,
    pluginRules: importPluginRules,
    pluginName: 'eslint-plugin-import'
});

test('no unknown eslint-plugin-import rules are configured', checkUnknownPluginRulesAreNotConfigured, {
    ruleConfigSet: baseConfigRules,
    pluginRules: importPluginRules,
    pluginName: 'eslint-plugin-import'
});

test('all @eslint-community/eslint-plugin-eslint-comments rules are configured', checkAllPluginRulesConfigured, {
    ruleConfigSet: baseConfigRules,
    pluginRules: eslintCommentsPlugin.rules,
    pluginName: 'eslint-plugin-eslint-comments'
});

test(
    'no unknown @eslint-community/eslint-plugin-eslint-comments rules are configured',
    checkUnknownPluginRulesAreNotConfigured,
    {
        ruleConfigSet: baseConfigRules,
        pluginRules: eslintCommentsPlugin.rules,
        pluginName: 'eslint-plugin-eslint-comments'
    }
);

test('base preset config has no validation errors', checkConfigToHaveNoValidationIssues, baseConfig);
