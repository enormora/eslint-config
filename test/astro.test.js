import * as astroParser from 'astro-eslint-parser';
import astroPlugin, { rules as astroPluginRules } from 'eslint-plugin-astro';
import jsxAccessibilityPlugin from 'eslint-plugin-jsx-a11y';
import globals from 'globals';
import test from 'ava';
import { astroConfig } from '../configs/presets/astro/astro.js';
import {
    checkAllPluginRulesConfigured,
    checkConfigToHaveNoValidationIssues,
    checkUnknownPluginRulesAreNotConfigured,
    mergeConfigRules
} from './rules-configuration.js';

const astroConfigRules = mergeConfigRules(astroConfig);

test('astro preset config has the correct plugin defined', (t) => {
    t.deepEqual(astroConfig[0], {
        plugins: {
            astro: astroPlugin,
            'jsx-a11y': jsxAccessibilityPlugin
        }
    });
});

test('astro preset config has the correct astro language options defined', (t) => {
    t.deepEqual(astroConfig[1].languageOptions, {
        parser: astroParser,
        globals: {
            ...globals.node,
            ...globals.es2025,
            Astro: false,
            Fragment: false
        },
        parserOptions: {
            extraFileExtensions: [ '.astro' ],
            sourceType: 'module'
        }
    });
});

test('astro preset config has the correct processor set', (t) => {
    t.is(astroConfig[1].processor, 'astro/astro');
});

test('astro preset config has the correct client script language options defined', (t) => {
    t.deepEqual(astroConfig[2].languageOptions, {
        globals: {
            ...globals.browser,
            ...globals.es2025
        },
        parserOptions: {
            sourceType: 'module'
        }
    });
});

test('all eslint-plugin-astro rules are configured', checkAllPluginRulesConfigured, {
    ruleConfigSet: astroConfigRules,
    pluginRules: astroPluginRules,
    pluginName: 'eslint-plugin-astro'
});

test('no unknown eslint-plugin-astro rules are configured', checkUnknownPluginRulesAreNotConfigured, {
    ruleConfigSet: astroConfigRules,
    pluginRules: astroPluginRules,
    pluginName: 'eslint-plugin-astro'
});

test('astro preset config has no validation errors', checkConfigToHaveNoValidationIssues, astroConfig);
