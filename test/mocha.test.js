import test from 'ava';
import mochaPlugin from 'eslint-plugin-mocha';
import globals from 'globals';
import { mochaConfig } from '../configs/mocha.js';
import {
    checkAllPluginRulesConfigured,
    checkUnknownPluginRulesAreNotConfigured,
    checkConfigToHaveNoValidationIssues,
    checkConfigLanguageOptions
} from './rules-configuration.js';

test('all eslint-plugin-mocha rules are configured', checkAllPluginRulesConfigured, {
    ruleConfigSet: mochaConfig.rules,
    pluginRules: mochaPlugin.rules,
    pluginName: 'eslint-plugin-mocha'
});

test('no unknown eslint-plugin-mocha rules are configured', checkUnknownPluginRulesAreNotConfigured, {
    ruleConfigSet: mochaConfig.rules,
    pluginRules: mochaPlugin.rules,
    pluginName: 'eslint-plugin-mocha'
});

test('mocha preset config has no validation errors', checkConfigToHaveNoValidationIssues, mochaConfig);

test('mocha preset config has the correct language options defined', checkConfigLanguageOptions, {
    configLanguageOptions: mochaConfig.languageOptions,
    languageOptions: {
        globals: globals.mocha
    }
});
