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

const immutableSchemaFactories: ReadonlySet<string> = new Set([
    'string',
    'number',
    'boolean',
    'bigint',
    'symbol',
    'date',
    'literal',
    'int',
    'null',
    'undefined',
    'void',
    'any',
    'unknown',
    'never',
    'nan',
    'enum',
    'nativeEnum'
]);

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

function isAlreadyImmutable(node: TSESTree.Expression | TSESTree.SpreadElement): boolean {
    if (node.type !== AST_NODE_TYPES.CallExpression) {
        return false;
    }
    const factory = getZodFactoryName(node);
    if (factory === undefined) {
        return false;
    }
    return immutableSchemaFactories.has(factory) || factory === readonlyFactory;
}

const description = 'Disallow `z.readonly()` on schemas whose type is already immutable — primitives ' +
    '(`z.string`, `z.number`, `z.literal`, `z.enum`, …) and already-readonly schemas — where the ' +
    'wrapper has no effect on the inferred type.';

export const noUnnecessaryReadonlySchemaRule = buildRule({
    name: 'no-unnecessary-readonly-schema',
    meta: {
        type: 'suggestion',
        fixable: 'code',
        docs: { description },
        messages: {
            unnecessaryReadonly: 'Unnecessary z.readonly() on an already-immutable schema; remove it.'
        },
        schema: []
    },
    defaultOptions: [],
    create(context) {
        const { sourceCode } = context;

        return {
            CallExpression(node: TSESTree.CallExpression) {
                if (getZodFactoryName(node) !== readonlyFactory) {
                    return;
                }
                const [ argument ] = node.arguments;
                if (argument === undefined || !isAlreadyImmutable(argument)) {
                    return;
                }
                context.report({
                    node,
                    messageId: 'unnecessaryReadonly',
                    fix(fixer: Fixer): FixResult {
                        return fixer.replaceText(node, sourceCode.getText(argument));
                    }
                });
            }
        };
    }
});
