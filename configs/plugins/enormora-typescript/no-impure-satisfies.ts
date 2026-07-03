import { isTypeFlagSet } from '@typescript-eslint/type-utils';
import { ESLintUtils, type TSESTree } from '@typescript-eslint/utils';
import ts, { type Type, type TypeChecker, type TypeNode, type TypeReference } from 'typescript';

function ruleUrl(ruleName: string): string {
    return `https://github.com/enormora/eslint-config/blob/main/configs/plugins/enormora-typescript/${ruleName}.ts`;
}

const { RuleCreator: ruleCreator } = ESLintUtils;
const buildRule = ruleCreator(ruleUrl);

function collectArrayOrTupleArguments(checker: TypeChecker, type: Type): readonly Type[] {
    if (checker.isArrayType(type) || checker.isTupleType(type)) {
        return checker.getTypeArguments(type as TypeReference);
    }
    return [];
}

function collectPropertyTypes(checker: TypeChecker, type: Type): readonly Type[] {
    return checker.getPropertiesOfType(type).map(function getSymbolType(property) {
        return checker.getTypeOfSymbol(property);
    });
}

function collectCallReturnTypes(checker: TypeChecker, type: Type): readonly Type[] {
    return checker.getSignaturesOfType(type, ts.SignatureKind.Call).map(function getReturnType(signature) {
        return checker.getReturnTypeOfSignature(signature);
    });
}

function collectIndexTypes(checker: TypeChecker, type: Type): readonly Type[] {
    const result: Type[] = [];
    const numberIndex = checker.getIndexInfoOfType(type, ts.IndexKind.Number);
    if (numberIndex !== undefined) {
        result.push(numberIndex.type);
    }
    const stringIndex = checker.getIndexInfoOfType(type, ts.IndexKind.String);
    if (stringIndex !== undefined) {
        result.push(stringIndex.type);
    }
    return result;
}

function collectObjectTypeChildren(checker: TypeChecker, type: Type): readonly Type[] {
    return [
        ...collectArrayOrTupleArguments(checker, type),
        ...collectPropertyTypes(checker, type),
        ...collectCallReturnTypes(checker, type),
        ...collectIndexTypes(checker, type)
    ];
}

function childrenOf(checker: TypeChecker, type: Type): readonly Type[] {
    if (type.isUnionOrIntersection()) {
        return type.types;
    }
    if (!isTypeFlagSet(type, ts.TypeFlags.Object)) {
        return [];
    }
    return collectObjectTypeChildren(checker, type);
}

function containsLiteralComponent(checker: TypeChecker, rootType: Type): boolean {
    const visitedTypes = new WeakSet<Type>();

    function typeContainsLiteralComponent(type: Type): boolean {
        if (visitedTypes.has(type)) {
            return false;
        }
        visitedTypes.add(type);
        return type.isLiteral() ||
            childrenOf(checker, type).some(typeContainsLiteralComponent);
    }

    return typeContainsLiteralComponent(rootType);
}

const description = 'Disallow `satisfies` expressions that aren’t pure type checks: literal constraints or no-op.';

const typeChangingMessage =
    'This `satisfies` narrows the inferred type via literal constraints. Remove it or use `as const`.';

const trivialMessage =
    'This `satisfies` is purely structural and adds no narrowing. Remove it or use a type annotation.';

export const noImpureSatisfiesRule = buildRule({
    name: 'no-impure-satisfies',
    meta: {
        type: 'problem',
        docs: { description },
        messages: {
            typeChangingSatisfies: typeChangingMessage,
            trivialSatisfies: trivialMessage
        },
        schema: []
    },
    defaultOptions: [],
    create(context) {
        const services = ESLintUtils.getParserServices(context);
        const checker = services.program.getTypeChecker();

        return {
            TSSatisfiesExpression(node: TSESTree.TSSatisfiesExpression) {
                const satisfiesTypeNode = services.esTreeNodeToTSNodeMap.get(node.typeAnnotation) as TypeNode;
                const satisfiesType = checker.getTypeFromTypeNode(satisfiesTypeNode);
                const containsLiteral = containsLiteralComponent(checker, satisfiesType);

                context.report({
                    node,
                    messageId: containsLiteral ? 'typeChangingSatisfies' : 'trivialSatisfies'
                });
            }
        };
    }
});
