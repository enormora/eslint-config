import nodePlugin from 'eslint-plugin-n';
import globals from 'globals';

export const nodeConfig = {
    languageOptions: {
        globals: globals.nodeBuiltin
    },
    plugins: {
        node: nodePlugin
    },
    rules: {
        'node/no-unpublished-bin': 'off',
        'node/no-unsupported-features/node-builtins': 'error',
        'node/no-unsupported-features/es-syntax': 'error',
        'node/no-unsupported-features/es-builtins': 'error',
        'node/no-deprecated-api': 'error',
        'node/prefer-global/buffer': ['error', 'always'],
        'node/prefer-global/console': ['error', 'always'],
        'node/prefer-global/process': ['error', 'always'],
        'node/prefer-global/text-decoder': ['error', 'always'],
        'node/prefer-global/text-encoder': ['error', 'always'],
        'node/prefer-global/url-search-params': ['error', 'always'],
        'node/prefer-global/url': ['error', 'always'],
        'node/prefer-promises/dns': 'error',
        'node/prefer-promises/fs': 'error',
        'node/callback-return': 'off',
        'node/exports-style': 'off',
        'node/file-extension-in-import': 'off',
        'node/global-require': 'off',
        'node/handle-callback-err': ['error', '^(e$|(e|(.*(_e|E)))rr)'],
        'node/no-callback-literal': 'error',
        'node/no-exports-assign': 'off',
        'node/no-extraneous-import': 'off',
        'node/no-extraneous-require': 'off',
        'node/no-missing-import': 'off',
        'node/no-missing-require': 'off',
        'node/no-mixed-requires': 'off',
        'node/no-new-require': 'error',
        'node/no-path-concat': 'error',
        'node/no-process-env': 'error',
        'node/no-process-exit': 'error',
        'node/no-restricted-require': ['error', ['domain', 'freelist', 'smalloc', 'sys', 'colors']],
        'node/no-restricted-import': ['error', ['domain', 'freelist', 'smalloc', 'sys', 'colors']],
        'node/no-sync': 'error',
        'node/no-unpublished-import': 'off',
        'node/no-unpublished-require': 'off',
        'node/process-exit-as-throw': 'error',
        'node/shebang': 'off'
    }
};

export const nodeEntryPointFileConfig = {
    rules: {
        'no-console': 'off',
        'import/max-dependencies': 'off',
        'node/no-process-env': 'off'
    }
};

export const nodeConfigFileConfig = {
    rules: {
        'import/no-default-export': 'off'
    }
};
