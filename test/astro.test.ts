import assert from 'node:assert';
import * as astroParser from 'astro-eslint-parser';
import astroPlugin, { rules as astroPluginRules } from 'eslint-plugin-astro';
import jsxAccessibilityPlugin from 'eslint-plugin-jsx-a11y';
import globals from 'globals';
import { suite, test } from 'mocha';
import { astroConfig } from '../configs/presets/astro/astro.ts';
import {
    checkAllPluginRulesConfigured,
    assertConfigToHaveNoValidationIssues,
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
        }, 'astro preset must expose the Astro and JSX accessibility plugins');
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
        }, 'astro preset must configure Astro parser language options');
    });

    test('astro preset config has the correct processor set', function () {
        assert.strictEqual(astroConfig[1].processor, 'astro/astro', 'astro preset must configure the Astro processor');
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
        }, 'astro preset must configure browser client script language options');
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
        assert.deepStrictEqual(
            assertConfigToHaveNoValidationIssues(astroConfig),
            [],
            'astro preset config must have no validation errors'
        );
    });
});
