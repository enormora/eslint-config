import type { Linter } from 'eslint';
import { nodeAssertConfig } from '../node-assert/node-assert.ts';
import { stylisticRuleSet } from '../../rule-sets/stylistic.ts';

type TestRuleSet = {
    readonly plugins: NonNullable<Linter.Config['plugins']>;
    readonly rules: NonNullable<Linter.Config['rules']>;
};

const stylisticMaxLenOptions = stylisticRuleSet.rules['@stylistic/max-len'][1] as Record<string, unknown>;

export const testRuleSet: TestRuleSet = {
    plugins: {
        ...nodeAssertConfig.plugins
    },
    rules: {
        '@stylistic/max-len': [
            'error',
            {
                ...stylisticMaxLenOptions,
                ignoreStrings: true
            }
        ],
        '@typescript-eslint/no-unsafe-type-assertion': 'off',
        ...nodeAssertConfig.rules,
        'no-magic-numbers': 'off',
        '@typescript-eslint/no-magic-numbers': 'off'
    }
};

export const testSupportConfig = {
    plugins: { ...testRuleSet.plugins },
    rules: { ...testRuleSet.rules }
} as unknown as Linter.Config;
