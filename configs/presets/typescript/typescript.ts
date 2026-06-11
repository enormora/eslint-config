import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import type { Linter } from 'eslint';
import functionalPlugin from 'eslint-plugin-functional';
import perfectionistPlugin from 'eslint-plugin-perfectionist';
import { enormoraTypescriptPlugin } from '../../plugins/enormora-typescript/enormora-typescript-plugin.ts';
import { createRestrictedSyntaxPlugin } from '../../rule-sets/restricted-syntax.ts';
import { baseSharedConfig } from '../base/base-shared.ts';
import { typescriptLanguageOptions, typescriptSettings } from './typescript-environment.ts';

export const noTsEnumDeclarationRestriction = {
    selector: 'TSEnumDeclaration',
    message: 'Use a string union type instead'
};

const namedReferenceTypePrefix = String.raw`(?:(?:keyof)?typeof)?`;
const mutableContainerLookahead = String
    .raw`(?!(?:Array|ReadonlyArray|Map|ReadonlyMap|Set|ReadonlySet|Record|Readonly)\b)`;
const namedReferenceBody = String.raw`[A-Z][\w$]*(?:\.[A-Z][\w$]*)*(?:<.*>)?`;
const namedReferenceAtom = `${namedReferenceTypePrefix}${mutableContainerLookahead}${namedReferenceBody}`;
const namedReferenceIgnorePattern = String.raw`^${namedReferenceAtom}(?:[|&]${namedReferenceAtom})*$`;

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
        [name]: 'off',
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
        'restricted-syntax-typescript': restrictedSyntaxTypescriptPlugin,
        'enormora-typescript': enormoraTypescriptPlugin
    },
    rules: {
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
        'sonarjs/function-return-type': 'off',
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
        '@typescript-eslint/require-await': 'off',
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
        ...configureWrappedCoreRule('dot-notation', undefined),
        '@typescript-eslint/explicit-member-accessibility': [ 'error', { accessibility: 'explicit' } ],
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/init-declarations': 'off',
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
        // disabled because we use functional/prefer-immutable-types.md
        '@typescript-eslint/prefer-readonly-parameter-types': [ 'off' ],
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
        '@typescript-eslint/restrict-template-expressions': [ 'off' ],
        '@typescript-eslint/return-await': [ 'off' ],
        '@typescript-eslint/switch-exhaustiveness-check': [ 'error' ],
        '@typescript-eslint/unbound-method': [ 'off' ],
        '@typescript-eslint/ban-tslint-comment': [ 'off' ],
        '@typescript-eslint/no-confusing-non-null-assertion': [ 'error' ],
        '@typescript-eslint/prefer-enum-initializers': [ 'off' ],
        '@typescript-eslint/prefer-literal-enum-member': [ 'off' ],
        ...configureWrappedCoreRule('no-redeclare', undefined),
        ...configureWrappedCoreRule('no-shadow', undefined),
        '@typescript-eslint/consistent-type-imports': [
            'error',
            { prefer: 'type-imports', fixStyle: 'inline-type-imports', disallowTypeAnnotations: true }
        ],
        '@typescript-eslint/consistent-indexed-object-style': [ 'error', 'record' ],
        '@typescript-eslint/no-loop-func': 'off',
        '@typescript-eslint/no-unnecessary-type-constraint': 'error',
        '@typescript-eslint/no-confusing-void-expression': [
            'error',
            {
                ignoreArrowShorthand: false,
                ignoreVoidOperator: false
            }
        ],
        '@typescript-eslint/non-nullable-type-assertion-style': 'off',
        '@typescript-eslint/no-unsafe-argument': 'error',
        '@typescript-eslint/prefer-return-this-type': 'error',
        '@typescript-eslint/no-meaningless-void-operator': 'error',
        '@typescript-eslint/no-restricted-imports': 'error',
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
        '@typescript-eslint/no-deprecated': 'off',
        '@typescript-eslint/no-unnecessary-parameter-property-assignment': 'error',
        '@typescript-eslint/no-unnecessary-type-parameters': 'error',
        '@typescript-eslint/no-unsafe-type-assertion': 'error',
        '@typescript-eslint/related-getter-setter-pairs': 'error',
        '@typescript-eslint/no-misused-spread': 'error',

        'functional/functional-parameters': 'off',
        'functional/immutable-data': 'off',
        'functional/no-classes': 'off',
        'functional/no-conditional-statements': 'off',
        'functional/no-expression-statements': 'off',
        'functional/no-let': 'off',
        'functional/no-loop-statements': 'off',
        'functional/no-mixed-types': 'off',
        'functional/no-promise-reject': 'off',
        'functional/no-return-void': 'off',
        'functional/no-this-expressions': 'off',
        'functional/no-throw-statements': 'off',
        'functional/no-try-statements': 'off',
        'functional/prefer-property-signatures': 'off',
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
                            pattern: '^([_$a-zA-Z\\xA0-\\uFFFF][_$a-zA-Z0-9\\xA0-\\uFFFF]*\\[\\])$',
                            replace: 'readonly $1'
                        },
                        {
                            pattern: '^(\\[.+\\])$',
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
                            pattern: '^\\{ \\[([^\\]]+)\\]: (.+?);? \\}$',
                            replace: '{ readonly [$1]: $2; }'
                        },
                        // Iterative one-property-per-pass prefix for object
                        // literal types. ESLint --fix runs the rule repeatedly
                        // until stable, so this prefixes one property each
                        // pass. Anchoring at "^{ " or "; " means only property
                        // boundaries inside an object type match; function
                        // parameters are inside "(" and never matched.
                        {
                            pattern: '(^\\{ |; )(?!readonly )([\\w$]+\\??: )',
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
        'functional/no-class-inheritance': 'off',
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
                                pattern: '^([_$a-zA-Z\\xA0-\\uFFFF][_$a-zA-Z0-9\\xA0-\\uFFFF]*\\[\\])$',
                                replace: 'readonly $1'
                            },
                            {
                                pattern: '^(\\[.+\\])$',
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
                                pattern: '^\\{ \\[([^\\]]+)\\]: (.+?);? \\}$',
                                replace: '{ readonly [$1]: $2; }'
                            },
                            {
                                pattern: '(^\\{ |; )(?!readonly )([\\w$]+\\??: )',
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
            {
                ts: 'ignorePackages',
                mts: 'ignorePackages',
                cts: 'ignorePackages',
                js: 'never',
                mjs: 'never',
                cjs: 'never',
                json: 'ignorePackages'
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
        'perfectionist/sort-array-includes': 'off',
        'perfectionist/sort-arrays': 'off',
        'perfectionist/sort-classes': 'off',
        'perfectionist/sort-enums': 'off',
        'perfectionist/sort-exports': 'off',
        'perfectionist/sort-export-attributes': 'off',
        'perfectionist/sort-imports': 'off',
        'perfectionist/sort-interfaces': 'off',
        'perfectionist/sort-jsx-props': 'off',
        'perfectionist/sort-import-attributes': 'off',
        'perfectionist/sort-maps': 'off',
        'perfectionist/sort-named-exports': 'off',
        'perfectionist/sort-named-imports': 'off',
        'perfectionist/sort-object-types': 'off',
        'perfectionist/sort-objects': 'off',
        'perfectionist/sort-switch-case': 'off',
        'perfectionist/sort-variable-declarations': 'off',
        'perfectionist/sort-sets': 'off',
        'perfectionist/sort-heritage-clauses': 'off',
        'perfectionist/sort-decorators': 'off',
        'perfectionist/sort-modules': 'off'
    }
} as unknown as Linter.Config;
