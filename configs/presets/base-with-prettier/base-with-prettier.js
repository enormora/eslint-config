import prettierPlugin from 'eslint-plugin-prettier';
import { baseSharedConfig } from '../base/base-shared.js';

export const baseWithPrettierConfig = {
    ...baseSharedConfig,
    plugins: {
        ...baseSharedConfig.plugins,
        prettier: prettierPlugin
    },
    rules: {
        ...baseSharedConfig.rules,

        'prettier/prettier': 'error'
    }
};
