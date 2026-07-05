import { suite, test } from 'mocha';
import reactPlugin from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';
import { reactConfig } from '../configs/presets/react/react.ts';
import {
    checkAllPluginRulesConfigured,
    assertConfigToHaveNoValidationIssues,
    checkUnknownPluginRulesAreNotConfigured
} from './rules-configuration.ts';

suite('react preset', function () {
    test('all eslint-plugin-react rules are configured', function () {
        checkAllPluginRulesConfigured({
            ruleConfigSet: reactConfig.rules,
            pluginRules: reactPlugin.rules,
            pluginName: 'eslint-plugin-react'
        });
    });

    test('no unknown eslint-plugin-react rules are configured', function () {
        checkUnknownPluginRulesAreNotConfigured({
            ruleConfigSet: reactConfig.rules,
            pluginRules: reactPlugin.rules,
            pluginName: 'eslint-plugin-react'
        });
    });

    test('all eslint-plugin-react-hooks rules are configured', function () {
        checkAllPluginRulesConfigured({
            ruleConfigSet: reactConfig.rules,
            pluginRules: hooksPlugin.rules,
            pluginName: 'eslint-plugin-react-hooks'
        });
    });

    test('no unknown eslint-plugin-react-hooks rules are configured', function () {
        checkUnknownPluginRulesAreNotConfigured({
            ruleConfigSet: reactConfig.rules,
            pluginRules: hooksPlugin.rules,
            pluginName: 'eslint-plugin-react-hooks'
        });
    });

    test('react preset config has no validation errors', function () {
        assertConfigToHaveNoValidationIssues(reactConfig);
    });
});
