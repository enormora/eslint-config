import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import type { Linter } from 'eslint';
import functionalPlugin from 'eslint-plugin-functional';
import noObjectComparisonPlugin from 'eslint-plugin-no-object-comparison';
import perfectionistPlugin from 'eslint-plugin-perfectionist';
import { enormoraTypescriptPlugin } from '../../plugins/enormora-typescript/enormora-typescript-plugin.ts';
import { disable } from '../../rule-severity.ts';
import { createRestrictedSyntaxPlugin } from '../../rule-sets/restricted-syntax.ts';
import { baseSharedConfig } from '../base/base-shared.ts';
import { typescriptLanguageOptions, typescriptSettings } from './typescript-environment.ts';

export const noTsEnumDeclarationRestriction = {
    selector: 'TSEnumDeclaration',
    message: 'Use a string union type instead'
};

const namedReferenceTypePrefix = '(?:(?:keyof)?typeof)?';
const mutableContainerLookahead = String
    .raw`(?!(?:Array|ReadonlyArray|Map|ReadonlyMap|Set|ReadonlySet|Record|Readonly)\b)`;
const namedReferenceBody = String.raw`[A-Z][\w$]*(?:\.[A-Z][\w$]*)*(?:<.*>)?`;
const namedReferenceAtom = `${namedReferenceTypePrefix}${mutableContainerLookahead}${namedReferenceBody}`;
const namedReferenceIgnorePattern = `^${namedReferenceAtom}(?:[|&]${namedReferenceAtom})*$`;

const functionLikeNodes = [
    'FunctionDeclaration',
    'FunctionExpression',
    'ArrowFunctionExpression',
    'TSFunctionType',
    'TSMethodSignature',
    'TSDeclareFunction',
    'TSConstructorType'
]
    .join(', ');

const noInlineSignatureTypeLiteralSelector = [
    `:matches(${functionLikeNodes}) > .params TSTypeAnnotation > TSTypeLiteral`,
    `:matches(${functionLikeNodes}) > TSTypeAnnotation.returnType > TSTypeLiteral`
]
    .join(', ');

export const noInlineSignatureTypeLiteralRestriction = {
    selector: noInlineSignatureTypeLiteralSelector,
    message:
        'Inline object type literals are not allowed in function parameters or return types — extract a named type.'
};

const noPublicClassPropertySelector = [
    'PropertyDefinition[accessibility="public"]',
    'AccessorProperty[accessibility="public"]',
    'MethodDefinition[kind="get"][accessibility="public"]',
    'MethodDefinition[kind="set"][accessibility="public"]'
]
    .join(', ');

export const noPublicClassPropertyRestriction = {
    selector: noPublicClassPropertySelector,
    message: 'Class properties and accessors must be private or protected — only methods may be public.'
};

const restrictedSyntaxTypescriptPlugin = createRestrictedSyntaxPlugin(
    [
        'no-ts-enum-declaration',
        'no-inline-signature-type-literal',
        'no-public-class-property'
    ],
    {}
);

function asArray(value: unknown): unknown[] {
    if (Array.isArray(value)) {
        return value;
    }

    return [ value ];
}

function configureWrappedCoreRule(
    name: string,
    optionsOverrides: unknown
): Record<string, unknown> {
    const coreRuleConfig = asArray(baseSharedConfig.rules[name as keyof typeof baseSharedConfig.rules]);
    const [ coreRuleSeverity, ...coreRuleOptions ] = coreRuleConfig;
    const options = optionsOverrides === undefined ? coreRuleOptions : asArray(optionsOverrides);

    return {
        [name]: disable<'Replaced by the corresponding @typescript-eslint extension rule'>(),
        [`@typescript-eslint/${name}`]: [ coreRuleSeverity, ...options ]
    };
}

