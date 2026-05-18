import typescriptParser from '@typescript-eslint/parser';
import * as astroParser from 'astro-eslint-parser';
import { Linter } from 'eslint';
import astroPlugin, { rules as astroPluginRules } from 'eslint-plugin-astro';
import jsxAccessibilityPlugin from 'eslint-plugin-jsx-a11y';
import globals from 'globals';
import test from 'ava';
import { astroRules } from '../configs/presets/astro/astro.js';
import { astroConfig } from '../configs/presets/astro-ts/astro-ts.js';
import {
    checkAllPluginRulesConfigured,
    checkConfigToHaveNoValidationIssues,
    checkUnknownPluginRulesAreNotConfigured,
    mergeConfigRules
} from './rules-configuration.js';

const astroConfigRules = mergeConfigRules(astroConfig);

test('astro-ts preset config has the correct plugin defined', (t) => {
    t.deepEqual(astroConfig[0], {
        plugins: {
            astro: astroPlugin,
            'jsx-a11y': jsxAccessibilityPlugin
        }
    });
});

test('astro-ts preset config has the correct astro language options defined', (t) => {
    t.deepEqual(astroConfig[1].languageOptions, {
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
    });
});

test('astro-ts preset config has the correct processor set', (t) => {
    t.is(astroConfig[1].processor, 'astro/client-side-ts');
});

test('astro-ts preset config has the correct client script language options defined', (t) => {
    t.deepEqual(astroConfig[2].languageOptions, {
        globals: {
            ...globals.browser,
            ...globals.es2025
        },
        parserOptions: {
            sourceType: 'module'
        }
    });

    t.deepEqual(astroConfig[3].languageOptions, {
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

test('astro-ts preset rules are attached to the astro file block', (t) => {
    t.is(astroConfig[1].rules, astroRules);
});

test('astro-ts preset config reports astro and accessibility violations', (t) => {
    const linter = new Linter({ configType: 'flat' });
    const sourceCodeLines = [
        '---',
        'const html = "<strong>Unsafe</strong>";',
        '---',
        '<html><body><img src="/logo.png" /><div set:html={html} /></body></html>'
    ];
    const messages = linter.verify(sourceCodeLines.join('\n'), astroConfig, 'src/pages/index.astro');
    const ruleIds = new Set(messages.map((message) => {
        return message.ruleId;
    }));

    t.true(ruleIds.has('astro/no-set-html-directive'));
    t.true(ruleIds.has('astro/jsx-a11y/alt-text'));
});

test('astro-ts preset config has no validation errors', checkConfigToHaveNoValidationIssues, astroConfig);
