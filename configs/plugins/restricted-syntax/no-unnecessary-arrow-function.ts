import { AST_NODE_TYPES, AST_TOKEN_TYPES, ESLintUtils, type TSESLint, type TSESTree } from '@typescript-eslint/utils';

function ruleUrl(name: string): string {
    return `https://github.com/enormora/eslint-config/blob/main/configs/plugins/restricted-syntax/${name}.ts`;
}

const { RuleCreator: ruleCreator } = ESLintUtils;
const buildRule = ruleCreator(ruleUrl);

const lexicalBindingSelectors = [
    'ThisExpression',
    'Super',
    'MetaProperty[meta.name="new"]',
    'Identifier[name="arguments"]'
]
    .join(', ');

const arrowFunctionSelector = `ArrowFunctionExpression:not(:has(${lexicalBindingSelectors}))`;

const unnecessaryArrowMessage =
    'Arrow functions are only allowed when they use lexical `this`, `super`, `new.target`, or `arguments`.';

function findArrowToken(
    sourceCode: Readonly<TSESLint.SourceCode>,
    node: Readonly<TSESTree.ArrowFunctionExpression>
): Readonly<TSESTree.Token> {
    const arrowToken = sourceCode.getTokenBefore(node.body, {
        filter(candidate: Readonly<TSESTree.Token>): boolean {
            return candidate.type === AST_TOKEN_TYPES.Punctuator && candidate.value === '=>';
        }
    });
    if (arrowToken === null) {
        throw new Error('Expected an arrow function to contain a `=>` token before its body.');
    }
    return arrowToken;
}

function findAsyncTokenEnd(
    sourceCode: Readonly<TSESLint.SourceCode>,
    node: Readonly<TSESTree.ArrowFunctionExpression>
): number {
    if (!node.async) {
        return node.range[0];
    }
    const firstToken = sourceCode.getFirstToken(node);
    if (firstToken?.value !== 'async') {
        return node.range[0];
    }
    return firstToken.range[1];
}

function paramsAreParenthesized(
    sourceCode: Readonly<TSESLint.SourceCode>,
    node: Readonly<TSESTree.ArrowFunctionExpression>
): boolean {
    if (node.params.length !== 1 || node.typeParameters !== undefined) {
        return true;
    }
    const firstParamToken = sourceCode.getFirstToken(node.params[0] as TSESTree.Node);
    if (firstParamToken === null) {
        return true;
    }
    const tokenBefore = sourceCode.getTokenBefore(firstParamToken);
    return tokenBefore !== null && tokenBefore.value === '(';
}

function buildBodyText(
    sourceCode: Readonly<TSESLint.SourceCode>,
    node: Readonly<TSESTree.ArrowFunctionExpression>
): string {
    if (node.body.type === AST_NODE_TYPES.BlockStatement) {
        return sourceCode.getText(node.body);
    }
    return `{ return ${sourceCode.getText(node.body)}; }`;
}

function buildReplacement(
    sourceCode: Readonly<TSESLint.SourceCode>,
    node: Readonly<TSESTree.ArrowFunctionExpression>
): string {
    const arrowToken = findArrowToken(sourceCode, node);
    const signatureStart = findAsyncTokenEnd(sourceCode, node);
    const rawSignature = sourceCode.getText().slice(signatureStart, arrowToken.range[0]).trim();
    const signatureText = paramsAreParenthesized(sourceCode, node) ? rawSignature : `(${rawSignature})`;
    const bodyText = buildBodyText(sourceCode, node);
    const asyncPrefix = node.async ? 'async ' : '';
    return `${asyncPrefix}function ${signatureText} ${bodyText}`;
}

export const noUnnecessaryArrowFunctionRule = buildRule({
    name: 'no-unnecessary-arrow-function',
    meta: {
        type: 'problem',
        docs: { description: unnecessaryArrowMessage },
        fixable: 'code',
        messages: {
            unnecessaryArrow: unnecessaryArrowMessage
        },
        schema: []
    },
    defaultOptions: [],
    create(context) {
        return {
            [arrowFunctionSelector](node: TSESTree.ArrowFunctionExpression) {
                context.report({
                    node,
                    messageId: 'unnecessaryArrow',
                    fix(fixer) {
                        return fixer.replaceText(node, buildReplacement(context.sourceCode, node));
                    }
                });
            }
        };
    }
});
