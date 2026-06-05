import cspellPlugin from '@cspell/eslint-plugin';
import { baseConfig } from './target/build/configs/presets/base/base.js';
import { nodeConfig } from './target/build/configs/presets/node/node.js';

const codeSpellCheckerRules = {
    '@cspell/spellchecker': [
        'error',
        {
            cspell: {
                words: [
                    'espree',
                    'iife',
                    'multilines',
                    'setstate',
                    'sonarjs',
                    'textnodes',
                    'nonconstructor',
                    'linebreak',
                    'plusplus',
                    'camelcase',
                    'nonblock',
                    'backreference',
                    'nonoctal',
                    'chunkname',
                    'freelist',
                    'smalloc',
                    'mischeck',
                    'malva',
                    'dprint',
                    'commonmark',
                    'mdast',
                    'autolinks',
                    'blockquotes',
                    'setext',
                    'lookarounds',
                    'gypfile',
                    'libc'
                ]
            }
        }
    ]
};

// TypeScript sources and tests are not linted in this commit. Adopting the typescript preset
// against the freshly migrated code surfaces a broad set of follow-up rule violations
// (explicit return types, immutability, inline type literals, …) that are out of scope for the
// JavaScript-to-TypeScript move itself. A follow-up will enable typed linting and fix those.
export default [
    {
        ignores: [
            'test/fixtures/**',
            'target/**',
            'configs/**',
            'test/**',
            'types/**'
        ]
    },
    ...baseConfig,
    { ...nodeConfig, files: [ '**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}' ] },
    {
        files: [ 'eslint.config.js', 'prettier.config.js', 'mocha.config.json' ],
        plugins: {
            '@cspell': cspellPlugin
        },
        rules: {
            'import/no-default-export': 'off',
            ...codeSpellCheckerRules
        }
    }
];
