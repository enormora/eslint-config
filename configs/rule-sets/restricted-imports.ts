import type { Rule } from 'eslint';
import { builtinRules } from 'eslint/use-at-your-own-risk';

type RestrictedImportsPlugin = {
    readonly rules: Readonly<Record<string, Rule.RuleModule | undefined>>;
};

const noRestrictedImportsRule = builtinRules.get('no-restricted-imports');

export function createRestrictedImportsPlugin(ruleNames: readonly string[]): RestrictedImportsPlugin {
    const wrapperEntries = Object.fromEntries(
        ruleNames.map(function toRuleEntry(ruleName: string) {
            return [ ruleName, noRestrictedImportsRule ];
        })
    );
    return {
        rules: wrapperEntries
    };
}
