import cspellPlugin from '@cspell/eslint-plugin';
import { baseConfig } from './target/build/configs/presets/base/base.js';
import { mochaNodeAssertConfig } from './target/build/configs/presets/mocha-node-assert/mocha-node-assert.js';
import { nodeConfig } from './target/build/configs/presets/node/node.js';
import { typescriptConfig } from './target/build/configs/presets/typescript/typescript.js';

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
                    'libc',
                    'tses'
                ]
            }
        }
    ]
};

export default [
    {
        ignores: [ 'test/fixtures/**', 'target/**' ]
    },
    ...baseConfig,
    { ...nodeConfig, files: [ '**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}' ] },
    { ...typescriptConfig, files: [ '**/*.ts' ] },
    {
        // ESLint plugin packages (`@ben_12/eslint-plugin-dprint`, `eslint-plugin-perfectionist`,
        // `eslint-plugin-functional`, …) expose types that are not assignable to
        // `Linter.Config['plugins']`, so each preset's final cast to `Linter.Config[]` has to
        // route through `as unknown`. That second step is structurally narrowing, and is
        // flagged by `@typescript-eslint/no-unsafe-type-assertion` even though there is no
        // safer expression. Turning the rule off for preset sources is preferable to
        // adding one typed adapter per plugin.
        files: [ 'configs/**/*.ts', 'test/integration/lint-fixture.ts' ],
        rules: {
            '@typescript-eslint/no-unsafe-type-assertion': 'off'
        }
    },
    {
        // `eslint/use-at-your-own-risk` is the only published path to `builtinRules`, and the
        // entire module is marked `@deprecated` — by intent, not as a deprecation with a
        // replacement. The `no-restricted-syntax` and `no-restricted-imports` rules are
        // composed from it.
        files: [
            'configs/rule-sets/restricted-syntax.ts',
            'configs/rule-sets/restricted-imports.ts',
            'test/restricted-syntax.test.ts'
        ],
        rules: {
            'sonarjs/deprecation': 'off'
        }
    },
    {
        // Ambient module shims must stay in script mode to declare third-party modules without
        // type definitions. That precludes top-level `import type` (which would turn the file
        // into a module and prevent the ambient declarations from propagating) and forces
        // inline `import('eslint').ESLint.Plugin` annotations, and the runtime modules export
        // their plugin as the default export.
        files: [ 'types/**/*.d.ts' ],
        rules: {
            '@typescript-eslint/consistent-type-imports': 'off',
            'import/no-default-export': 'off',
            'no-duplicate-imports': 'off'
        }
    },
    {
        files: [ 'configs/**/*.ts' ],
        plugins: {
            '@cspell': cspellPlugin
        },
        rules: {
            'max-lines': [ 'error', { max: 2000, skipBlankLines: true, skipComments: false } ],
            ...codeSpellCheckerRules
        }
    },
    {
        files: [ 'eslint.config.js', 'prettier.config.js', 'mocha.config.json' ],
        plugins: {
            '@cspell': cspellPlugin
        },
        rules: {
            'import/no-default-export': 'off',
            ...codeSpellCheckerRules
        }
    },
    {
        ...mochaNodeAssertConfig,
        files: [ 'test/**/*.test.ts', 'test/rules-configuration.ts' ],
        plugins: {
            ...mochaNodeAssertConfig.plugins,
            '@cspell': cspellPlugin
        },
        rules: {
            ...mochaNodeAssertConfig.rules,
            ...codeSpellCheckerRules
        }
    }
];
