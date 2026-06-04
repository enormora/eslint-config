import { suite, test } from 'mocha';
import eslintPluginPlugin from 'eslint-plugin-eslint-plugin';
import { eslintPluginConfig } from '../configs/presets/eslint-plugin/eslint-plugin.js';
import {
    checkAllPluginRulesConfigured,
    checkConfigToHaveNoValidationIssues,
    checkUnknownPluginRulesAreNotConfigured
} from './rules-configuration.js';

suite('eslint-plugin preset', function () {
    test('all eslint-plugin-eslint-plugin rules are configured', function () {
        checkAllPluginRulesConfigured({
            ruleConfigSet: eslintPluginConfig.rules,
            pluginRules: eslintPluginPlugin.rules,
            pluginName: 'eslint-plugin-eslint-plugin'
        });
    });

    test('no unknown eslint-plugin-eslint-plugin rules are configured', function () {
        checkUnknownPluginRulesAreNotConfigured({
            ruleConfigSet: eslintPluginConfig.rules,
            pluginRules: eslintPluginPlugin.rules,
            pluginName: 'eslint-plugin-eslint-plugin'
        });
    });

    test('eslint-plugin preset config has no validation errors', function () {
        checkConfigToHaveNoValidationIssues(eslintPluginConfig);
    });
});
