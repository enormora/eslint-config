import nodeAssertPlugin from '@enormora/eslint-plugin-node-assert';
import type { Linter } from 'eslint';

export const nodeAssertConfig = {
    plugins: {
        'node-assert': nodeAssertPlugin as unknown as NonNullable<Linter.Config['plugins']>[string]
    },
    rules: {
        'node-assert/consistent-import': [ 'error', { style: 'base' } ],
        'node-assert/no-async-function-in-sync-assertion': 'error',
        'node-assert/no-await-argument-in-rejects': 'error',
        'node-assert/no-constant-actual': 'error',
        'node-assert/no-expected-value-as-message': 'error',
        'node-assert/no-restricted-assertion': [
            'error',
            {
                assertions: [
                    {
                        name: 'doesNotReject',
                        message: 'Avoid assert.doesNotReject(). Await the promise directly instead.'
                    },
                    {
                        name: 'doesNotThrow',
                        message: 'Avoid assert.doesNotThrow(). Call the function directly instead.'
                    }
                ]
            }
        ],
        'node-assert/no-useless-assertion': 'error',
        'node-assert/prefer-comparison-assertion': 'error',
        'node-assert/prefer-deep-equality': 'error',
        'node-assert/prefer-match': 'error',
        'node-assert/prefer-partial-deep-strict-equal': 'error',
        'node-assert/require-custom-message': 'off',
        'node-assert/require-error-matcher': 'error',
        'node-assert/require-strict': [ 'error', { mode: 'explicit' } ],
        'node-assert/require-valid-error-validator-return': 'error'
    }
} as unknown as Linter.Config;
