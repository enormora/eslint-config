import test from 'ava';
import vitestPlugin from '@vitest/eslint-plugin';
import { vitestConfig } from '../configs/vitest.js';
import {
    checkAllPluginRulesConfigured,
    checkUnknownPluginRulesAreNotConfigured,
    checkConfigToHaveNoValidationIssues,
    checkAllTestRulesConfigured
} from './rules-configuration.js';

test('all @vitest/eslint-plugin rules are configured', checkAllPluginRulesConfigured, {
    ruleConfigSet: vitestConfig.rules,
    pluginRules: vitestPlugin.rules,
    pluginName: '@vitest/eslint-plugin'
});

test('no unknown @vitest/eslint-plugin rules are configured', checkUnknownPluginRulesAreNotConfigured, {
    ruleConfigSet: vitestConfig.rules,
    pluginRules: vitestPlugin.rules,
    pluginName: '@vitest/eslint-plugin'
});

test('all common test rules are configured', checkAllTestRulesConfigured, {
    ruleConfigSet: vitestConfig.rules
});

test('vitest preset config has no validation errors', checkConfigToHaveNoValidationIssues, vitestConfig);
