import { suite, test } from 'mocha';
import avaPlugin from 'eslint-plugin-ava';
import { avaConfig } from '../configs/presets/ava/ava.js';
import {
    checkAllPluginRulesConfigured,
    checkAllTestRulesConfigured,
    checkConfigToHaveNoValidationIssues,
    checkUnknownPluginRulesAreNotConfigured
} from './rules-configuration.js';

suite('ava preset', function () {
    test('all eslint-plugin-ava rules are configured', function () {
        checkAllPluginRulesConfigured({
            ruleConfigSet: avaConfig.rules,
            pluginRules: avaPlugin.rules,
            pluginName: 'eslint-plugin-ava'
        });
    });

    test('no unknown eslint-plugin-ava rules are configured', function () {
        checkUnknownPluginRulesAreNotConfigured({
            ruleConfigSet: avaConfig.rules,
            pluginRules: avaPlugin.rules,
            pluginName: 'eslint-plugin-ava'
        });
    });

    test('all common test rules are configured', function () {
        checkAllTestRulesConfigured({
            ruleConfigSet: avaConfig.rules
        });
    });

    test('ava preset config has no validation errors', function () {
        checkConfigToHaveNoValidationIssues(avaConfig);
    });
});
