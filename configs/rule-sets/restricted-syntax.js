import { builtinRules } from 'eslint/use-at-your-own-risk';

const noRestrictedSyntaxRule = builtinRules.get('no-restricted-syntax');

export function createRestrictedSyntaxPlugin(ruleNames) {
    return {
        rules: Object.fromEntries(
            ruleNames.map((ruleName) => {
                return [ ruleName, noRestrictedSyntaxRule ];
            })
        )
    };
}

const defaultAllowedSuperClassNamePattern = '/Error$/';
const defaultClassDeclarationMessage = 'Class declarations are not allowed except for extending errors.';

export function createNoClassDeclarationRestriction({
    allowedSuperClassNamePattern = defaultAllowedSuperClassNamePattern,
    message = defaultClassDeclarationMessage
} = {}) {
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
    .map((kind) => {
        return `${kind} > BlockStatement[body.length=0]`;
    })
    .join(', ');

export const noEmptyFunctionBodyRestriction = {
    selector: emptyFunctionBodySelector,
    message: 'Empty function bodies are not allowed, even with a comment.'
};
