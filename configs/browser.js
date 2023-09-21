import globals from 'globals';

export const browserConfig = {
    languageOptions: {
        globals: globals.browser
    },
    rules: {
        'no-alert': 'error',
        'no-script-url': 'error',
        'no-restricted-globals': ['error', 'event']
    }
};
