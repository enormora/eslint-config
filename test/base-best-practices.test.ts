import { suite, test } from 'mocha';
import arrayFunctionPlugin from 'eslint-plugin-array-func';
import noBarrelFiles from 'eslint-plugin-no-barrel-files';
import promisePlugin from 'eslint-plugin-promise';
import sonarjsPlugin from 'eslint-plugin-sonarjs';
import unicornPlugin from 'eslint-plugin-unicorn';
import { baseConfig } from '../configs/presets/base/base.ts';
import {
    checkAllPluginRulesConfigured,
    checkUnknownPluginRulesAreNotConfigured,
    mergeConfigRules
} from './rules-configuration.ts';

const baseConfigRules = mergeConfigRules(baseConfig);

suite('base best practices rule set', function () {
    test('all eslint-plugin-unicorn rules are configured', function () {
        checkAllPluginRulesConfigured({
            ruleConfigSet: baseConfigRules,
            pluginRules: unicornPlugin.rules,
            pluginName: 'eslint-plugin-unicorn'
        });
    });

    test('no unknown eslint-plugin-unicorn rules are configured', function () {
        checkUnknownPluginRulesAreNotConfigured({
            ruleConfigSet: baseConfigRules,
            pluginRules: unicornPlugin.rules,
            pluginName: 'eslint-plugin-unicorn'
        });
    });

    test('all eslint-plugin-promise rules are configured', function () {
        checkAllPluginRulesConfigured({
            ruleConfigSet: baseConfigRules,
            pluginRules: promisePlugin.rules,
            pluginName: 'eslint-plugin-promise'
        });
    });

    test('no unknown eslint-plugin-promise rules are configured', function () {
        checkUnknownPluginRulesAreNotConfigured({
            ruleConfigSet: baseConfigRules,
            pluginRules: promisePlugin.rules,
            pluginName: 'eslint-plugin-promise'
        });
    });

    test('all eslint-plugin-array-func rules are configured', function () {
        checkAllPluginRulesConfigured({
            ruleConfigSet: baseConfigRules,
            pluginRules: arrayFunctionPlugin.rules,
            pluginName: 'eslint-plugin-array-func'
        });
    });

    test('no unknown eslint-plugin-array-func rules are configured', function () {
        checkUnknownPluginRulesAreNotConfigured({
            ruleConfigSet: baseConfigRules,
            pluginRules: arrayFunctionPlugin.rules,
            pluginName: 'eslint-plugin-array-func'
        });
    });

    test('all eslint-plugin-sonarjs rules are configured', function () {
        checkAllPluginRulesConfigured({
            ruleConfigSet: baseConfigRules,
            pluginRules: sonarjsPlugin.rules,
            pluginName: 'eslint-plugin-sonarjs'
        });
    });

    test('no unknown eslint-plugin-sonarjs rules are configured', function () {
        checkUnknownPluginRulesAreNotConfigured({
            ruleConfigSet: baseConfigRules,
            pluginRules: sonarjsPlugin.rules,
            pluginName: 'eslint-plugin-sonarjs'
        });
    });

    test('all eslint-plugin-no-barrel-files rules are configured', function () {
        checkAllPluginRulesConfigured({
            ruleConfigSet: baseConfigRules,
            pluginRules: noBarrelFiles.rules,
            pluginName: 'eslint-plugin-no-barrel-files'
        });
    });

    test('no unknown eslint-plugin-no-barrel-files rules are configured', function () {
        checkUnknownPluginRulesAreNotConfigured({
            ruleConfigSet: baseConfigRules,
            pluginRules: noBarrelFiles.rules,
            pluginName: 'eslint-plugin-no-barrel-files'
        });
    });
});
