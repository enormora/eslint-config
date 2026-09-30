import type { Rule } from 'eslint';
import { preferTernaryForValueSelectionRule } from './prefer-ternary-for-value-selection.ts';

export const enormoraPlugin = {
    rules: {
        'prefer-ternary-for-value-selection': preferTernaryForValueSelectionRule as unknown as Rule.RuleModule
    }
};
