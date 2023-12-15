import test from 'ava';
import reactPlugin from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';
import { reactJsxConfig } from '../configs/react-jsx.js';
import {
    checkAllPluginRulesConfigured,
    checkUnknownPluginRulesAreNotConfigured,
    checkConfigToHaveNoValidationIssues,
    checkConfigLanguageOptions
} from './rules-configuration.js';

test('react preset config has the correct language options defined', checkConfigLanguageOptions, {
    configLanguageOptions: reactJsxConfig.languageOptions,
    languageOptions: {
        parserOptions: {
            ecmaFeatures: {
                jsx: true
            }
        }
    }
});

test('all eslint-plugin-react rules are configured', checkAllPluginRulesConfigured, {
    ruleConfigSet: reactJsxConfig.rules,
    pluginRules: reactPlugin.rules,
    pluginName: 'eslint-plugin-react'
});

test('no unknown eslint-plugin-react rules are configured', checkUnknownPluginRulesAreNotConfigured, {
    ruleConfigSet: reactJsxConfig.rules,
    pluginRules: reactPlugin.rules,
    pluginName: 'eslint-plugin-react'
});

test('all eslint-plugin-react-hooks rules are configured', checkAllPluginRulesConfigured, {
    ruleConfigSet: reactJsxConfig.rules,
    pluginRules: hooksPlugin.rules,
    pluginName: 'eslint-plugin-react-hooks'
});

test('no unknown eslint-plugin-react-hooks rules are configured', checkUnknownPluginRulesAreNotConfigured, {
    ruleConfigSet: reactJsxConfig.rules,
    pluginRules: hooksPlugin.rules,
    pluginName: 'eslint-plugin-react-hooks'
});

test('react preset config has no validation errors', checkConfigToHaveNoValidationIssues, reactJsxConfig);
