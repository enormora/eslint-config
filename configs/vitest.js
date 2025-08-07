import vitestPlugin from '@vitest/eslint-plugin';
import { testRuleSet } from './rule-sets/test-rules.js';

export const vitestConfig = {
    plugins: {
        vitest: vitestPlugin,
        '@vitest': vitestPlugin
    },
    settings: {
        vitest: {
            typecheck: true
        }
    },
    languageOptions: {
        globals: {
            ...vitestPlugin.environments.env.globals
        }
    },
    rules: {
        ...testRuleSet.rules,

        '@vitest/prefer-lowercase-title': 'error',
        '@vitest/max-nested-describe': ['error', { max: 2 }],
        '@vitest/no-identical-title': 'error',
        '@vitest/no-focused-tests': 'error',
        '@vitest/no-conditional-tests': 'error',
        '@vitest/expect-expect': 'error',
        '@vitest/consistent-test-it': 'error',
        '@vitest/consistent-vitest-vi': 'error',
        '@vitest/prefer-to-be': 'error',
        '@vitest/no-hooks': 'error',
        '@vitest/no-restricted-vi-methods': 'error',
        '@vitest/consistent-test-filename': 'error',
        '@vitest/max-expects': 'off',
        '@vitest/no-alias-methods': 'error',
        '@vitest/no-commented-out-tests': 'error',
        '@vitest/no-conditional-expect': 'error',
        '@vitest/no-conditional-in-test': 'error',
        '@vitest/no-disabled-tests': 'error',
        '@vitest/no-duplicate-hooks': 'error',
        '@vitest/no-large-snapshots': 'off',
        '@vitest/no-interpolation-in-snapshots': 'error',
        '@vitest/no-mocks-import': 'error',
        '@vitest/no-restricted-matchers': 'error',
        '@vitest/no-standalone-expect': 'error',
        '@vitest/no-test-prefixes': 'error',
        '@vitest/no-test-return-statement': 'error',
        '@vitest/no-import-node-test': 'error',
        '@vitest/prefer-called-with': 'error',
        '@vitest/valid-title': 'error',
        '@vitest/valid-expect': 'error',
        '@vitest/prefer-to-be-falsy': 'off',
        '@vitest/prefer-to-be-object': 'error',
        '@vitest/prefer-to-be-truthy': 'off',
        '@vitest/prefer-to-have-length': 'error',
        '@vitest/prefer-equality-matcher': 'error',
        '@vitest/prefer-strict-equal': 'error',
        '@vitest/prefer-expect-resolves': 'error',
        '@vitest/prefer-each': 'error',
        '@vitest/prefer-hooks-on-top': 'error',
        '@vitest/prefer-hooks-in-order': 'error',
        '@vitest/require-local-test-context-for-concurrent-snapshots': 'error',
        '@vitest/prefer-mock-promise-shorthand': 'error',
        '@vitest/prefer-vi-mocked': 'error',
        '@vitest/prefer-snapshot-hint': 'error',
        '@vitest/valid-describe-callback': 'error',
        '@vitest/require-top-level-describe': 'off',
        '@vitest/require-to-throw-message': 'off',
        '@vitest/require-hook': 'error',
        '@vitest/prefer-todo': 'error',
        '@vitest/prefer-spy-on': 'error',
        '@vitest/prefer-comparison-matcher': 'error',
        '@vitest/prefer-describe-function-title': 'error',
        '@vitest/prefer-to-contain': 'error',
        '@vitest/prefer-expect-assertions': 'off',
        '@vitest/padding-around-after-all-blocks': 'error',
        '@vitest/padding-around-after-each-blocks': 'error',
        '@vitest/padding-around-all': 'error',
        '@vitest/padding-around-before-all-blocks': 'error',
        '@vitest/padding-around-before-each-blocks': 'error',
        '@vitest/padding-around-describe-blocks': 'error',
        '@vitest/padding-around-expect-groups': 'error',
        '@vitest/padding-around-test-blocks': 'error',
        '@vitest/valid-expect-in-promise': 'error',
        '@vitest/prefer-strict-boolean-matchers': 'error',
        '@vitest/require-mock-type-parameters': 'off',
        '@vitest/no-importing-vitest-globals': 'off',
        '@vitest/prefer-importing-vitest-globals': 'error',
        '@vitest/prefer-called-once': 'error',
        '@vitest/prefer-called-times': 'error',
        '@vitest/warn-todo': 'error'
    }
};
