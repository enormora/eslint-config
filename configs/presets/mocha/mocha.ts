import type { Linter } from 'eslint';
import mochaPlugin from 'eslint-plugin-mocha';
import { testRuleSet } from '../test-base/test-base.ts';
import { disable } from '../../rule-severity.ts';

/* eslint-disable no-barrel-files/no-barrel-files -- expose testSupportConfig as public API so consumers can apply the shared relaxations to non-test test files without depending on @enormora/eslint-config-test-base directly */
export { testSupportConfig } from '../test-base/test-base.ts';
/* eslint-enable no-barrel-files/no-barrel-files -- end of public re-exports */

export const mochaConfig = {
    plugins: {
        mocha: mochaPlugin
    },
    rules: {
        ...testRuleSet.rules,

        'prefer-arrow-callback': disable<'Conflicts with mocha/no-mocha-arrows'>(),

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
        'mocha/no-hooks-for-single-child': disable<'Hooks are already prohibited by mocha/no-hooks'>(),
        'mocha/no-identical-title': 'error',
        'mocha/no-mocha-arrows': 'error',
        'mocha/no-nested-suites': disable<'Nested suites are allowed to group related behavior'>(),
        'mocha/no-nested-tests': 'error',
        'mocha/no-pending-tests': 'error',
        'mocha/no-return-and-done': 'error',
        'mocha/no-return-from-async': disable<'Async tests may return their completion promise'>(),
        'mocha/no-root-hooks': disable<'Hooks are already prohibited by mocha/no-hooks'>(),
        'mocha/no-setup-in-suite': disable<'Suite setup is allowed without requiring hooks'>(),
        'mocha/no-synchronous-tests': disable<'Synchronous behavior may use synchronous tests'>(),
        'mocha/no-top-level-tests': 'error',
        'mocha/prefer-arrow-callback': disable<'Conflicts with mocha/no-mocha-arrows'>(),
        'mocha/valid-suite-title': disable<'Suite titles need not follow a project-independent pattern'>(),
        'mocha/valid-test-title': disable<'Test titles need not follow a project-independent pattern'>(),
        'mocha/consistent-spacing-between-blocks': 'error',
        'mocha/consistent-interface': [ 'error', { interface: 'TDD' } ]
    },
    settings: {
        mocha: {
            interface: 'require'
        }
    }
} as unknown as Linter.Config;
