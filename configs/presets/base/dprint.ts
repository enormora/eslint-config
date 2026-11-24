import dprintPlugin from '@ben_12/eslint-plugin-dprint';
import { disable } from '../../rule-severity.ts';
import { baseSharedConfig } from './base-shared.ts';
import { jsonDprintConfig, tomlDprintConfig, typescriptDprintConfig, yamlDprintConfig } from './dprint-config.ts';
import { dprintSettings } from './dprint-formatters.ts';
import { plainTextLanguagePlugin } from './plain-text-language.ts';

export const dprintJsConfig = {
    files: [ '**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx,vue}' ],
    ...baseSharedConfig,
    plugins: {
        ...baseSharedConfig.plugins,
        dprint: dprintPlugin
    },
    settings: { ...baseSharedConfig.settings, ...dprintSettings },
    rules: {
        ...baseSharedConfig.rules,

        'dprint/typescript': [ 'error', { config: typescriptDprintConfig } ],
        'dprint/json': disable<'Enabled only for matching non-JavaScript files'>(),
        'dprint/markdown': disable<'Enabled only for matching non-JavaScript files'>(),
        'dprint/toml': disable<'Enabled only for matching non-JavaScript files'>(),
        'dprint/dockerfile': disable<'This preset does not configure a formatter for this file type'>(),
        'dprint/malva': disable<'This preset does not configure a formatter for this file type'>(),
        'dprint/markup': disable<'This preset does not configure a formatter for this file type'>(),
        'dprint/yaml': disable<'Enabled only for matching non-JavaScript files'>(),
        'dprint/graphql': disable<'This preset does not configure a formatter for this file type'>(),
        'dprint/sql': disable<'This preset does not configure a formatter for this file type'>(),

        '@stylistic/member-delimiter-style': disable<
            'Conflicts with the active formatter over type member delimiters'
        >()
    }
};

export const dprintJsonConfig = {
    files: [ '**/*.json' ],
    ignores: [ '**/package.json' ],
    language: 'plain-text/any',
    plugins: { 'plain-text': plainTextLanguagePlugin, dprint: dprintPlugin },
    settings: dprintSettings,
    rules: { 'dprint/json': [ 'error', { config: jsonDprintConfig } ] }
};

export const dprintPackageJsonConfig = {
    files: [ '**/package.json' ],
    plugins: { dprint: dprintPlugin },
    settings: dprintSettings,
    rules: { 'dprint/json': [ 'error', { config: jsonDprintConfig } ] }
};

export const dprintYamlConfig = {
    files: [ '**/*.{yml,yaml}' ],
    language: 'plain-text/any',
    plugins: { 'plain-text': plainTextLanguagePlugin, dprint: dprintPlugin },
    settings: dprintSettings,
    rules: { 'dprint/yaml': [ 'error', { config: yamlDprintConfig } ] }
};

export const dprintTomlConfig = {
    files: [ '**/*.toml' ],
    language: 'plain-text/any',
    plugins: { 'plain-text': plainTextLanguagePlugin, dprint: dprintPlugin },
    settings: dprintSettings,
    rules: { 'dprint/toml': [ 'error', { config: tomlDprintConfig } ] }
};
