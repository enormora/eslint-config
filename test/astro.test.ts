import assert from 'node:assert';
import * as astroParser from 'astro-eslint-parser';
import astroPlugin, { rules as astroPluginRules } from 'eslint-plugin-astro';
import jsxAccessibilityPlugin from 'eslint-plugin-jsx-a11y';
import globals from 'globals';
import { suite, test } from 'mocha';
import { astroConfig } from '../configs/presets/astro/astro.ts';
import {
    checkAllPluginRulesConfigured,
    checkConfigToHaveNoValidationIssues,
    checkUnknownPluginRulesAreNotConfigured,
    mergeConfigRules
} from './rules-configuration.ts';

const astroConfigRules = mergeConfigRules(astroConfig);

suite('astro preset', function () {
    test('astro preset config has the correct plugin defined', function () {
        assert.deepStrictEqual(astroConfig[0], {
            plugins: {
                astro: astroPlugin,
                'jsx-a11y': jsxAccessibilityPlugin
            }
        });
    });

    test('astro preset config has the correct astro language options defined', function () {
        assert.deepStrictEqual(astroConfig[1].languageOptions, {
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

    test('astro preset config has the correct processor set', function () {
        assert.strictEqual(astroConfig[1].processor, 'astro/astro');
    });

    test('astro preset config has the correct client script language options defined', function () {
        assert.deepStrictEqual(astroConfig[2].languageOptions, {
            globals: {
                ...globals.browser,
                ...globals.es2025
            },
            parserOptions: {
                sourceType: 'module'
            }
        });
    });

    test('all eslint-plugin-astro rules are configured', function () {
        checkAllPluginRulesConfigured({
            ruleConfigSet: astroConfigRules,
            pluginRules: astroPluginRules,
            pluginName: 'eslint-plugin-astro'
        });
    });

    test('no unknown eslint-plugin-astro rules are configured', function () {
        checkUnknownPluginRulesAreNotConfigured({
            ruleConfigSet: astroConfigRules,
            pluginRules: astroPluginRules,
            pluginName: 'eslint-plugin-astro'
        });
    });

    test('astro preset config has no validation errors', function () {
        checkConfigToHaveNoValidationIssues(astroConfig);
    });
});
