import type { Linter } from 'eslint';
import mochaPlugin from 'eslint-plugin-mocha';
import { testRuleSet } from '../test-base/test-base.ts';

/* eslint-disable no-barrel-files/no-barrel-files -- expose testSupportConfig as public API so consumers can apply the shared relaxations to non-test test files without depending on @enormora/eslint-config-test-base directly */
export { testSupportConfig } from '../test-base/test-base.ts';
/* eslint-enable no-barrel-files/no-barrel-files -- end of public re-exports */

export const mochaConfig = {
    plugins: {
        mocha: mochaPlugin
    },
    rules: {
        ...testRuleSet.rules,

        'prefer-arrow-callback': 'off',

        'mocha/consistent-structure': [ 'error', { disallowDuplicateHooks: true } ],
        'mocha/handle-done-callback': 'error',
        'mocha/limit-retries': 'error',
        'mocha/limit-slow': 'error',
        'mocha/limit-timeout': 'error',
        'mocha/max-top-level-suites': 'error',
        'mocha/no-async-and-done': 'error',
        'mocha/no-async-in-sync-tests': 'error',
        'mocha/no-async-suite': 'error',
        'mocha/no-code-after-done': 'error',
        'mocha/no-conditional-tests': 'error',
        'mocha/no-done-twice': 'error',
        'mocha/no-empty-title': 'error',
        'mocha/no-exclusive-tests': 'error',
        'mocha/no-exports': 'error',
        'mocha/no-hooks': 'error',
        'mocha/no-hooks-for-single-child': 'off',
        'mocha/no-identical-title': 'error',
        'mocha/no-mocha-arrows': 'error',
        'mocha/no-nested-suites': 'off',
        'mocha/no-nested-tests': 'error',
        'mocha/no-pending-tests': 'error',
        'mocha/no-return-and-done': 'error',
        'mocha/no-return-from-async': 'off',
        'mocha/no-root-hooks': 'off',
        'mocha/no-setup-in-suite': 'off',
        'mocha/no-synchronous-tests': 'off',
        'mocha/no-top-level-tests': 'error',
        'mocha/prefer-arrow-callback': 'off',
        'mocha/valid-suite-title': 'off',
        'mocha/valid-test-title': 'off',
        'mocha/consistent-spacing-between-blocks': 'error',
        'mocha/consistent-interface': [ 'error', { interface: 'TDD' } ]
    },
    settings: {
        mocha: {
            interface: 'require'
        }
    }
} as unknown as Linter.Config;
