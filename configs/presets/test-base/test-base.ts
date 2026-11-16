import type { Linter } from 'eslint';
import { stylisticRuleSet } from '../../rule-sets/stylistic.ts';
import { disable } from '../../rule-severity.ts';

type TestRuleSet = {
    readonly rules: NonNullable<Linter.Config['rules']>;
};

const stylisticMaxLenOptions = stylisticRuleSet.rules['@stylistic/max-len'][1] as Record<string, unknown>;

export const testRuleSet: TestRuleSet = {
    rules: {
        '@stylistic/max-len': [
            'error',
            {
                ...stylisticMaxLenOptions,
                ignoreStrings: true
            }
        ],
        '@typescript-eslint/no-unsafe-type-assertion': disable<'Test doubles may require deliberate type assertions'>(),
        'no-magic-numbers': disable<'Numeric literals make test inputs and expected values readable'>(),
        '@typescript-eslint/no-magic-numbers': disable<
            'Numeric literals make test inputs and expected values readable'
        >()
    }
};

export const testSupportConfig = {
    rules: { ...testRuleSet.rules }
} as unknown as Linter.Config;
