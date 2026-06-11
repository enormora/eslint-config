import type { Rule } from 'eslint';
import { noImpureSatisfiesRule } from './no-impure-satisfies.ts';
import { preferNamedCallableTypesRule } from './prefer-named-callable-types.ts';
import { preferReadonlyTypesRule } from './prefer-readonly-types.ts';

type EnormoraTypescriptPlugin = {
    readonly rules: Readonly<Record<string, Rule.RuleModule>>;
};

export const enormoraTypescriptPlugin: EnormoraTypescriptPlugin = {
    rules: {
        'no-impure-satisfies': noImpureSatisfiesRule as unknown as Rule.RuleModule,
        'prefer-named-callable-types': preferNamedCallableTypesRule as unknown as Rule.RuleModule,
        'prefer-readonly-types': preferReadonlyTypesRule as unknown as Rule.RuleModule
    }
};
