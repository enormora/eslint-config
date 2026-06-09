import type { Rule } from 'eslint';
import { noImpureSatisfiesRule } from './no-impure-satisfies.ts';

type EnormoraTypescriptPlugin = {
    readonly rules: Record<string, Rule.RuleModule>;
};

export const enormoraTypescriptPlugin: EnormoraTypescriptPlugin = {
    rules: {
        'no-impure-satisfies': noImpureSatisfiesRule as unknown as Rule.RuleModule
    }
};
