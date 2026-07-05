import assert from 'node:assert';
import typescriptParser from '@typescript-eslint/parser';
import * as astroParser from 'astro-eslint-parser';
import astroPlugin, { rules as astroPluginRules } from 'eslint-plugin-astro';
import jsxAccessibilityPlugin from 'eslint-plugin-jsx-a11y';
import globals from 'globals';
import { suite, test } from 'mocha';
import { astroConfig } from '../configs/presets/astro-ts/astro-ts.ts';
import {
    checkAllPluginRulesConfigured,
    assertConfigToHaveNoValidationIssues,
    checkUnknownPluginRulesAreNotConfigured,
    mergeConfigRules
} from './rules-configuration.ts';

const astroConfigRules = mergeConfigRules(astroConfig);

suite('astro-ts preset', function () {
    test('astro-ts preset config has the correct plugin defined', function () {
        assert.deepStrictEqual(astroConfig[0], {
            plugins: {
                astro: astroPlugin,
                'jsx-a11y': jsxAccessibilityPlugin
            }
        }, 'astro-ts preset must expose the Astro and JSX accessibility plugins');
    });

    test('astro-ts preset config has the correct astro language options defined', function () {
        assert.deepStrictEqual(astroConfig[1].languageOptions, {
            parser: astroParser,
            globals: {
                ...globals.node,
                ...globals.es2025,
                Astro: false,
                Fragment: false
            },
            parserOptions: {
                parser: typescriptParser,
                extraFileExtensions: [ '.astro' ],
                warnOnUnsupportedTypeScriptVersion: false,
                sourceType: 'module'
            }
        }, 'astro-ts preset must configure Astro parser language options');
    });

    test('astro-ts preset config has the correct processor set', function () {
        assert.strictEqual(
            astroConfig[1].processor,
            'astro/client-side-ts',
            'astro-ts preset must configure the TypeScript Astro processor'
        );
    });

    test('astro-ts preset config has the correct client script language options defined', function () {
        assert.deepStrictEqual(astroConfig[2].languageOptions, {
            globals: {
                ...globals.browser,
                ...globals.es2025
            },
            parserOptions: {
                sourceType: 'module'
            }
        }, 'astro-ts preset must configure JavaScript client script language options');

        assert.deepStrictEqual(astroConfig[3].languageOptions, {
            parser: typescriptParser,
            globals: {
                ...globals.browser,
                ...globals.es2025
            },
            parserOptions: {
                warnOnUnsupportedTypeScriptVersion: false,
                sourceType: 'module',
                project: null
            }
        }, 'astro-ts preset must configure TypeScript client script language options');
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

    test('astro-ts preset config has no validation errors', function () {
        assert.deepStrictEqual(
            assertConfigToHaveNoValidationIssues(astroConfig),
            [],
            'astro-ts preset config must have no validation errors'
        );
    });
});
