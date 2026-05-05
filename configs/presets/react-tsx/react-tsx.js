import { javascriptExtensions, typescriptExtensions } from '../../constants.js';
import { reactJsxConfig } from '../react-jsx/react-jsx.js';

export const reactTsxConfig = {
    languageOptions: reactJsxConfig.languageOptions,
    plugins: reactJsxConfig.plugins,
    settings: {
        'import/resolver': {
            node: {
                extensions: [ ...javascriptExtensions, ...typescriptExtensions, '.tsx' ]
            }
        },
        'import/parsers': {
            '@typescript-eslint/parser': [ ...typescriptExtensions, '.tsx' ]
        }
    },
    rules: {
        ...reactJsxConfig.rules,

        'import/extensions': [
            'error',
            {
                tsx: 'ignorePackages',
                json: 'ignorePackages'
            }
        ]
    }
};
