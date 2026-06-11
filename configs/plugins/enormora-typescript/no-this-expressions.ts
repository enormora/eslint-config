import {
    AST_NODE_TYPES,
    ESLintUtils,
    type TSESTree
} from '@typescript-eslint/utils';

function ruleUrl(ruleName: string): string {
    return `https://github.com/enormora/eslint-config/blob/main/configs/plugins/enormora-typescript/${ruleName}.ts`;
}

const { RuleCreator: ruleCreator } = ESLintUtils;
const buildRule = ruleCreator(ruleUrl);

type ThisBindingDecision = 'allow' | 'continue' | 'report';

const thisRebindingFunctionTypes: ReadonlySet<string> = new Set([
    AST_NODE_TYPES.FunctionDeclaration,
    AST_NODE_TYPES.FunctionExpression
]);

const classMemberDefinitionTypes: ReadonlySet<string> = new Set([
    AST_NODE_TYPES.MethodDefinition,
    AST_NODE_TYPES.PropertyDefinition
]);

const classMemberInitializerTypes: ReadonlySet<string> = new Set([
    AST_NODE_TYPES.PropertyDefinition,
    AST_NODE_TYPES.StaticBlock
]);

function readParent(node: TSESTree.Node): TSESTree.Node | undefined {
    const raw = (node as { readonly parent?: TSESTree.Node | null; }).parent;
    return raw ?? undefined;
}

function isImmediateClassMemberValue(functionNode: TSESTree.Node): boolean {
    const parent = readParent(functionNode);
    return parent !== undefined && classMemberDefinitionTypes.has(parent.type);
}

function classifyAncestor(node: TSESTree.Node): ThisBindingDecision {
    if (node.type === AST_NODE_TYPES.ArrowFunctionExpression) {
        return 'continue';
    }
    if (thisRebindingFunctionTypes.has(node.type)) {
        return isImmediateClassMemberValue(node) ? 'allow' : 'report';
    }
    if (classMemberInitializerTypes.has(node.type)) {
        return 'allow';
    }
    return 'continue';
}

function isInsideClassMemberBody(node: TSESTree.ThisExpression): boolean {
    let current = readParent(node);
    while (current !== undefined) {
        const decision = classifyAncestor(current);
        if (decision === 'allow') {
            return true;
        }
        if (decision === 'report') {
            return false;
        }
        current = readParent(current);
    }
    return false;
}

const description = 'Disallow `this` outside class constructors, methods, accessors, field initializers, ' +
    'and static initializer blocks. Replaces `functional/no-this-expressions`, whose blanket ban is ' +
    'incompatible with sanctioned class patterns such as custom `Error` subclasses.';

export const noThisExpressionsRule = buildRule({
    name: 'no-this-expressions',
    meta: {
        type: 'problem',
        docs: { description },
        messages: {
            unexpectedThis: 'Unexpected `this` outside class member bodies. Use functions or pass values explicitly.'
        },
        schema: []
    },
    defaultOptions: [],
    create(context) {
        return {
            ThisExpression(node: TSESTree.ThisExpression) {
                if (isInsideClassMemberBody(node)) {
                    return;
                }
                context.report({
                    node,
                    messageId: 'unexpectedThis'
                });
            }
        };
    }
});
