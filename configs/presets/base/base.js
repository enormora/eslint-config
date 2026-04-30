import dprintPlugin from '@ben_12/eslint-plugin-dprint';
import { baseSharedConfig } from './base-shared.js';

export const baseConfig = {
    ...baseSharedConfig,
    plugins: {
        ...baseSharedConfig.plugins,
        dprint: dprintPlugin
    },
    rules: {
        ...baseSharedConfig.rules,

        'dprint/typescript': ['error', { configFile: 'dprint.json' }],
        'dprint/json': 'off',
        'dprint/markdown': 'off',
        'dprint/toml': 'off',
        'dprint/dockerfile': 'off',
        'dprint/malva': 'off',
        'dprint/markup': 'off',
        'dprint/yaml': 'off',
        'dprint/graphql': 'off',

        '@stylistic/member-delimiter-style': 'off',
        '@stylistic/operator-linebreak': 'off',
        'import/order': 'off'
    }
};
