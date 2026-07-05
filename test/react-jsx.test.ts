import { suite, test } from 'mocha';
import reactPlugin from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';
import { reactJsxConfig } from '../configs/presets/react-jsx/react-jsx.ts';
import {
    checkAllPluginRulesConfigured,
    checkConfigLanguageOptions,
    assertConfigToHaveNoValidationIssues,
    checkUnknownPluginRulesAreNotConfigured
} from './rules-configuration.ts';

suite('react-jsx preset', function () {
    test('react preset config has the correct language options defined', function () {
        checkConfigLanguageOptions({
            configLanguageOptions: reactJsxConfig.languageOptions,
            languageOptions: {
                parserOptions: {
                    ecmaFeatures: {
                        jsx: true
                    }
                }
            }
        });
    });

    test('all eslint-plugin-react rules are configured', function () {
        checkAllPluginRulesConfigured({
            ruleConfigSet: reactJsxConfig.rules,
            pluginRules: reactPlugin.rules,
            pluginName: 'eslint-plugin-react'
        });
    });

    test('no unknown eslint-plugin-react rules are configured', function () {
        checkUnknownPluginRulesAreNotConfigured({
            ruleConfigSet: reactJsxConfig.rules,
            pluginRules: reactPlugin.rules,
            pluginName: 'eslint-plugin-react'
        });
    });

    test('all eslint-plugin-react-hooks rules are configured', function () {
        checkAllPluginRulesConfigured({
            ruleConfigSet: reactJsxConfig.rules,
            pluginRules: hooksPlugin.rules,
            pluginName: 'eslint-plugin-react-hooks'
        });
    });

    test('no unknown eslint-plugin-react-hooks rules are configured', function () {
        checkUnknownPluginRulesAreNotConfigured({
            ruleConfigSet: reactJsxConfig.rules,
            pluginRules: hooksPlugin.rules,
            pluginName: 'eslint-plugin-react-hooks'
        });
    });

    test('react preset config has no validation errors', function () {
        assertConfigToHaveNoValidationIssues(reactJsxConfig);
    });
});
