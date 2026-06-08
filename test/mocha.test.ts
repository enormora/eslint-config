import { suite, test } from 'mocha';
import mochaPlugin from 'eslint-plugin-mocha';
import { mochaConfig } from '../configs/presets/mocha/mocha.ts';
import {
    checkAdditionalRulesConfigured,
    checkAllPluginRulesConfigured,
    checkAllTestRulesConfigured,
    checkConfigLanguageOptions,
    checkConfigToHaveNoValidationIssues,
    checkUnknownPluginRulesAreNotConfigured
} from './rules-configuration.ts';

suite('mocha preset', function () {
    test('all eslint-plugin-mocha rules are configured', function () {
        checkAllPluginRulesConfigured({
            ruleConfigSet: mochaConfig.rules,
            pluginRules: mochaPlugin.rules,
            pluginName: 'eslint-plugin-mocha'
        });
    });

    test('no unknown eslint-plugin-mocha rules are configured', function () {
        checkUnknownPluginRulesAreNotConfigured({
            ruleConfigSet: mochaConfig.rules,
            pluginRules: mochaPlugin.rules,
            pluginName: 'eslint-plugin-mocha'
        });
    });

    test('all common test rules are configured', function () {
        checkAllTestRulesConfigured({
            ruleConfigSet: mochaConfig.rules
        });
    });

    test('mocha preset config has no validation errors', function () {
        checkConfigToHaveNoValidationIssues(mochaConfig);
    });

    test('mocha preset config has the correct language options defined', function () {
        checkConfigLanguageOptions({
            configLanguageOptions: mochaConfig.languageOptions
        });
    });

    test('mocha preset config defines additional rules', function () {
        checkAdditionalRulesConfigured({
            ruleConfigSet: mochaConfig.rules,
            additionalRules: {
                'prefer-arrow-callback': 'off'
            }
        });
    });
});
