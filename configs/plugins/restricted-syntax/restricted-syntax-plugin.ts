import type { Rule } from 'eslint';
import { createRestrictedSyntaxPlugin } from '../../rule-sets/restricted-syntax.ts';
import { noUnnecessaryArrowFunctionRule } from './no-unnecessary-arrow-function.ts';

type RestrictedSyntaxPlugin = {
    readonly rules: Record<string, Rule.RuleModule | undefined>;
};

const wrappedRuleNames = [
    'no-class-declaration',
    'no-switch-statement',
    'no-empty-function-body',
    'no-in-operator'
] as const;

const wrappedRules = createRestrictedSyntaxPlugin(wrappedRuleNames).rules;

export const restrictedSyntaxPlugin: RestrictedSyntaxPlugin = {
    rules: {
        ...wrappedRules,
        'no-unnecessary-arrow-function': noUnnecessaryArrowFunctionRule as unknown as Rule.RuleModule
    }
};
