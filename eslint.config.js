import cspellPlugin from '@cspell/eslint-plugin';
import { baseConfig } from './configs/presets/base/base.js';
import { mochaConfig } from './configs/presets/mocha/mocha.js';
import { nodeConfig } from './configs/presets/node/node.js';

const codeSpellCheckerRules = {
    '@cspell/spellchecker': [
        'warn',
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
                    'dprint'
                ]
            }
        }
    ]
};

export default [
    {
        ignores: [ 'test/fixtures/**' ]
    },
    ...baseConfig,
    nodeConfig,
    {
        files: [ 'configs/**/*.js' ],
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
        ...mochaConfig,
        files: [ 'test/**/*.test.js', 'test/rules-configuration.js' ],
        plugins: {
            ...mochaConfig.plugins,
            '@cspell': cspellPlugin
        },
        rules: {
            ...mochaConfig.rules,
            ...codeSpellCheckerRules
        }
    }
];
