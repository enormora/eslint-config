import test from 'ava';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import functionalPlugin from 'eslint-plugin-functional';
import { rules as perfectionistRules } from 'eslint-plugin-perfectionist';
import { typescriptConfig } from '../configs/typescript.js';
import {
    checkAllPluginRulesConfigured,
    checkUnknownPluginRulesAreNotConfigured,
    checkConfigToHaveNoValidationIssues,
    checkConfigLanguageOptions
} from './rules-configuration.js';

test('typescript preset config has the correct language options defined', checkConfigLanguageOptions, {
    configLanguageOptions: typescriptConfig.languageOptions,
    languageOptions: {
        parser: typescriptParser,
        parserOptions: {
            warnOnUnsupportedTypeScriptVersion: false,
            sourceType: 'module',
            ecmaFeatures: {
                jsx: false,
                globalReturn: false
            },
            projectService: true
        }
    }
});

test('all @typescript-eslint/eslint-plugin rules are configured', checkAllPluginRulesConfigured, {
    ruleConfigSet: typescriptConfig.rules,
    pluginRules: typescriptPlugin.rules,
    rulesToExclude: [
        'brace-style',
        'func-call-spacing',
        'indent',
        'quotes',
        'semi',
        'no-unused-expressions',
        'comma-spacing',
        'keyword-spacing',
        'member-delimiter-style',
        'no-extra-parens',
        'type-annotation-spacing',
        'lines-between-class-members',
        'comma-dangle',
        'key-spacing'
    ],
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

test('all eslint-plugin-perfectionist rules are configured', checkAllPluginRulesConfigured, {
    ruleConfigSet: typescriptConfig.rules,
    pluginRules: perfectionistRules,
    pluginName: 'eslint-plugin-perfectionist'
});

test('no unknown eslint-plugin-perfectionist rules are configured', checkUnknownPluginRulesAreNotConfigured, {
    ruleConfigSet: typescriptConfig.rules,
    pluginRules: perfectionistRules,
    pluginName: 'eslint-plugin-perfectionist'
});

test('typescript preset config has no validation errors', checkConfigToHaveNoValidationIssues, typescriptConfig);
