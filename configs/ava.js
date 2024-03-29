import avaPlugin from 'eslint-plugin-ava';
import { testRuleSet } from './rule-sets/test-rules.js';

export const avaConfig = {
    plugins: {
        ava: avaPlugin
    },
    rules: {
        ...testRuleSet.rules,

        'no-magic-numbers': 'off',
        '@typescript-eslint/no-magic-numbers': 'off',

        'id-length': ['error', { min: 2, properties: 'never', exceptions: ['t'] }],

        'ava/assertion-arguments': 'error',
        'ava/hooks-order': 'error',
        'ava/max-asserts': 'off',
        'ava/no-async-fn-without-await': 'error',
        'ava/no-duplicate-modifiers': 'error',
        'ava/no-identical-title': 'error',
        'ava/no-ignored-test-files': 'off',
        'ava/no-import-test-files': 'error',
        'ava/no-incorrect-deep-equal': 'error',
        'ava/no-inline-assertions': 'error',
        'ava/no-nested-tests': 'error',
        'ava/no-only-test': 'error',
        'ava/no-skip-assert': 'error',
        'ava/no-skip-test': 'error',
        'ava/no-todo-implementation': 'error',
        'ava/no-todo-test': 'warn',
        'ava/no-unknown-modifiers': 'error',
        'ava/prefer-async-await': 'error',
        'ava/prefer-power-assert': 'off',
        'ava/prefer-t-regex': 'error',
        'ava/test-title': 'error',
        'ava/test-title-format': 'off',
        'ava/use-t-well': 'error',
        'ava/use-t': 'error',
        'ava/use-test': 'error',
        'ava/use-true-false': 'error',
        'ava/use-t-throws-async-well': 'off'
    }
};
