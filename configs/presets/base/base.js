import dprintPlugin from '@ben_12/eslint-plugin-dprint';
import simpleParser from '@ben_12/eslint-simple-parser';
import { baseSharedConfig } from './base-shared.js';
import {
    jsonDprintConfig,
    markdownDprintConfig,
    tomlDprintConfig,
    typescriptDprintConfig,
    yamlDprintConfig
} from './dprint-config.js';

const baseJsConfig = {
    files: [ '**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx,vue}' ],
    ...baseSharedConfig,
    plugins: {
        ...baseSharedConfig.plugins,
        dprint: dprintPlugin
    },
    rules: {
        ...baseSharedConfig.rules,

        'dprint/typescript': [ 'error', { config: typescriptDprintConfig } ],
        'dprint/json': 'off',
        'dprint/markdown': 'off',
        'dprint/toml': 'off',
        'dprint/dockerfile': 'off',
        'dprint/malva': 'off',
        'dprint/markup': 'off',
        'dprint/yaml': 'off',
        'dprint/graphql': 'off',

        '@stylistic/member-delimiter-style': 'off'
    }
};

const dprintJsonConfig = {
    files: [ '**/*.json' ],
    languageOptions: { parser: simpleParser },
    plugins: { dprint: dprintPlugin },
    rules: { 'dprint/json': [ 'error', { config: jsonDprintConfig } ] }
};

const dprintMarkdownConfig = {
    files: [ '**/*.md' ],
    languageOptions: { parser: simpleParser },
    plugins: { dprint: dprintPlugin },
    rules: { 'dprint/markdown': [ 'error', { config: markdownDprintConfig } ] }
};

const dprintYamlConfig = {
    files: [ '**/*.{yml,yaml}' ],
    languageOptions: { parser: simpleParser },
    plugins: { dprint: dprintPlugin },
    rules: { 'dprint/yaml': [ 'error', { config: yamlDprintConfig } ] }
};

const dprintTomlConfig = {
    files: [ '**/*.toml' ],
    languageOptions: { parser: simpleParser },
    plugins: { dprint: dprintPlugin },
    rules: { 'dprint/toml': [ 'error', { config: tomlDprintConfig } ] }
};

export const baseConfig = [
    baseJsConfig,
    dprintJsonConfig,
    dprintMarkdownConfig,
    dprintYamlConfig,
    dprintTomlConfig
];

/* eslint-disable no-barrel-files/no-barrel-files -- expose dprint configs as public API so consumers can spread them when overriding individual options */
export {
    jsonDprintConfig,
    markdownDprintConfig,
    tomlDprintConfig,
    typescriptDprintConfig,
    yamlDprintConfig
} from './dprint-config.js';
/* eslint-enable no-barrel-files/no-barrel-files -- end of public re-exports */
