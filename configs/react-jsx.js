import { reactConfig } from './react.js';
import { javascriptExtensions } from './constants.js';

export const reactJsxConfig = {
    languageOptions: {
        parserOptions: {
            ecmaFeatures: {
                jsx: true
            }
        }
    },
    plugins: reactConfig.plugins,
    settings: {
        'import/parsers': {
            espree: [...javascriptExtensions, '.jsx']
        }
    },
    rules: {
        ...reactConfig.rules,
        'jsx-quotes': ['error', 'prefer-single'],
        'react/jsx-key': 'error',
        'react/jsx-max-depth': ['error', { max: 10 }],
        'react/jsx-no-comment-textnodes': 'error',
        'react/jsx-no-duplicate-props': 'error',
        'react/jsx-no-literals': 'error',
        'react/jsx-no-script-url': 'error',
        'react/jsx-no-target-blank': 'error',
        'react/jsx-no-useless-fragment': 'error',
        'react/jsx-no-undef': 'error',
        'react/jsx-pascal-case': 'error',
        'react/jsx-fragments': ['error', 'element'],
        'react/jsx-props-no-spreading': 'error',
        'react/jsx-uses-react': 'error',
        'react/jsx-uses-vars': 'error',
        'react/react-in-jsx-scope': 'error',
        'react/jsx-no-constructed-context-values': 'error',
        'react/jsx-no-leaked-render': 'error'
    }
};
