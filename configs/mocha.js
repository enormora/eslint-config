import mochaPlugin from 'eslint-plugin-mocha';
import globals from 'globals';
import { testRuleSet } from './rule-sets/test-rules.js';

export const mochaConfig = {
    plugins: {
        mocha: mochaPlugin
    },
    languageOptions: {
        globals: globals.mocha
    },
    rules: {
        ...testRuleSet.rules,

        'mocha/handle-done-callback': 'error',
        'mocha/max-top-level-suites': 'error',
        'mocha/no-async-describe': 'error',
        'mocha/no-empty-description': 'error',
        'mocha/no-exclusive-tests': 'error',
        'mocha/no-exports': 'error',
        'mocha/no-global-tests': 'error',
        'mocha/no-hooks': 'error',
        'mocha/no-hooks-for-single-case': 'error',
        'mocha/no-identical-title': 'error',
        'mocha/no-mocha-arrows': 'error',
        'mocha/no-nested-tests': 'error',
        'mocha/no-pending-tests': 'error',
        'mocha/no-return-and-callback': 'error',
        'mocha/no-return-from-async': 'off',
        'mocha/no-setup-in-describe': 'error',
        'mocha/no-sibling-hooks': 'error',
        'mocha/no-skipped-tests': 'error',
        'mocha/no-synchronous-tests': 'off',
        'mocha/no-top-level-hooks': 'error',
        'mocha/prefer-arrow-callback': 'off',
        'mocha/valid-suite-description': 'off',
        'mocha/valid-test-description': 'off'
    }
};
