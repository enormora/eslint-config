import {
    AST_NODE_TYPES,
    ESLintUtils,
    type ParserServicesWithTypeInformation,
    type TSESTree
} from '@typescript-eslint/utils';
import ts, { type Signature, type Symbol as TsSymbol, type Type, type TypeChecker } from 'typescript';

function ruleUrl(ruleName: string): string {
    return `https://github.com/enormora/eslint-config/blob/main/configs/plugins/enormora-typescript/${ruleName}.ts`;
}

const { RuleCreator: ruleCreator } = ESLintUtils;
const buildRule = ruleCreator(ruleUrl);

type CallableUtility = 'ConstructorParameters' | 'InstanceType' | 'Parameters' | 'ReturnType' | 'ThisParameterType';

const callableUtilities: ReadonlySet<CallableUtility> = new Set([
    'ConstructorParameters',
    'InstanceType',
    'Parameters',
    'ReturnType',
    'ThisParameterType'
]);

function isCallableUtility(name: string): name is CallableUtility {
    return (callableUtilities as ReadonlySet<string>).has(name);
}

function getUtilityName(typeReference: TSESTree.TSTypeReference): CallableUtility | undefined {
    const { typeName } = typeReference;
    if (typeName.type !== AST_NODE_TYPES.Identifier) {
        return undefined;
    }
    if (!isCallableUtility(typeName.name)) {
        return undefined;
    }
    return typeName.name;
}

function getCallSignatureTypes(
    checker: TypeChecker,
    type: Type,
    kind: ts.SignatureKind
): readonly Signature[] {
    return checker.getSignaturesOfType(type, kind);
}

function collectParameterTypes(
    checker: TypeChecker,
    signatures: readonly Signature[]
): readonly Type[] {
    return signatures.flatMap(function getParameterTypes(signature: Signature): readonly Type[] {
        return signature.getParameters().map(function symbolType(parameter: TsSymbol): Type {
            return checker.getTypeOfSymbol(parameter);
        });
    });
}

function collectReturnTypes(
    checker: TypeChecker,
    signatures: readonly Signature[]
): readonly Type[] {
    return signatures.map(function returnType(signature: Signature): Type {
        return checker.getReturnTypeOfSignature(signature);
    });
}

function collectThisParameterTypes(
    checker: TypeChecker,
    signatures: readonly Signature[]
): readonly Type[] {
    return signatures
        .map(function pickThisParameter(signature: Signature): TsSymbol | undefined {
            return signature.thisParameter;
        })
        .filter(function keepDefined(parameter: TsSymbol | undefined): parameter is TsSymbol {
            return parameter !== undefined;
        })
        .map(function symbolType(parameter: TsSymbol): Type {
            return checker.getTypeOfSymbol(parameter);
        });
}

function candidatesForUtility(
    checker: TypeChecker,
    utility: CallableUtility,
    exprType: Type
): readonly Type[] {
    if (utility === 'ReturnType') {
        return collectReturnTypes(checker, getCallSignatureTypes(checker, exprType, ts.SignatureKind.Call));
    }
    if (utility === 'Parameters') {
        return collectParameterTypes(checker, getCallSignatureTypes(checker, exprType, ts.SignatureKind.Call));
    }
    if (utility === 'ConstructorParameters') {
        return collectParameterTypes(checker, getCallSignatureTypes(checker, exprType, ts.SignatureKind.Construct));
    }
    if (utility === 'InstanceType') {
        return collectReturnTypes(checker, getCallSignatureTypes(checker, exprType, ts.SignatureKind.Construct));
    }
    return collectThisParameterTypes(checker, getCallSignatureTypes(checker, exprType, ts.SignatureKind.Call));
}

function isExternalSourceFile(fileName: string): boolean {
    return fileName.includes('/node_modules/');
}

function findLocalAlias(type: Type): { readonly alias: TsSymbol; readonly fileName: string; } | undefined {
    const { aliasSymbol } = type;
    if (aliasSymbol === undefined) {
        return undefined;
    }
    const fileName = aliasSymbol.declarations?.[0]?.getSourceFile().fileName;
    if (fileName === undefined || isExternalSourceFile(fileName)) {
        return undefined;
    }
    return { alias: aliasSymbol, fileName };
}

function findFirstLocalAlias(
    candidates: readonly Type[]
): { readonly alias: TsSymbol; readonly fileName: string; } | undefined {
    for (const candidate of candidates) {
        const found = findLocalAlias(candidate);
        if (found !== undefined) {
            return found;
        }
    }
    return undefined;
}

function getEnclosingUtilityTypeReference(
    typeQuery: TSESTree.TSTypeQuery
): TSESTree.TSTypeReference | undefined {
    const instantiation = typeQuery.parent;
    if (instantiation.type !== AST_NODE_TYPES.TSTypeParameterInstantiation) {
        return undefined;
    }
    const reference = instantiation.parent;
    if (reference.type !== AST_NODE_TYPES.TSTypeReference) {
        return undefined;
    }
    if (reference.typeArguments !== instantiation) {
        return undefined;
    }
    return reference;
}

type Reportable = {
    readonly reference: TSESTree.TSTypeReference;
    readonly utilityName: CallableUtility;
    readonly aliasName: string;
};

function findReportableTypeQuery(
    services: ParserServicesWithTypeInformation,
    checker: TypeChecker,
    node: TSESTree.TSTypeQuery
): Reportable | undefined {
    const reference = getEnclosingUtilityTypeReference(node);
    const utilityName = reference === undefined ? undefined : getUtilityName(reference);
    if (reference === undefined || utilityName === undefined) {
        return undefined;
    }
    const candidates = candidatesForUtility(checker, utilityName, services.getTypeAtLocation(node));
    const local = findFirstLocalAlias(candidates);
    return local === undefined
        ? undefined
        : { reference, utilityName, aliasName: local.alias.name };
}

const description = 'Disallow reconstructing a callable’s related type via `typeof` through a callable utility ' +
    '(`ReturnType`, `Parameters`, `ConstructorParameters`, `InstanceType`, `ThisParameterType`) ' +
    'when the resulting type already has a named alias defined in the local sources.';

const preferNamedAliasMessage =
    'Use the named type alias `{{aliasName}}` instead of reconstructing it from `typeof` through `{{utilityName}}`.';

export const preferNamedCallableTypesRule = buildRule({
    name: 'prefer-named-callable-types',
    meta: {
        type: 'problem',
        docs: { description },
        messages: {
            preferNamedAlias: preferNamedAliasMessage
        },
        schema: []
    },
    defaultOptions: [],
    create(context) {
        const services = ESLintUtils.getParserServices(context);
        const checker = services.program.getTypeChecker();

        return {
            TSTypeQuery(node: TSESTree.TSTypeQuery) {
                const finding = findReportableTypeQuery(services, checker, node);
                if (finding === undefined) {
                    return;
                }
                context.report({
                    node: finding.reference,
                    messageId: 'preferNamedAlias',
                    data: { aliasName: finding.aliasName, utilityName: finding.utilityName }
                });
            }
        };
    }
});
