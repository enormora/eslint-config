import type { Rule } from 'eslint';
import { requireReadonlySchemaRule } from './require-readonly-schema.ts';

type EnormoraZodPlugin = {
    readonly rules: Readonly<Record<string, Rule.RuleModule>>;
};

export const enormoraZodPlugin: EnormoraZodPlugin = {
    rules: {
        'require-readonly-schema': requireReadonlySchemaRule as unknown as Rule.RuleModule
    }
};
