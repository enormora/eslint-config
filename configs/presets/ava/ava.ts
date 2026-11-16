import avaPlugin from 'eslint-plugin-ava';
import { testRuleSet } from '../test-base/test-base.ts';
import { disable } from '../../rule-severity.ts';

/* eslint-disable no-barrel-files/no-barrel-files -- expose testSupportConfig as public API so consumers can apply the shared relaxations to non-test test files without depending on @enormora/eslint-config-test-base directly */
export { testSupportConfig } from '../test-base/test-base.ts';
/* eslint-enable no-barrel-files/no-barrel-files -- end of public re-exports */

export const avaConfig = {
    plugins: {
        ava: avaPlugin
    },
    rules: {
        ...testRuleSet.rules,

        'id-length': [ 'error', { min: 2, properties: 'never', exceptions: [ 't' ] } ],

        'ava/assertion-arguments': 'error',
        'ava/failing-test-url': 'error',
        'ava/hooks-order': 'error',
        'ava/max-asserts': disable<
            'Assertion expressiveness can require multiple checks; an arbitrary maximum is not useful'
        >(),
        'ava/no-async-fn-without-await': 'error',
        'ava/no-ava-in-dependencies': 'error',
        'ava/no-commented-tests': 'error',
        'ava/no-conditional-assertion': 'error',
        'ava/no-duplicate-hooks': 'error',
        'ava/no-identical-title': 'error',
        'ava/no-ignored-test-files': disable<'Test discovery patterns belong to the consuming AVA configuration'>(),
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
        'ava/no-todo-test': 'error',
        'ava/no-useless-t-pass': 'error',
        'ava/prefer-async-await': 'error',
        'ava/prefer-power-assert': disable<'Specific assertion methods are preferred over power assertions'>(),
        'ava/prefer-t-regex': 'error',
        'ava/prefer-t-throws': 'error',
        'ava/require-assertion': 'error',
        'ava/test-title': 'error',
        'ava/test-title-format': disable<'Test titles need not follow a project-independent pattern'>(),
        'ava/use-t-well': 'error',
        'ava/use-t': 'error',
        'ava/use-test': 'error',
        'ava/use-true-false': 'error',
        'ava/use-t-throws-async-well': disable<
            'Typed assertion promises are checked by @typescript-eslint/no-floating-promises in TypeScript projects'
        >()
    }
};
