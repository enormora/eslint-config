import assert from 'node:assert';
import typescriptParser from '@typescript-eslint/parser';
import { suite, test } from 'mocha';
import vuePlugin from 'eslint-plugin-vue';
import globals from 'globals';
import vueParser from 'vue-eslint-parser';
import { vueConfig } from '../configs/presets/vue-ts/vue-ts.ts';
import {
    checkAllPluginRulesConfigured,
    checkConfigLanguageOptions,
    assertConfigToHaveNoValidationIssues,
    checkUnknownPluginRulesAreNotConfigured
} from './rules-configuration.ts';

suite('vue-ts preset', function () {
    test('vue preset config has the correct language options defined', function () {
        checkConfigLanguageOptions({
            configLanguageOptions: vueConfig.languageOptions,
            languageOptions: {
                parser: vueParser,
                globals: globals['shared-node-browser'],
                parserOptions: {
                    parser: typescriptParser,
                    extraFileExtensions: [ '.vue' ],
                    warnOnUnsupportedTypeScriptVersion: false,
                    sourceType: 'module',
                    ecmaFeatures: {
                        jsx: false,
                        globalReturn: false
                    },
                    projectService: true
                }
            }
        });
    });

    test('vue preset config has the correct processor set', function () {
        assert.strictEqual(vueConfig.processor, 'vue/vue', 'Vue preset must configure the Vue processor');
    });

    test('all eslint-plugin-vue rules are configured', function () {
        checkAllPluginRulesConfigured({
            ruleConfigSet: vueConfig.rules,
            pluginRules: vuePlugin.rules,
            pluginName: 'eslint-plugin-vue'
        });
    });

    test('no unknown eslint-plugin-vue rules are configured', function () {
        checkUnknownPluginRulesAreNotConfigured({
            ruleConfigSet: vueConfig.rules,
            pluginRules: vuePlugin.rules,
            pluginName: 'eslint-plugin-vue'
        });
    });

    test('vue preset config has no validation errors', function () {
        assert.deepStrictEqual(
            assertConfigToHaveNoValidationIssues(vueConfig),
            [],
            'Vue preset config must have no validation errors'
        );
    });
});
