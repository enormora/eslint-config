import { reactJsxConfig } from './react-jsx.js';
import { javascriptExtensions, typescriptExtensions } from './constants.js';

export const reactTsxConfig = {
    languageOptions: reactJsxConfig.languageOptions,
    plugins: reactJsxConfig.plugins,
    settings: {
        'import/resolver': {
            node: {
                extensions: [...javascriptExtensions, ...typescriptExtensions, '.tsx']
            }
        },
        'import/parsers': {
            '@typescript-eslint/parser': [...typescriptExtensions, '.tsx']
        }
    },
    rules: reactJsxConfig.rules
};
