import {
    AST_NODE_TYPES,
    ESLintUtils,
    type TSESLint,
    type TSESTree
} from '@typescript-eslint/utils';

function ruleUrl(ruleName: string): string {
    return `https://github.com/enormora/eslint-config/blob/main/configs/plugins/enormora-zod/${ruleName}.ts`;
}

const { RuleCreator: ruleCreator } = ESLintUtils;
const buildRule = ruleCreator(ruleUrl);

type Fixer = TSESLint.RuleFixer;
type FixResult = TSESLint.RuleFix;

const zodNamespace = 'z';
const readonlyFactory = 'readonly';

const mutableSchemaFactories: ReadonlySet<string> = new Set([
    'object',
    'strictObject',
    'looseObject',
    'array',
    'tuple',
    'record',
    'map',
    'set'
]);

function readParent(node: TSESTree.Node): TSESTree.Node | undefined {
    const raw = (node as { readonly parent?: TSESTree.Node | null; }).parent;
    return raw ?? undefined;
}

function getZodFactoryName(node: TSESTree.CallExpression): string | undefined {
    const { callee } = node;
    if (callee.type !== AST_NODE_TYPES.MemberExpression || callee.computed) {
        return undefined;
    }
    const { object, property } = callee;
    if (object.type !== AST_NODE_TYPES.Identifier || object.name !== zodNamespace) {
        return undefined;
    }
    if (property.type !== AST_NODE_TYPES.Identifier) {
        return undefined;
    }
    return property.name;
}

function isWrappedInReadonly(node: TSESTree.CallExpression): boolean {
    const parent = readParent(node);
    if (parent?.type !== AST_NODE_TYPES.CallExpression) {
        return false;
    }
    if (getZodFactoryName(parent) !== readonlyFactory) {
        return false;
    }
    return parent.arguments[0] === node;
}

const description = 'Require mutable Zod Mini schemas (`z.object`, `z.strictObject`, `z.looseObject`, `z.array`, ' +
    '`z.tuple`, `z.record`, `z.map`, `z.set`) to be wrapped in `z.readonly()` so the inferred type is ' +
    'readonly. Applied at every level, wrapping composes into a deeply readonly type.';

export const requireReadonlySchemaRule = buildRule({
    name: 'require-readonly-schema',
    meta: {
        type: 'problem',
        fixable: 'code',
        docs: { description },
        messages: {
            schemaShouldBeReadonly: 'Wrap this z.{{factory}}() schema in z.readonly() to produce a readonly type.'
        },
        schema: []
    },
    defaultOptions: [],
    create(context) {
        const { sourceCode } = context;

        return {
            CallExpression(node: TSESTree.CallExpression) {
                const factory = getZodFactoryName(node);
                if (factory === undefined || !mutableSchemaFactories.has(factory)) {
                    return;
                }
                if (isWrappedInReadonly(node)) {
                    return;
                }
                context.report({
                    node,
                    messageId: 'schemaShouldBeReadonly',
                    data: { factory },
                    fix(fixer: Fixer): FixResult {
                        return fixer.replaceText(node, `z.readonly(${sourceCode.getText(node)})`);
                    }
                });
            }
        };
    }
});
