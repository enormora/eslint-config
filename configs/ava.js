import avaPlugin from 'eslint-plugin-ava';
import { testRuleSet } from './rule-sets/test-rules.js';

export const avaConfig = {
    plugins: {
        ava: avaPlugin
    },
    rules: {
        ...testRuleSet.rules,

        'id-length': ['error', { min: 2, properties: 'never', exceptions: ['t'] }],

        'ava/assertion-arguments': 'error',
        'ava/failing-test-url': 'error',
        'ava/hooks-order': 'error',
        'ava/max-asserts': 'off',
        'ava/no-async-fn-without-await': 'error',
        'ava/no-ava-in-dependencies': 'error',
        'ava/no-commented-tests': 'warn',
        'ava/no-conditional-assertion': 'error',
        'ava/no-duplicate-hooks': 'error',
        'ava/no-identical-title': 'error',
        'ava/no-ignored-test-files': 'off',
        'ava/no-import-test-files': 'error',
        'ava/no-incorrect-deep-equal': 'error',
        'ava/no-inline-assertions': 'error',
        'ava/no-invalid-modifier-chain': 'error',
        'ava/no-negated-assertion': 'error',
        'ava/no-nested-assertions': 'error',
        'ava/no-nested-tests': 'error',
        'ava/no-only-test': 'error',
        'ava/no-skip-assert': 'error',
        'ava/no-skip-test': 'error',
        'ava/no-todo-implementation': 'error',
        'ava/no-todo-test': 'warn',
        'ava/no-useless-t-pass': 'error',
        'ava/prefer-async-await': 'error',
        'ava/prefer-power-assert': 'off',
        'ava/prefer-t-regex': 'error',
        'ava/prefer-t-throws': 'error',
        'ava/require-assertion': 'error',
        'ava/test-title': 'error',
        'ava/test-title-format': 'off',
        'ava/use-t-well': 'error',
        'ava/use-t': 'error',
        'ava/use-test': 'error',
        'ava/use-true-false': 'error',
        'ava/use-t-throws-async-well': 'off'
    }
};
