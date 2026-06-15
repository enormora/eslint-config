import globals from 'globals';

export const browserConfig = {
    languageOptions: {
        globals: globals.browser
    },
    rules: {
        'no-alert': 'error',
        'no-script-url': 'error',
        'no-restricted-globals': [ 'error', 'event' ],

        'unicorn/better-dom-traversing': 'error',
        'unicorn/dom-node-dataset': 'error',
        'unicorn/no-blob-to-file': 'error',
        'unicorn/no-canvas-to-image': 'off',
        'unicorn/no-incorrect-query-selector': 'error',
        'unicorn/no-invalid-file-input-accept': 'error',
        'unicorn/no-late-current-target-access': 'error',
        'unicorn/no-unsafe-dom-html': 'error',
        'unicorn/prefer-add-event-listener-options': 'error',
        'unicorn/prefer-dom-node-html-methods': 'off',
        'unicorn/prefer-location-assign': 'error',
        'unicorn/prefer-path2d': 'off',
        'unicorn/prefer-scoped-selector': 'error',
        'unicorn/require-css-escape': 'error',
        'unicorn/require-passive-events': 'error'
    }
};
