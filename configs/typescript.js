import typescriptParser from '@typescript-eslint/parser';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import functionalPlugin from 'eslint-plugin-functional';
import { baseConfig } from './base.js';
import { javascriptExtensions, typescriptExtensions } from './constants.js';

function asArray(value) {
    if (Array.isArray(value)) {
        return value;
    }

    return [value];
}

function configureWrappedCoreRule(name, optionsOverrides) {
    const coreRuleConfig = asArray(baseConfig.rules[name]);
    const [coreRuleSeverity, ...coreRuleOptions] = coreRuleConfig;
    const options = optionsOverrides === undefined ? coreRuleOptions : asArray(optionsOverrides);

    return {
        [name]: 'off',
        [`@typescript-eslint/${name}`]: [coreRuleSeverity, ...options]
    };
}

export const typescriptConfig = {
    languageOptions: {
        parser: typescriptParser,
        parserOptions: {
            warnOnUnsupportedTypeScriptVersion: false,
            sourceType: 'module',
            ecmaFeatures: {
                jsx: false,
                globalReturn: false
            },
            EXPERIMENTAL_useProjectService: true,
            project: 'tsconfig.json'
        }
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: [...javascriptExtensions, ...typescriptExtensions]
            }
        },
        'import/parsers': {
            '@typescript-eslint/parser': typescriptExtensions
        }
    },
    plugins: {
        '@typescript-eslint': typescriptPlugin,
        functional: functionalPlugin
    },
    rules: {
        '@typescript-eslint/no-require-imports': 'error',
        '@typescript-eslint/adjacent-overload-signatures': 'error',
        '@typescript-eslint/array-type': [
            'error',
            {
                default: 'array'
            }
        ],
        '@typescript-eslint/await-thenable': 'error',
        '@typescript-eslint/ban-types': [
            'error',
            {
                types: {
                    String: {
                        message: 'Use `string` instead.',
                        fixWith: 'string'
                    },
                    Number: {
                        message: 'Use `number` instead.',
                        fixWith: 'number'
                    },
                    Boolean: {
                        message: 'Use `boolean` instead.',
                        fixWith: 'boolean'
                    },
                    Symbol: {
                        message: 'Use `symbol` instead.',
                        fixWith: 'symbol'
                    },
                    Object: {
                        message:
                            'The `Object` type is mostly the same as `unknown`. You probably want `Record<string, unknown>` instead. See https://github.com/typescript-eslint/typescript-eslint/pull/848',
                        fixWith: 'Record<string, unknown>'
                    },
                    object: {
                        message:
                            'The `object` type is hard to use. Use `Record<string, unknown>` instead. See: https://github.com/typescript-eslint/typescript-eslint/pull/848',
                        fixWith: 'Record<string, unknown>'
                    },
                    Function: 'Use a specific function type instead, like `() => void`.',
                    Omit: 'Prefer the `Except` type in the `type-fest` package instead as it’s stricter.'
                }
            }
        ],
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: 'parameter',
                format: ['camelCase'],
                leadingUnderscore: 'allow',
                trailingUnderscore: 'forbid'
            },
            {
                selector: 'typeLike',
                format: ['PascalCase']
            },
            {
                selector: 'interface',
                format: ['PascalCase'],
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
        ...configureWrappedCoreRule('max-params'),
        '@typescript-eslint/member-ordering': 'error',
        ...configureWrappedCoreRule('no-array-constructor'),
        ...configureWrappedCoreRule('no-empty-function'),
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-empty-interface': [
            'error',
            {
                allowSingleExtends: true
            }
        ],
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
        ...configureWrappedCoreRule('no-unused-vars'),
        ...configureWrappedCoreRule('no-useless-constructor'),
        '@typescript-eslint/no-useless-constructor': 'error',
        '@typescript-eslint/no-var-requires': 'error',
        ...configureWrappedCoreRule('prefer-destructuring'),
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
        '@typescript-eslint/only-throw-error': 'error',
        '@typescript-eslint/prefer-optional-chain': 'error',
        '@typescript-eslint/prefer-nullish-coalescing': 'error',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/class-literal-property-style': ['error', 'fields'],
        '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
        ...configureWrappedCoreRule('default-param-last'),
        ...configureWrappedCoreRule('dot-notation'),
        '@typescript-eslint/explicit-member-accessibility': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/init-declarations': 'off',
        '@typescript-eslint/method-signature-style': ['error', 'property'],
        '@typescript-eslint/no-base-to-string': 'error',
        ...configureWrappedCoreRule('no-dupe-class-members'),
        '@typescript-eslint/no-dynamic-delete': ['error'],
        '@typescript-eslint/no-extra-non-null-assertion': ['error'],
        '@typescript-eslint/no-floating-promises': ['error'],
        '@typescript-eslint/no-implied-eval': ['error'],
        '@typescript-eslint/no-invalid-this': ['error'],
        '@typescript-eslint/no-invalid-void-type': ['error'],
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
            ignore: [-1, 0, 1]
        }),
        '@typescript-eslint/no-namespace': ['error'],
        '@typescript-eslint/no-non-null-asserted-optional-chain': ['error'],
        '@typescript-eslint/no-non-null-assertion': ['error'],
        '@typescript-eslint/no-unnecessary-boolean-literal-compare': ['error'],
        '@typescript-eslint/no-unnecessary-condition': ['error'],
        '@typescript-eslint/no-unsafe-assignment': ['error'],
        '@typescript-eslint/no-unsafe-call': ['error'],
        '@typescript-eslint/no-unsafe-member-access': ['error'],
        '@typescript-eslint/no-unsafe-return': ['error'],
        ...configureWrappedCoreRule('no-use-before-define'),
        '@typescript-eslint/prefer-as-const': ['error'],
        // disabled because we use functional/prefer-immutable-types.md
        '@typescript-eslint/prefer-readonly-parameter-types': ['off'],
        '@typescript-eslint/prefer-reduce-type-parameter': ['error'],
        '@typescript-eslint/prefer-ts-expect-error': ['error'],
        '@typescript-eslint/restrict-template-expressions': ['off'],
        '@typescript-eslint/return-await': ['off'],
        '@typescript-eslint/switch-exhaustiveness-check': ['error'],
        '@typescript-eslint/typedef': ['off'],
        '@typescript-eslint/unbound-method': ['off'],
        '@typescript-eslint/ban-tslint-comment': ['off'],
        '@typescript-eslint/no-confusing-non-null-assertion': ['error'],
        '@typescript-eslint/prefer-enum-initializers': ['off'],
        '@typescript-eslint/prefer-literal-enum-member': ['off'],
        '@typescript-eslint/no-loss-of-precision': ['off'],
        ...configureWrappedCoreRule('no-redeclare'),
        ...configureWrappedCoreRule('no-shadow'),
        '@typescript-eslint/consistent-type-imports': [
            'error',
            { prefer: 'type-imports', fixStyle: 'inline-type-imports', disallowTypeAnnotations: true }
        ],
        '@typescript-eslint/consistent-indexed-object-style': ['error', 'record'],
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
        '@typescript-eslint/sort-type-constituents': [
            'error',
            {
                checkIntersections: true,
                checkUnions: true,
                groupOrder: [
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
                    'nullish'
                ]
            }
        ],
        '@typescript-eslint/no-unsafe-argument': 'error',
        '@typescript-eslint/prefer-return-this-type': 'off',
        '@typescript-eslint/no-meaningless-void-operator': 'error',
        '@typescript-eslint/no-restricted-imports': 'error',
        '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error',
        '@typescript-eslint/consistent-type-exports': 'error',
        '@typescript-eslint/no-redundant-type-constituents': 'error',
        '@typescript-eslint/no-useless-empty-export': 'error',
        '@typescript-eslint/consistent-generic-constructors': ['error', 'constructor'],
        '@typescript-eslint/no-duplicate-enum-values': 'error',
        '@typescript-eslint/parameter-properties': 'off',
        '@typescript-eslint/no-unsafe-declaration-merging': 'error',
        '@typescript-eslint/no-mixed-enums': 'error',
        '@typescript-eslint/no-import-type-side-effects': 'error',
        '@typescript-eslint/no-duplicate-type-constituents': 'error',
        '@typescript-eslint/no-unsafe-enum-comparison': 'error',
        '@typescript-eslint/class-methods-use-this': 'error',
        '@typescript-eslint/no-array-delete': 'error',
        '@typescript-eslint/no-useless-template-literals': 'error',
        ...configureWrappedCoreRule('prefer-promise-reject-errors'),
        '@typescript-eslint/prefer-find': 'error',

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
        'functional/no-this-expressions': 'error',
        'functional/no-throw-statements': 'off',
        'functional/no-try-statements': 'off',
        'functional/prefer-property-signatures': 'off',
        'functional/prefer-immutable-types': [
            'error',
            {
                enforcement: 'ReadonlyShallow',
                ignoreClasses: false,
                ignoreInferredTypes: true,
                fixer: {
                    ReadonlyShallow: [
                        {
                            pattern: '^([_$a-zA-Z\\xA0-\\uFFFF][_$a-zA-Z0-9\\xA0-\\uFFFF]*\\[\\])$',
                            replace: 'readonly $1'
                        },
                        {
                            pattern: '^(Array|Map|Set)<(.+)>$',
                            replace: 'Readonly$1<$2>'
                        },
                        {
                            pattern: '^(.+)$',
                            replace: 'Readonly<$1>'
                        }
                    ]
                },
                parameters: {
                    enforcement: 'ReadonlyShallow'
                },
                returnTypes: {
                    enforcement: 'ReadonlyShallow'
                },
                variables: {
                    enforcement: 'ReadonlyShallow',
                    ignoreInFunctions: true
                }
            }
        ],
        'functional/prefer-tacit': 'error',
        'functional/readonly-type': ['error', 'keyword'],
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
                                pattern: '^(Array|Map|Set)<(.+)>$',
                                replace: 'Readonly$1<$2>'
                            },
                            {
                                pattern: '^(.+)$',
                                replace: 'Readonly<$1>'
                            }
                        ]
                    }
                ],
                ignoreInterfaces: false
            }
        ],
        ...configureWrappedCoreRule('consistent-return'),
        '@typescript-eslint/use-unknown-in-catch-callback-variable': 'error'
    }
};
