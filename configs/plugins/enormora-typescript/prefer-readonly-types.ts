import {
    AST_NODE_TYPES,
    ESLintUtils,
    type TSESLint,
    type TSESTree
} from '@typescript-eslint/utils';

function ruleUrl(ruleName: string): string {
    return `https://github.com/enormora/eslint-config/blob/main/configs/plugins/enormora-typescript/${ruleName}.ts`;
}

const { RuleCreator: ruleCreator } = ESLintUtils;
const buildRule = ruleCreator(ruleUrl);

const namedReferenceRenames: ReadonlyMap<string, string> = new Map([
    [ 'Array', 'ReadonlyArray' ],
    [ 'Map', 'ReadonlyMap' ],
    [ 'Set', 'ReadonlySet' ]
]);

const namedReferenceReadonlyForms: ReadonlySet<string> = new Set([
    'ReadonlyArray',
    'ReadonlyMap',
    'ReadonlySet',
    'Readonly'
]);

const recordReferenceName = 'Record';

const elementParensRequiredTypes: ReadonlySet<string> = new Set([
    AST_NODE_TYPES.TSUnionType,
    AST_NODE_TYPES.TSIntersectionType,
    AST_NODE_TYPES.TSFunctionType,
    AST_NODE_TYPES.TSConstructorType,
    AST_NODE_TYPES.TSConditionalType,
    AST_NODE_TYPES.TSTypeOperator
]);

type Fixer = TSESLint.RuleFixer;
type FixResult = TSESLint.RuleFix;
type SourceCode = Readonly<TSESLint.SourceCode>;

// `node.parent` is typed as a non-nullable `Node` but the program root carries
// a runtime `null`. Funnel parent access through this helper so the loop
// terminates correctly without fighting the type system.
function readParent(node: TSESTree.Node): TSESTree.Node | undefined {
    const raw = (node as { readonly parent?: TSESTree.Node | null; }).parent;
    return raw ?? undefined;
}

function hasTypeLiteralOrInterfaceBodyAncestor(node: TSESTree.Node): boolean {
    let current = readParent(node);
    while (current !== undefined) {
        if (current.type === AST_NODE_TYPES.TSTypeLiteral) {
            return true;
        }
        if (current.type === AST_NODE_TYPES.TSInterfaceBody) {
            return true;
        }
        current = readParent(current);
    }
    return false;
}

function isMemberOfNestedTypeLiteral(
    member: TSESTree.TSIndexSignature | TSESTree.TSPropertySignature
): boolean {
    const { parent } = member;
    if (parent.type !== AST_NODE_TYPES.TSTypeLiteral) {
        return false;
    }
    return parent.parent.type !== AST_NODE_TYPES.TSTypeAliasDeclaration;
}

function isWrappedInReadonlyOperator(node: TSESTree.Node): boolean {
    const parent = readParent(node);
    if (parent?.type !== AST_NODE_TYPES.TSTypeOperator) {
        return false;
    }
    return parent.operator === 'readonly';
}

function elementNeedsParens(element: TSESTree.Node): boolean {
    return elementParensRequiredTypes.has(element.type);
}

function resultNeedsOuterParens(node: TSESTree.Node): boolean {
    const parent = readParent(node);
    if (parent === undefined) {
        return false;
    }
    return parent.type === AST_NODE_TYPES.TSArrayType || parent.type === AST_NODE_TYPES.TSRestType;
}

function isMappedTypeReadonly(node: TSESTree.TSMappedType): boolean {
    return node.readonly === true || node.readonly === '+';
}

function isWrappedInReadonlyUtility(node: TSESTree.TSTypeReference): boolean {
    const { parent } = node;
    if (parent.type !== AST_NODE_TYPES.TSTypeParameterInstantiation) {
        return false;
    }
    const grandparent = parent.parent;
    if (grandparent.type !== AST_NODE_TYPES.TSTypeReference) {
        return false;
    }
    const { typeName } = grandparent;
    return typeName.type === AST_NODE_TYPES.Identifier && typeName.name === 'Readonly';
}

function getNamedReferenceName(node: TSESTree.TSTypeReference): string | undefined {
    const { typeName } = node;
    if (typeName.type !== AST_NODE_TYPES.Identifier) {
        return undefined;
    }
    return typeName.name;
}

function buildArrayReadonlyText(
    node: TSESTree.TSArrayType,
    sourceCode: SourceCode
): string {
    const elementText = sourceCode.getText(node.elementType);
    const wrappedElement = elementNeedsParens(node.elementType) ? `(${elementText})` : elementText;
    const readonlyForm = `readonly ${wrappedElement}[]`;
    return resultNeedsOuterParens(node) ? `(${readonlyForm})` : readonlyForm;
}

function buildTupleReadonlyText(
    node: TSESTree.TSTupleType,
    sourceCode: SourceCode
): string {
    const tupleText = sourceCode.getText(node);
    const readonlyForm = `readonly ${tupleText}`;
    return resultNeedsOuterParens(node) ? `(${readonlyForm})` : readonlyForm;
}

const description = 'Require `readonly` on properties, index signatures, arrays, tuples, mapped types, and the ' +
    '`Array`/`Map`/`Set`/`Record` references that appear nested inside object type literals or ' +
    'interface bodies. Mimics the deprecated `functional/prefer-readonly-type` rule but limited ' +
    'to inline literal contexts so that named references are not recursed into.';

