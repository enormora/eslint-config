import { javascriptExtensions, typescriptExtensions } from '../../constants.ts';
import { reactJsxConfig } from '../react-jsx/react-jsx.ts';

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

        'sonarjs/prefer-read-only-props': 'error',

        'import/extensions': [
            'error',
            {
                tsx: 'ignorePackages',
                json: 'ignorePackages'
            }
        ]
    }
};
