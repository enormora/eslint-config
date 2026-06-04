import dprintPlugin from '@ben_12/eslint-plugin-dprint';
import simpleParser from '@ben_12/eslint-simple-parser';
import { baseSharedConfig } from './base-shared.js';
import { jsonDprintConfig, tomlDprintConfig, typescriptDprintConfig, yamlDprintConfig } from './dprint-config.js';
import { dprintSettings } from './dprint-formatters.js';
import { markdownConfig } from './markdown.js';
import { packageJsonConfig } from './package-json.js';

const baseJsConfig = {
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
    settings: dprintSettings,
    rules: { 'dprint/json': [ 'error', { config: jsonDprintConfig } ] }
};

const dprintYamlConfig = {
    files: [ '**/*.{yml,yaml}' ],
    languageOptions: { parser: simpleParser },
    plugins: { dprint: dprintPlugin },
    settings: dprintSettings,
    rules: { 'dprint/yaml': [ 'error', { config: yamlDprintConfig } ] }
};

const dprintTomlConfig = {
    files: [ '**/*.toml' ],
    languageOptions: { parser: simpleParser },
    plugins: { dprint: dprintPlugin },
    settings: dprintSettings,
    rules: { 'dprint/toml': [ 'error', { config: tomlDprintConfig } ] }
};

export const baseConfig = [
    baseJsConfig,
    dprintJsonConfig,
    packageJsonConfig,
    markdownConfig,
    dprintYamlConfig,
    dprintTomlConfig
];

/* eslint-disable no-barrel-files/no-barrel-files -- expose dprint configs and cspell helper as public API so consumers can spread or call them when customizing */
export {
    jsonDprintConfig,
    markdownDprintConfig,
    tomlDprintConfig,
    typescriptDprintConfig,
    yamlDprintConfig
} from './dprint-config.js';
export { withCspellWords } from './cspell-config.js';
/* eslint-enable no-barrel-files/no-barrel-files -- end of public re-exports */
