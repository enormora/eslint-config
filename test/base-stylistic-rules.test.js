import dprintPlugin from '@ben_12/eslint-plugin-dprint';
import stylisticPlugin from '@stylistic/eslint-plugin';
import { suite, test } from 'mocha';
import destructuringPlugin from 'eslint-plugin-destructuring';
import { baseConfig } from '../configs/presets/base/base.js';
import {
    checkAllPluginRulesConfigured,
    checkUnknownPluginRulesAreNotConfigured,
    mergeConfigRules
} from './rules-configuration.js';

const baseConfigRules = mergeConfigRules(baseConfig);

suite('base stylistic rules', function () {
    test('all @ben_12/eslint-plugin-dprint rules are configured', function () {
        checkAllPluginRulesConfigured({
            ruleConfigSet: baseConfigRules,
            pluginRules: dprintPlugin.rules,
            pluginName: '@ben_12/eslint-plugin-dprint'
        });
    });

    test('no unknown @ben_12/eslint-plugin-dprint rules are configured', function () {
        checkUnknownPluginRulesAreNotConfigured({
            ruleConfigSet: baseConfigRules,
            pluginRules: dprintPlugin.rules,
            pluginName: '@ben_12/eslint-plugin-dprint'
        });
    });

    test('all eslint-plugin-destructuring rules are configured', function () {
        checkAllPluginRulesConfigured({
            ruleConfigSet: baseConfigRules,
            pluginRules: destructuringPlugin.rules,
            pluginName: 'eslint-plugin-destructuring'
        });
    });

    test('no unknown eslint-plugin-destructuring rules are configured', function () {
        checkUnknownPluginRulesAreNotConfigured({
            ruleConfigSet: baseConfigRules,
            pluginRules: destructuringPlugin.rules,
            pluginName: 'eslint-plugin-destructuring'
        });
    });

    test('all @stylistic/eslint-plugin rules are configured', function () {
        checkAllPluginRulesConfigured({
            ruleConfigSet: baseConfigRules,
            pluginRules: stylisticPlugin.rules,
            pluginName: '@stylistic'
        });
    });

    test('no unknown @stylistic/eslint-plugin rules are configured', function () {
        checkUnknownPluginRulesAreNotConfigured({
            ruleConfigSet: baseConfigRules,
            pluginRules: stylisticPlugin.rules,
            pluginName: '@stylistic'
        });
    });
});
