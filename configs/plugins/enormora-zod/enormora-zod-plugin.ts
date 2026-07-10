import type { Rule } from 'eslint';
import { noUnnecessaryReadonlySchemaRule } from './no-unnecessary-readonly-schema.ts';
import { requireReadonlySchemaRule } from './require-readonly-schema.ts';

type EnormoraZodPlugin = {
    readonly rules: Readonly<Record<string, Rule.RuleModule>>;
};

export const enormoraZodPlugin: EnormoraZodPlugin = {
    rules: {
        'no-unnecessary-readonly-schema': noUnnecessaryReadonlySchemaRule as unknown as Rule.RuleModule,
        'require-readonly-schema': requireReadonlySchemaRule as unknown as Rule.RuleModule
    }
};
