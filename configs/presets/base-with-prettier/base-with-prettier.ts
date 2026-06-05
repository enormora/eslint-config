import simpleParser from '@ben_12/eslint-simple-parser';
import type { Linter } from 'eslint';
import prettierPlugin from 'eslint-plugin-prettier';
import { baseSharedConfig } from '../base/base-shared.ts';
import { markdownLintPlugins, markdownLintRules } from '../base/markdown-lint-rules.ts';
import { packageJsonConfig } from '../base/package-json.ts';

const baseJsConfig = {
    files: [ '**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx,vue}' ],
    ...baseSharedConfig,
    plugins: {
        ...baseSharedConfig.plugins,
        prettier: prettierPlugin
    },
    rules: {
        ...baseSharedConfig.rules,

        'prettier/prettier': 'error',

        // Prettier owns TypeScript member delimiter formatting; the stylistic rule would only fight it.
        '@stylistic/member-delimiter-style': 'off'
    }
};

const prettierJsonConfig = {
    files: [ '**/*.json' ],
    languageOptions: { parser: simpleParser },
    plugins: { prettier: prettierPlugin },
    rules: { 'prettier/prettier': 'error' }
};

const prettierYamlConfig = {
    files: [ '**/*.{yml,yaml}' ],
    languageOptions: { parser: simpleParser },
    plugins: { prettier: prettierPlugin },
    rules: { 'prettier/prettier': 'error' }
};

const markdownConfig = {
    files: [ '**/*.md' ],
    plugins: {
        ...markdownLintPlugins,
        prettier: prettierPlugin
    },
    // See ../base/markdown.js for why this is pinned to commonmark instead of gfm.
    language: 'markdown/commonmark',
    rules: {
        'prettier/prettier': 'error',

        ...markdownLintRules
    }
};

export const baseWithPrettierConfig = [
    baseJsConfig,
    prettierJsonConfig,
    packageJsonConfig,
    markdownConfig,
    prettierYamlConfig
] as Linter.Config[];

/* eslint-disable no-barrel-files/no-barrel-files -- expose cspell helper as public API so consumers can spread or call it when customizing */
export { withCspellWords } from '../base/cspell-config.ts';
/* eslint-enable no-barrel-files/no-barrel-files -- end of public re-exports */
