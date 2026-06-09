import type { Rule } from 'eslint';
import { builtinRules } from 'eslint/use-at-your-own-risk';

type RestrictedSyntaxRestriction = {
    readonly selector: string;
    readonly message: string;
};

type RestrictedSyntaxPlugin = {
    readonly rules: Record<string, Rule.RuleModule | undefined>;
};

type NoClassDeclarationOptions = {
    readonly allowedSuperClassNamePattern: string;
    readonly message: string;
};

const noRestrictedSyntaxRule = builtinRules.get('no-restricted-syntax');

export function createRestrictedSyntaxPlugin(
    ruleNames: readonly string[],
    additionalRules: Readonly<Record<string, Rule.RuleModule>>
): RestrictedSyntaxPlugin {
    const wrapperEntries = Object.fromEntries(
        ruleNames.map(function toRuleEntry(ruleName: string) {
            return [ ruleName, noRestrictedSyntaxRule ];
        })
    );
    return {
        rules: { ...wrapperEntries, ...additionalRules }
    };
}

const defaultAllowedSuperClassNamePattern = '/Error$/';
const defaultClassDeclarationMessage = 'Class declarations are not allowed except for extending errors.';
const defaultNoClassDeclarationOptions: NoClassDeclarationOptions = {
    allowedSuperClassNamePattern: defaultAllowedSuperClassNamePattern,
    message: defaultClassDeclarationMessage
};

export function createNoClassDeclarationRestriction(
    options: NoClassDeclarationOptions = defaultNoClassDeclarationOptions
): RestrictedSyntaxRestriction {
    const { allowedSuperClassNamePattern, message } = options;
    return {
        selector: `ClassDeclaration[superClass.name!=${allowedSuperClassNamePattern}]`,
        message
    };
}

export const noClassDeclarationRestriction = createNoClassDeclarationRestriction();

export const noSwitchStatementRestriction = {
    selector: 'SwitchStatement',
    message: 'Use pattern matching instead.'
};

const emptyFunctionBodySelector = [ 'FunctionDeclaration', 'FunctionExpression', 'ArrowFunctionExpression' ]
    .map(function toEmptyBodySelector(kind) {
        return `${kind} > BlockStatement[body.length=0]`;
    })
    .join(', ');

export const noEmptyFunctionBodyRestriction = {
    selector: emptyFunctionBodySelector,
    message: 'Empty function bodies are not allowed, even with a comment.'
};

export const noInOperatorRestriction = {
    selector: 'BinaryExpression[operator="in"]',
    message: 'The `in` operator is not allowed. Use `Object.hasOwn` instead.'
};
