import prettierPlugin from 'eslint-plugin-prettier';
import destructuringPlugin from 'eslint-plugin-destructuring';

export const stylisticRuleSet = {
    plugins: {
        prettier: prettierPlugin,
        destructuring: destructuringPlugin
    },

    settings: {},

    rules: {
        'prettier/prettier': 'error',

        'destructuring/in-methods-params': 'error',
        'destructuring/in-params': ['error', { 'max-params': 0 }],
        'destructuring/no-rename': 'off'
    }
};
