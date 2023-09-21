import { baseConfig } from './configs/base.js';

export default [
    baseConfig,
    {
        files: ['configs/**/*.js'],
        rules: {
            'max-lines': ['error', { max: 2000, skipBlankLines: true, skipComments: false }]
        }
    },
    {
        files: ['eslint.config.js', 'prettier.config.js', 'ava.config.js'],
        rules: {
            'import/no-default-export': 'off'
        }
    }
];