const messages = {
    arrayShouldBeReadonly: 'Array type should be wrapped in `readonly`.',
    indexSignatureShouldBeReadonly: 'Index signature should be marked `readonly`.',
    mappedTypeShouldBeReadonly: 'Mapped type should declare `readonly` for its produced members.',
    namedReferenceShouldBeReadonly: 'Use `{{readonlyName}}` instead of `{{name}}` inside an inline literal type.',
    propertyShouldBeReadonly: 'Property `{{name}}` should be marked `readonly`.',
    recordShouldBeReadonly: 'Wrap `Record<...>` in `Readonly<...>` inside an inline literal type.',
    tupleShouldBeReadonly: 'Tuple type should be wrapped in `readonly`.'
};

function describePropertyName(key: TSESTree.PropertyName, sourceCode: SourceCode): string {
    if (key.type === AST_NODE_TYPES.Identifier) {
        return key.name;
    }
    return sourceCode.getText(key);
}

type ReportContext = TSESLint.RuleContext<keyof typeof messages, readonly []>;

function reportRenameNamedReference(
    context: ReportContext,
    node: TSESTree.TSTypeReference,
    name: string,
    readonlyName: string
): void {
    context.report({
        node,
        messageId: 'namedReferenceShouldBeReadonly',
        data: { name, readonlyName },
        fix(fixer: Fixer): FixResult {
            return fixer.replaceText(node.typeName, readonlyName);
        }
    });
}

function reportRecordReference(
    context: ReportContext,
    node: TSESTree.TSTypeReference,
    sourceCode: SourceCode
): void {
    context.report({
        node,
        messageId: 'recordShouldBeReadonly',
        fix(fixer: Fixer): FixResult {
            return fixer.replaceText(node, `Readonly<${sourceCode.getText(node)}>`);
        }
    });
}

function shouldInspectNamedReference(node: TSESTree.TSTypeReference, name: string): boolean {
    if (namedReferenceReadonlyForms.has(name)) {
        return false;
    }
    if (!hasTypeLiteralOrInterfaceBodyAncestor(node)) {
        return false;
    }
    return !isWrappedInReadonlyUtility(node);
}

function reportNamedReferenceIfApplicable(
    context: ReportContext,
    sourceCode: SourceCode,
    node: TSESTree.TSTypeReference
): void {
    const name = getNamedReferenceName(node);
    if (name === undefined || !shouldInspectNamedReference(node, name)) {
        return;
    }
    const readonlyName = namedReferenceRenames.get(name);
    if (readonlyName !== undefined) {
        reportRenameNamedReference(context, node, name, readonlyName);
        return;
    }
    if (name === recordReferenceName) {
        reportRecordReference(context, node, sourceCode);
    }
}

export const preferReadonlyTypesRule = buildRule({
    name: 'prefer-readonly-types',
    meta: {
        type: 'problem',
        fixable: 'code',
        docs: { description },
        messages,
        schema: []
    },
    defaultOptions: [],
    create(context) {
        const { sourceCode } = context;

        return {
            TSPropertySignature(node: TSESTree.TSPropertySignature) {
                if (node.readonly) {
                    return;
                }
                if (!isMemberOfNestedTypeLiteral(node)) {
                    return;
                }
                context.report({
                    node,
                    messageId: 'propertyShouldBeReadonly',
                    data: { name: describePropertyName(node.key, sourceCode) },
                    fix(fixer: Fixer): FixResult {
                        return fixer.insertTextBefore(node, 'readonly ');
                    }
                });
            },

            TSIndexSignature(node: TSESTree.TSIndexSignature) {
                if (node.readonly) {
                    return;
                }
                if (!isMemberOfNestedTypeLiteral(node)) {
                    return;
                }
                context.report({
                    node,
                    messageId: 'indexSignatureShouldBeReadonly',
                    fix(fixer: Fixer): FixResult {
                        return fixer.insertTextBefore(node, 'readonly ');
                    }
                });
            },

            TSArrayType(node: TSESTree.TSArrayType) {
                if (isWrappedInReadonlyOperator(node)) {
                    return;
                }
                if (!hasTypeLiteralOrInterfaceBodyAncestor(node)) {
                    return;
                }
                context.report({
                    node,
                    messageId: 'arrayShouldBeReadonly',
                    fix(fixer: Fixer): FixResult {
                        return fixer.replaceText(node, buildArrayReadonlyText(node, sourceCode));
                    }
                });
            },

            TSTupleType(node: TSESTree.TSTupleType) {
                if (isWrappedInReadonlyOperator(node)) {
                    return;
                }
                if (!hasTypeLiteralOrInterfaceBodyAncestor(node)) {
                    return;
                }
                context.report({
                    node,
                    messageId: 'tupleShouldBeReadonly',
                    fix(fixer: Fixer): FixResult {
                        return fixer.replaceText(node, buildTupleReadonlyText(node, sourceCode));
                    }
                });
            },

            TSMappedType(node: TSESTree.TSMappedType) {
                if (isMappedTypeReadonly(node)) {
                    return;
                }
                if (!hasTypeLiteralOrInterfaceBodyAncestor(node)) {
                    return;
                }
                const openBracketToken = sourceCode.getFirstToken(node, function isOpenBracket(token) {
                    return token.value === '[';
                });
                if (openBracketToken === null) {
                    return;
                }
                context.report({
                    node,
                    messageId: 'mappedTypeShouldBeReadonly',
                    fix(fixer: Fixer): FixResult {
                        return fixer.insertTextBefore(openBracketToken, 'readonly ');
                    }
                });
            },

            TSTypeReference(node: TSESTree.TSTypeReference) {
                reportNamedReferenceIfApplicable(context, sourceCode, node);
            }
        };
    }
});
