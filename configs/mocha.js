import mochaPlugin from 'eslint-plugin-mocha';
import { testRuleSet } from './rule-sets/test-rules.js';

export const mochaConfig = {
    plugins: {
        mocha: mochaPlugin
    },
    rules: {
        ...testRuleSet.rules,

        'prefer-arrow-callback': 'off',

        'mocha/handle-done-callback': 'error',
        'mocha/max-top-level-suites': 'error',
        'mocha/no-async-suite': 'error',
        'mocha/no-empty-title': 'error',
        'mocha/no-exclusive-tests': 'error',
        'mocha/no-exports': 'error',
        'mocha/no-global-tests': 'error',
        'mocha/no-hooks': 'error',
        'mocha/no-hooks-for-single-case': 'off',
        'mocha/no-identical-title': 'error',
        'mocha/no-mocha-arrows': 'error',
        'mocha/no-nested-tests': 'error',
        'mocha/no-pending-tests': 'error',
        'mocha/no-return-and-callback': 'error',
        'mocha/no-return-from-async': 'off',
        'mocha/no-setup-in-describe': 'off',
        'mocha/no-sibling-hooks': 'off',
        'mocha/no-synchronous-tests': 'off',
        'mocha/no-top-level-hooks': 'off',
        'mocha/prefer-arrow-callback': 'off',
        'mocha/valid-suite-title': 'off',
        'mocha/valid-test-title': 'off',
        'mocha/consistent-spacing-between-blocks': 'error',
        'mocha/consistent-interface': ['error', { interface: 'TDD' }]
    },
    settings: {
        mocha: {
            interface: 'exports'
        }
    }
};
