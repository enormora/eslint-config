import { baseConfig } from './configs/base.js';
import { nodeConfig } from './configs/node.js';
import { avaConfig } from './configs/ava.js';

export default [
    baseConfig,
    nodeConfig,
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
    },
    {
        ...avaConfig,
        files: ['test/**/*.test.js', 'test/rules-configuration.js']
    }
];
