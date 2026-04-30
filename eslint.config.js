import { avaConfig } from './configs/presets/ava/ava.js';
import { baseConfig } from './configs/presets/base/base.js';
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
        ignores: ['test/fixtures/**']
    },
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
