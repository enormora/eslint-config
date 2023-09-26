import { baseConfig } from './configs/base.js';
import { nodeConfig } from './configs/node.js';
import { avaConfig } from './configs/ava.js';

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
                    'mischeck'
                ]
            }
        }
    ]
};

export default [
    baseConfig,
    nodeConfig,
    {
        files: ['configs/**/*.js'],
        rules: {
            'max-lines': ['error', { max: 2000, skipBlankLines: true, skipComments: false }],
            ...codeSpellCheckerRules
        }
    },
    {
        files: ['eslint.config.js', 'prettier.config.js', 'ava.config.js'],
        rules: {
            'import/no-default-export': 'off',
            ...codeSpellCheckerRules
        }
    },
    {
        ...avaConfig,
        files: ['test/**/*.test.js', 'test/rules-configuration.js'],
        rules: {
            ...avaConfig.rules,
            ...codeSpellCheckerRules
        }
    }
];
