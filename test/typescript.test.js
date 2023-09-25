import test from 'ava';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import functionalPlugin from 'eslint-plugin-functional';
import { typescriptConfig } from '../configs/typescript.js';
import {
    checkAllPluginRulesConfigured,
    checkUnknownPluginRulesAreNotConfigured,
    checkConfigToHaveNoValidationIssues
} from './rules-configuration.js';

test('all @typescript-eslint/eslint-plugin rules are configured', checkAllPluginRulesConfigured, {
    ruleConfigSet: typescriptConfig.rules,
    pluginRules: typescriptPlugin.rules,
    pluginName: '@typescript-eslint/eslint-plugin'
});

test('no unknown @typescript-eslint/eslint-plugin rules are configured', checkUnknownPluginRulesAreNotConfigured, {
    ruleConfigSet: typescriptConfig.rules,
    pluginRules: typescriptPlugin.rules,
    pluginName: '@typescript-eslint/eslint-plugin'
});

test('all eslint-plugin-functional rules are configured', checkAllPluginRulesConfigured, {
    ruleConfigSet: typescriptConfig.rules,
    pluginRules: functionalPlugin.rules,
    pluginName: 'eslint-plugin-functional'
});

test('no unknown eslint-plugin-functional rules are configured', checkUnknownPluginRulesAreNotConfigured, {
    ruleConfigSet: typescriptConfig.rules,
    pluginRules: functionalPlugin.rules,
    pluginName: 'eslint-plugin-functional'
});

test('typescript preset config has no validation errors', checkConfigToHaveNoValidationIssues, typescriptConfig);
