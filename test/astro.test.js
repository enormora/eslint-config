import * as astroParser from 'astro-eslint-parser';
import { Linter } from 'eslint';
import astroPlugin, { rules as astroPluginRules } from 'eslint-plugin-astro';
import jsxAccessibilityPlugin from 'eslint-plugin-jsx-a11y';
import globals from 'globals';
import test from 'ava';
import { astroConfig, astroRules } from '../configs/presets/astro/astro.js';
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

test('astro preset rules are attached to the astro file block', (t) => {
    t.is(astroConfig[1].rules, astroRules);
});

test('astro preset uses rule settings compatible with eslint-plugin-astro', (t) => {
    t.is(astroRules['astro/jsx-a11y/control-has-associated-label'], 'error');
    t.is(astroRules['astro/jsx-a11y/interactive-supports-focus'], 'error');
    t.is(astroRules['astro/jsx-a11y/no-noninteractive-element-interactions'], 'error');
});

test('astro preset config reports astro and accessibility violations', (t) => {
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

test('astro preset config has no validation errors', checkConfigToHaveNoValidationIssues, astroConfig);
