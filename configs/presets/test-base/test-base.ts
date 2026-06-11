import type { Linter } from 'eslint';
import { stylisticRuleSet } from '../../rule-sets/stylistic.ts';

const stylisticMaxLenOptions = stylisticRuleSet.rules['@stylistic/max-len'][1] as Record<string, unknown>;

export const testRuleSet = {
    rules: {
        '@stylistic/max-len': [
            'error',
            {
                ...stylisticMaxLenOptions,
                ignoreStrings: true
            }
        ],
        '@typescript-eslint/no-unsafe-type-assertion': 'off',
        'no-magic-numbers': 'off',
        '@typescript-eslint/no-magic-numbers': 'off'
    }
};

export const testSupportConfig = {
    rules: { ...testRuleSet.rules }
} as unknown as Linter.Config;
