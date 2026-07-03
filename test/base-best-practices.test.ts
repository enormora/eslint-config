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
const browserUnicornRules = [
    'better-dom-traversing',
    'dom-node-dataset',
    'no-blob-to-file',
    'no-canvas-to-image',
    'no-incorrect-query-selector',
    'no-invalid-file-input-accept',
    'no-late-current-target-access',
    'no-late-event-control',
    'no-selector-as-dom-name',
    'no-unsafe-dom-html',
    'prefer-add-event-listener-options',
    'prefer-dom-node-html-methods',
    'prefer-dom-node-replace-children',
    'prefer-location-assign',
    'prefer-observer-apis',
    'prefer-path2d',
    'prefer-scoped-selector',
    'prefer-toggle-attribute',
    'require-css-escape',
    'require-passive-events'
];

suite('base best practices rule set', function () {
    test('all eslint-plugin-unicorn rules are configured', function () {
        checkAllPluginRulesConfigured({
            ruleConfigSet: baseConfigRules,
            pluginRules: unicornPlugin.rules,
            pluginName: 'eslint-plugin-unicorn',
            rulesToExclude: browserUnicornRules
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
