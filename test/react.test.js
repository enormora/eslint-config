import test from 'ava';
import reactPlugin from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';
import { reactConfig } from '../configs/react.js';
import {
    checkAllPluginRulesConfigured,
    checkUnknownPluginRulesAreNotConfigured,
    checkConfigToHaveNoValidationIssues
} from './rules-configuration.js';

test('all eslint-plugin-react rules are configured', checkAllPluginRulesConfigured, {
    ruleConfigSet: reactConfig.rules,
    pluginRules: reactPlugin.rules,
    pluginName: 'eslint-plugin-react'
});

test('no unknown eslint-plugin-react rules are configured', checkUnknownPluginRulesAreNotConfigured, {
    ruleConfigSet: reactConfig.rules,
    pluginRules: reactPlugin.rules,
    pluginName: 'eslint-plugin-react'
});

test('all eslint-plugin-react-hooks rules are configured', checkAllPluginRulesConfigured, {
    ruleConfigSet: reactConfig.rules,
    pluginRules: hooksPlugin.rules,
    pluginName: 'eslint-plugin-react-hooks'
});

test('no unknown eslint-plugin-react-hooks rules are configured', checkUnknownPluginRulesAreNotConfigured, {
    ruleConfigSet: reactConfig.rules,
    pluginRules: hooksPlugin.rules,
    pluginName: 'eslint-plugin-react-hooks'
});

test('react preset config has no validation errors', checkConfigToHaveNoValidationIssues, reactConfig);