export const typescriptConfig = {
    languageOptions: typescriptLanguageOptions,
    settings: typescriptSettings,
    plugins: {
        '@typescript-eslint': typescriptPlugin,
        perfectionist: perfectionistPlugin,
        functional: functionalPlugin,
        'no-object-comparison': noObjectComparisonPlugin,
        'restricted-syntax-typescript': restrictedSyntaxTypescriptPlugin,
        'enormora-typescript': enormoraTypescriptPlugin
    },
    rules: {
        'no-object-comparison/object-equality': disable<'Object identity comparisons are intentional'>(),
        'no-object-comparison/object-relational': 'error',
        'no-object-comparison/loose-type': disable<'Comparisons with unknown are valid type narrowing'>(),
        'no-object-comparison/nan-comparison': disable<'Covered by use-isnan'>(),
        'no-object-comparison/self-comparison': disable<'Covered by no-self-compare'>(),
        'no-object-comparison/floating-point-equality': 'error',
        'no-object-comparison/string-number-relational': 'error',
        'no-object-comparison/symbol-literal-comparison': disable<
            'Overlaps no-self-compare and sonarjs/no-identical-expressions'
        >(),
        'no-object-comparison/array-includes-object': [ 'error', { indirectReferences: 'none' } ],
        'no-object-comparison/collection-reference-lookup': [ 'error', { indirectReferences: 'none' } ],
        'no-object-comparison/json-stringify-comparison': disable<
            'Comparing intentionally serialized representations is valid'
        >(),
        'no-object-comparison/object-literal-switch-case': disable<
            'Switch statements are already prohibited by restricted-syntax/no-switch-statement'
        >(),
        'no-object-comparison/boxed-primitive-comparison': disable<
            'Wrapper construction and wrapper types are already prohibited'
        >(),
        'no-object-comparison/collection-object-key': disable<
            'Object collection keys are valid when their references are shared'
        >(),

        'restricted-syntax-typescript/no-ts-enum-declaration': [ 'error', noTsEnumDeclarationRestriction ],
        'restricted-syntax-typescript/no-inline-signature-type-literal': [
            'error',
            noInlineSignatureTypeLiteralRestriction
        ],
        'restricted-syntax-typescript/no-public-class-property': [ 'error', noPublicClassPropertyRestriction ],

        '@typescript-eslint/no-require-imports': 'error',
        '@typescript-eslint/adjacent-overload-signatures': 'error',
        '@typescript-eslint/array-type': [
            'error',
            {
                default: 'array'
            }
        ],
        '@typescript-eslint/await-thenable': 'error',
        '@typescript-eslint/no-empty-object-type': [ 'error', { allowInterfaces: 'never', allowObjectTypes: 'never' } ],
        '@typescript-eslint/no-unsafe-function-type': 'error',
        '@typescript-eslint/no-wrapper-object-types': 'error',
        '@typescript-eslint/no-restricted-types': [
            'error',
            {
                types: {
                    'Record<never, never>': {
                        message:
                            'The `object` type is hard to use. Use `Record<PropertyKey, never>` instead. See: https://github.com/typescript-eslint/typescript-eslint/pull/848',
                        fixWith: 'Record<PropertyKey, never>'
                    },
                    object: {
                        message:
                            'The `object` type is hard to use. Use `Record<string, unknown>` instead. See: https://github.com/typescript-eslint/typescript-eslint/pull/848',
                        fixWith: 'Record<string, unknown>'
                    },
                    Omit: {
                        message: 'Prefer the `Except` type in the `type-fest` package instead as it’s stricter.',
                        fixWith: 'Except'
                    }
                }
            }
        ],
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: 'parameter',
                format: [ 'camelCase' ],
                leadingUnderscore: 'allow',
                trailingUnderscore: 'forbid'
            },
            {
                selector: 'typeLike',
                format: [ 'PascalCase' ]
            },
            {
                selector: 'interface',
                format: [ 'PascalCase' ],
                custom: {
                    regex: '^I[A-Z]',
                    match: false
                }
            }
        ],
        '@typescript-eslint/consistent-type-assertions': [
            'error',
            {
                assertionStyle: 'as',
                objectLiteralTypeAssertions: 'allow-as-parameter'
            }
        ],
        '@typescript-eslint/explicit-function-return-type': [
            'error',
            {
                allowExpressions: true,
                allowTypedFunctionExpressions: true
            }
        ],
        // TS already validates return types, and the SonarJS heuristic
        // misfires on intentional tagged-union returns (e.g. `Value | Sentinel`)
        // even when expressed as a single named alias.
        'sonarjs/function-return-type': disable<
            'TypeScript validates return types and intentional tagged unions need not share a primitive type'
        >(),
        ...configureWrappedCoreRule('max-params', undefined),
        '@typescript-eslint/member-ordering': 'error',
        ...configureWrappedCoreRule('no-array-constructor', undefined),
        ...configureWrappedCoreRule('no-empty-function', undefined),
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-extraneous-class': 'error',
        '@typescript-eslint/no-for-in-array': 'error',
        '@typescript-eslint/no-inferrable-types': 'error',
        '@typescript-eslint/no-misused-new': 'error',
        '@typescript-eslint/no-misused-promises': [
            'error',
            {
                checksConditionals: true,
                checksVoidReturn: true
            }
        ],

        '@typescript-eslint/no-this-alias': [
            'error',
            {
                allowDestructuring: true
            }
        ],
        '@typescript-eslint/no-unsafe-unary-minus': 'error',
        '@typescript-eslint/no-unnecessary-qualifier': 'error',
        '@typescript-eslint/no-unnecessary-type-arguments': 'error',
        '@typescript-eslint/no-unnecessary-type-assertion': 'error',
        'enormora-typescript/no-impure-satisfies': 'error',
        'enormora-typescript/no-this-expressions': 'error',
        'enormora-typescript/prefer-named-callable-types': 'error',
        'enormora-typescript/prefer-readonly-types': 'error',
        '@typescript-eslint/no-unused-private-class-members': 'error',
        ...configureWrappedCoreRule('no-unused-vars', undefined),
        ...configureWrappedCoreRule('no-useless-constructor', undefined),
        '@typescript-eslint/no-useless-constructor': 'error',
        '@typescript-eslint/no-useless-default-assignment': 'error',
        ...configureWrappedCoreRule('prefer-destructuring', undefined),
        '@typescript-eslint/prefer-for-of': 'error',
        '@typescript-eslint/prefer-function-type': 'error',
        '@typescript-eslint/prefer-includes': 'error',
        '@typescript-eslint/prefer-namespace-keyword': 'error',
        '@typescript-eslint/prefer-readonly': 'error',
        '@typescript-eslint/prefer-string-starts-ends-with': 'error',
        '@typescript-eslint/promise-function-async': [
            'error',
            {
                allowAny: true
            }
        ],
        '@typescript-eslint/restrict-plus-operands': 'error',
        '@typescript-eslint/require-array-sort-compare': 'error',
        '@typescript-eslint/triple-slash-reference': [
            'error',
            {
                path: 'never'
            }
        ],
        '@typescript-eslint/prefer-regexp-exec': 'error',
        '@typescript-eslint/unified-signatures': 'error',
        '@typescript-eslint/require-await': disable<
            'Async functions may implement a promise-returning contract without awaiting'
        >(),
        '@typescript-eslint/strict-boolean-expressions': [
            'error',
            {
                allowString: false,
                allowNumber: false,
                allowNullableObject: false,
                allowNullableBoolean: false,
                allowNullableString: false,
                allowNullableNumber: false,
                allowNullableEnum: false,
                allowAny: false,
                allowRuleToRunWithoutStrictNullChecksIKnowWhatIAmDoing: false
            }
        ],
        '@typescript-eslint/strict-void-return': 'error',
        '@typescript-eslint/only-throw-error': 'error',
        '@typescript-eslint/prefer-optional-chain': 'error',
        '@typescript-eslint/prefer-nullish-coalescing': [ 'error', { ignoreIfStatements: true } ],
        '@typescript-eslint/class-literal-property-style': [ 'error', 'fields' ],
        '@typescript-eslint/consistent-type-definitions': [ 'error', 'type' ],
        ...configureWrappedCoreRule('default-param-last', undefined),
        '@typescript-eslint/dot-notation': disable<
            'The core dot-notation rule enforces dot access regardless of noPropertyAccessFromIndexSignature'
        >(),
        '@typescript-eslint/explicit-member-accessibility': [ 'error', { accessibility: 'explicit' } ],
        '@typescript-eslint/explicit-module-boundary-types': disable<
            'Return annotations are handled by @typescript-eslint/explicit-function-return-type'
        >(),
        '@typescript-eslint/init-declarations': disable<
            'The existing core init-declarations rule remains enabled'
        >(),
        '@typescript-eslint/method-signature-style': [ 'error', 'property' ],
        '@typescript-eslint/no-base-to-string': 'error',
        ...configureWrappedCoreRule('no-dupe-class-members', undefined),
        '@typescript-eslint/no-dynamic-delete': [ 'error' ],
        '@typescript-eslint/no-extra-non-null-assertion': [ 'error' ],
        '@typescript-eslint/no-floating-promises': [ 'error' ],
        '@typescript-eslint/no-implied-eval': [ 'error' ],
        '@typescript-eslint/no-invalid-this': [ 'error' ],
        '@typescript-eslint/no-invalid-void-type': [ 'error' ],
        ...configureWrappedCoreRule('no-magic-numbers', {
            ignoreEnums: false,
            ignoreNumericLiteralTypes: true,
            ignoreReadonlyClassProperties: false,
            ignoreTypeIndexes: false,
            ignoreDefaultValues: true,
            ignoreArrayIndexes: false,
            detectObjects: false,
            enforceConst: false,
            ignoreClassFieldInitialValues: false,
            ignore: [ -1, 0, 1 ]
        }),
        '@typescript-eslint/no-namespace': [ 'error' ],
        '@typescript-eslint/no-non-null-asserted-optional-chain': [ 'error' ],
        '@typescript-eslint/no-non-null-assertion': [ 'error' ],
        '@typescript-eslint/no-unnecessary-boolean-literal-compare': [ 'error' ],
        '@typescript-eslint/no-unnecessary-condition': [ 'error' ],
        '@typescript-eslint/no-unsafe-assignment': [ 'error' ],
        '@typescript-eslint/no-unsafe-call': [ 'error' ],
        '@typescript-eslint/no-unsafe-member-access': [ 'error' ],
        '@typescript-eslint/no-unsafe-return': [ 'error' ],
        ...configureWrappedCoreRule('no-use-before-define', undefined),
        '@typescript-eslint/prefer-as-const': [ 'error' ],
        '@typescript-eslint/prefer-readonly-parameter-types': [
            disable<'Readonly parameters are handled by functional/prefer-immutable-types'>()
        ],
        '@typescript-eslint/prefer-reduce-type-parameter': [ 'error' ],
        '@typescript-eslint/ban-ts-comment': [
            'error',
            {
                'ts-expect-error': 'allow-with-description',
                'ts-ignore': true,
                'ts-nocheck': true,
                'ts-check': false,
                minimumDescriptionLength: 10
            }
        ],
        '@typescript-eslint/restrict-template-expressions': [
            disable<
                'Implicit conversion of non-string values is allowed; object coercion is checked by no-base-to-string'
            >()
        ],
        '@typescript-eslint/return-await': [ 'error', 'error-handling-correctness-only' ],
        '@typescript-eslint/switch-exhaustiveness-check': [ 'error' ],
        '@typescript-eslint/unbound-method': [
            disable<'Blanket method binding is not required and may add unnecessary allocation overhead'>()
        ],
        '@typescript-eslint/ban-tslint-comment': [
            disable<'TSLint is not used in the intended toolchain, so directive checks add no value'>()
        ],
        '@typescript-eslint/no-confusing-non-null-assertion': [ 'error' ],
        '@typescript-eslint/prefer-enum-initializers': [
            disable<'Enums are prohibited by restricted-syntax-typescript/no-ts-enum-declaration'>()
        ],
        '@typescript-eslint/prefer-literal-enum-member': [
            disable<'Enums are prohibited by restricted-syntax-typescript/no-ts-enum-declaration'>()
        ],
        ...configureWrappedCoreRule('no-redeclare', undefined),
        ...configureWrappedCoreRule('no-shadow', undefined),
        '@typescript-eslint/consistent-type-imports': [
            'error',
            { prefer: 'type-imports', fixStyle: 'inline-type-imports', disallowTypeAnnotations: true }
        ],
        '@typescript-eslint/consistent-indexed-object-style': [ 'error', 'record' ],
        '@typescript-eslint/no-unnecessary-type-constraint': 'error',
        '@typescript-eslint/no-confusing-void-expression': [
            'error',
            {
                ignoreArrowShorthand: false,
                ignoreVoidOperator: false
            }
        ],
        '@typescript-eslint/non-nullable-type-assertion-style': disable<
            'Conflicts with @typescript-eslint/no-non-null-assertion'
        >(),
        '@typescript-eslint/no-unsafe-argument': 'error',
        '@typescript-eslint/prefer-return-this-type': 'error',
        '@typescript-eslint/no-meaningless-void-operator': 'error',
        '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error',
        '@typescript-eslint/consistent-type-exports': 'error',
        '@typescript-eslint/no-redundant-type-constituents': 'error',
        '@typescript-eslint/no-useless-empty-export': 'error',
        '@typescript-eslint/consistent-generic-constructors': [ 'error', 'constructor' ],
        '@typescript-eslint/no-duplicate-enum-values': 'error',
        '@typescript-eslint/parameter-properties': [ 'error', { prefer: 'class-property' } ],
        '@typescript-eslint/no-unsafe-declaration-merging': 'error',
        '@typescript-eslint/no-mixed-enums': 'error',
        '@typescript-eslint/no-import-type-side-effects': 'error',
        '@typescript-eslint/no-duplicate-type-constituents': 'error',
        '@typescript-eslint/no-unsafe-enum-comparison': 'error',
        '@typescript-eslint/class-methods-use-this': 'error',
        '@typescript-eslint/no-array-delete': 'error',
        '@typescript-eslint/no-unnecessary-template-expression': 'error',
        '@typescript-eslint/no-unnecessary-type-conversion': 'error',
        ...configureWrappedCoreRule('prefer-promise-reject-errors', undefined),
        '@typescript-eslint/prefer-find': 'error',
        '@typescript-eslint/no-deprecated': disable<'Deprecation checks are handled by sonarjs/deprecation'>(),
        '@typescript-eslint/no-unnecessary-parameter-property-assignment': 'error',
        '@typescript-eslint/no-unnecessary-type-parameters': 'error',
        '@typescript-eslint/no-unsafe-type-assertion': 'error',
        '@typescript-eslint/related-getter-setter-pairs': 'error',
        '@typescript-eslint/no-misused-spread': 'error',
        '@typescript-eslint/no-generated-empty-object-type': 'error',
        '@typescript-eslint/no-unsafe-enum-assignment': 'error',

        'functional/functional-parameters': disable<
            'Broad functional restrictions produce too many false positives for the intended style'
        >(),
        'functional/immutable-data': disable<
            'Avoid false positives and deep readonly requirements that can need extra utility type dependencies'
        >(),
        'functional/no-classes': disable<'Class declarations are handled by restricted-syntax/no-class-declaration'>(),
        'functional/no-conditional-statements': disable<
            'Broad functional restrictions produce too many false positives for the intended style'
        >(),
        'functional/no-expression-statements': disable<
            'Broad functional restrictions produce too many false positives for the intended style'
        >(),
        'functional/no-let': disable<
            'Broad functional restrictions produce too many false positives for the intended style'
        >(),
        'functional/no-loop-statements': disable<
            'Broad functional restrictions produce too many false positives for the intended style'
        >(),
        'functional/no-mixed-types': disable<
            'Broad functional restrictions produce too many false positives for the intended style'
        >(),
        'functional/no-promise-reject': disable<
            'Broad functional restrictions produce too many false positives for the intended style'
        >(),
        'functional/no-return-void': disable<
            'Broad functional restrictions produce too many false positives for the intended style'
        >(),
        'functional/no-this-expressions': disable<'Covered by enormora-typescript/no-this-expressions'>(),
        'functional/no-throw-statements': disable<
            'Broad functional restrictions produce too many false positives for the intended style'
        >(),
        'functional/no-try-statements': disable<
            'Broad functional restrictions produce too many false positives for the intended style'
        >(),
        'functional/prefer-property-signatures': disable<'Covered by @typescript-eslint/method-signature-style'>(),
        'functional/prefer-immutable-types': [
            'error',
            {
                enforcement: 'ReadonlyShallow',
                ignoreClasses: false,
                ignoreInferredTypes: true,
                // Mimics the deprecated functional/prefer-readonly-type: skip
                // named class/interface/type-alias references whose upstream
                // members are not declared readonly, so structural shallow
                // checks cannot be satisfied by any annotation.
                ignoreTypePattern: [ namedReferenceIgnorePattern ],
                fixer: {
                    ReadonlyShallow: [
                        {
                            pattern: String.raw`^([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*\[\])$`,
                            replace: 'readonly $1'
                        },
                        {
                            pattern: String.raw`^(\[.+\])$`,
                            replace: 'readonly $1'
                        },
                        {
                            pattern: '^(Map|Set)<(.+)>$',
                            replace: 'Readonly$1<$2>'
                        },
                        {
                            pattern: '^Record<(.+)>$',
                            replace: 'Readonly<Record<$1>>'
                        },
                        {
                            pattern: String.raw`^\{ \[([^\]]+)\]: (.+?);? \}$`,
                            replace: '{ readonly [$1]: $2; }'
                        },
                        // Iterative one-property-per-pass prefix for object
                        // literal types. ESLint --fix runs the rule repeatedly
                        // until stable, so this prefixes one property each
                        // pass. Anchoring at "^{ " or "; " means only property
                        // boundaries inside an object type match; function
                        // parameters are inside "(" and never matched.
                        {
                            pattern: String.raw`(^\{ |; )(?!readonly )([\w$]+\??: )`,
                            replace: '$1readonly $2'
                        }
                    ]
                },
                parameters: {
                    enforcement: 'ReadonlyShallow'
                },
                returnTypes: {
                    enforcement: 'None'
                },
                variables: {
                    enforcement: 'None'
                }
            }
        ],
        'functional/prefer-tacit': 'error',
        'functional/readonly-type': [ 'error', 'keyword' ],
        'functional/no-class-inheritance': disable<
            'Class declarations are handled by restricted-syntax/no-class-declaration'
        >(),
        'functional/type-declaration-immutability': [
            'error',
            {
                rules: [
                    {
                        identifiers: '^.*',
                        immutability: 'ReadonlyShallow',
                        comparator: 'AtLeast',
                        fixer: [
                            {
                                pattern: String.raw`^([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*\[\])$`,
                                replace: 'readonly $1'
                            },
                            {
                                pattern: String.raw`^(\[.+\])$`,
                                replace: 'readonly $1'
                            },
                            {
                                pattern: '^(Map|Set)<(.+)>$',
                                replace: 'Readonly$1<$2>'
                            },
                            {
                                pattern: '^Record<(.+)>$',
                                replace: 'Readonly<Record<$1>>'
                            },
                            {
                                pattern: String.raw`^\{ \[([^\]]+)\]: (.+?);? \}$`,
                                replace: '{ readonly [$1]: $2; }'
                            },
                            {
                                pattern: String.raw`(^\{ |; )(?!readonly )([\w$]+\??: )`,
                                replace: '$1readonly $2'
                            }
                        ]
                    }
                ],
                ignoreTypePattern: [ namedReferenceIgnorePattern ],
                ignoreInterfaces: false
            }
        ],
        ...configureWrappedCoreRule('consistent-return', undefined),
        '@typescript-eslint/use-unknown-in-catch-callback-variable': 'error',

        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                mjs: 'never',
                cjs: 'never',
                json: 'always',
                ts: 'always',
                mts: 'always',
                cts: 'always'
            }
        ],

        'perfectionist/sort-intersection-types': [
            'error',
            {
                type: 'natural',
                order: 'asc',
                ignoreCase: true,
                groups: [
                    'named',
                    'keyword',
                    'operator',
                    'literal',
                    'function',
                    'import',
                    'conditional',
                    'object',
                    'tuple',
                    'intersection',
                    'union',
                    'nullish',
                    'unknown'
                ]
            }
        ],
        'perfectionist/sort-union-types': [
            'error',
            {
                type: 'natural',
                order: 'asc',
                ignoreCase: true,
                groups: [
                    'named',
                    'keyword',
                    'operator',
                    'literal',
                    'function',
                    'import',
                    'conditional',
                    'object',
                    'tuple',
                    'intersection',
                    'union',
                    'nullish',
                    'unknown'
                ]
            }
        ],
        'perfectionist/sort-array-includes': disable<'Preserve domain order instead of imposing automatic sorting'>(),
        'perfectionist/sort-arrays': disable<'Preserve domain order instead of imposing automatic sorting'>(),
        'perfectionist/sort-classes': disable<
            'Class member ordering is configured by @typescript-eslint/member-ordering'
        >(),
        'perfectionist/sort-constructor-parameters': disable<
            'Preserve domain order instead of imposing automatic sorting'
        >(),
        'perfectionist/sort-enums': disable<
            'Enums are prohibited by restricted-syntax-typescript/no-ts-enum-declaration'
        >(),
        'perfectionist/sort-exports': disable<'Preserve domain order instead of imposing automatic sorting'>(),
        'perfectionist/sort-export-attributes': disable<
            'Preserve domain order instead of imposing automatic sorting'
        >(),
        'perfectionist/sort-imports': disable<'Import ordering is handled by import/order'>(),
        'perfectionist/sort-interfaces': disable<'Preserve domain order instead of imposing automatic sorting'>(),
        'perfectionist/sort-jsx-props': disable<'Preserve domain order instead of imposing automatic sorting'>(),
        'perfectionist/sort-import-attributes': disable<
            'Preserve domain order instead of imposing automatic sorting'
        >(),
        'perfectionist/sort-maps': disable<'Preserve domain order instead of imposing automatic sorting'>(),
        'perfectionist/sort-named-exports': disable<'Preserve domain order instead of imposing automatic sorting'>(),
        'perfectionist/sort-named-imports': disable<'Preserve domain order instead of imposing automatic sorting'>(),
        'perfectionist/sort-object-types': disable<'Preserve domain order instead of imposing automatic sorting'>(),
        'perfectionist/sort-objects': disable<'Preserve domain order instead of imposing automatic sorting'>(),
        'perfectionist/sort-switch-case': disable<
            'Switch statements are prohibited by restricted-syntax/no-switch-statement'
        >(),
        'perfectionist/sort-variable-declarations': disable<
            'Preserve domain order instead of imposing automatic sorting'
        >(),
        'perfectionist/sort-sets': disable<'Preserve domain order instead of imposing automatic sorting'>(),
        'perfectionist/sort-heritage-clauses': disable<'Preserve domain order instead of imposing automatic sorting'>(),
        'perfectionist/sort-decorators': disable<'Preserve domain order instead of imposing automatic sorting'>(),
        'perfectionist/sort-modules': disable<'Preserve domain order instead of imposing automatic sorting'>()
    }
} as unknown as Linter.Config;
