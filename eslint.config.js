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

// Typed linting of the migrated configs/ and test/ TypeScript sources is intentionally
// deferred. Turning the typescript preset on against this code surfaces a structural
// tension with @typescript-eslint/no-unsafe-type-assertion: ESLint plugin packages
// (dprint, perfectionist, functional, …) expose types that are not assignable to
// Linter.Config['plugins'], so every preset needs an `as unknown as Linter.Config[]`
// cast that the rule then flags. Resolving that requires either overriding the rule
// for preset files (a project-wide policy decision) or a deeper refactor to wrap each
// plugin in a typed adapter; either way it is its own change.
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
