import test from 'ava';
import typescriptParser from '@typescript-eslint/parser';
import globals from 'globals';
import vuePlugin from 'eslint-plugin-vue';
import { vueConfig } from '../configs/vue-ts.js';
import {
    checkAllPluginRulesConfigured,
    checkUnknownPluginRulesAreNotConfigured,
    checkConfigToHaveNoValidationIssues,
    checkConfigLanguageOptions
} from './rules-configuration.js';

test('vue preset config has the correct language options defined', checkConfigLanguageOptions, {
    configLanguageOptions: vueConfig.languageOptions,
    languageOptions: {
        parser: typescriptParser,
        globals: {
            ...globals['shared-node-browser']
        }
    }
});

test('all eslint-plugin-vue rules are configured', checkAllPluginRulesConfigured, {
    ruleConfigSet: vueConfig.rules,
    pluginRules: vuePlugin.rules,
    pluginName: 'eslint-plugin-vue'
});

test('no unknown eslint-plugin-react rules are configured', checkUnknownPluginRulesAreNotConfigured, {
    ruleConfigSet: vueConfig.rules,
    pluginRules: vuePlugin.rules,
    pluginName: 'eslint-plugin-vue'
});

test('vue preset config has no validation errors', checkConfigToHaveNoValidationIssues, vueConfig);
