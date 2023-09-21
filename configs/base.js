import unicornPlugin from 'eslint-plugin-unicorn';
import promisePlugin from 'eslint-plugin-promise';
import importPlugin from 'eslint-plugin-import';
import eslintCommentsPlugin from 'eslint-plugin-eslint-comments';
import noSecretsPlugin from 'eslint-plugin-no-secrets';
import arrayFunctionPlugin from 'eslint-plugin-array-func';
import sonarjsPlugin from 'eslint-plugin-sonarjs';
import prettierPlugin from 'eslint-plugin-prettier';

const ecmaVersion = 2022;
const indentSize = 4;
const maxSwitchCases = 6;

export const baseConfig = {
    languageOptions: {
        ecmaVersion,
        sourceType: 'module',
        parserOptions: {
            ecmaVersion,
            ecmaFeatures: {
                jsx: false,
                globalReturn: false,
                impliedStrict: false
            }
        }
    },
    linterOptions: {
        noInlineConfig: false,
        reportUnusedDisableDirectives: true
    },
    plugins: {
        unicorn: unicornPlugin,
        promise: promisePlugin,
        import: importPlugin,
        'eslint-comments': eslintCommentsPlugin,
        'no-secrets': noSecretsPlugin,
        'array-func': arrayFunctionPlugin,
        sonarjs: sonarjsPlugin,
        prettier: prettierPlugin
    },
    settings: {
        'import/parsers': {
            espree: ['.js', '.cjs', '.mjs', '.jsx']
        }
    },
    rules: {
        'array-callback-return': 'error',
        'no-array-constructor': 'error',
        'no-bitwise': 'error',
        'no-caller': 'error',
        'no-case-declarations': 'error',
        'no-class-assign': 'error',
        'no-cond-assign': 'error',
        'no-confusing-arrow': 'error',
        'no-console': 'error',
        'no-const-assign': 'error',
        'no-constant-condition': 'error',
        'no-continue': 'error',
        'no-control-regex': 'error',
        'no-debugger': 'error',
        'no-delete-var': 'error',
        'no-div-regex': 'error',
        'no-dupe-class-members': 'error',
        'no-dupe-keys': 'error',
        'no-dupe-args': 'error',
        'no-duplicate-case': 'error',
        'no-duplicate-imports': 'error',
        'no-else-return': ['error', { allowElseIf: false }],
        'no-empty': ['error', { allowEmptyCatch: true }],
        'no-empty-character-class': 'error',
        'no-empty-function': 'off',
        'no-empty-pattern': 'error',
        'no-empty-static-block': 'error',
        'no-eq-null': 'error',
        'no-eval': 'error',
        'no-ex-assign': 'error',
        'no-extend-native': 'error',
        'no-extra-bind': 'error',
        'no-extra-boolean-cast': 'error',
        'no-extra-label': 'error',
        'no-extra-parens': 'error',
        'no-extra-semi': 'error',
        'no-fallthrough': 'error',
        'no-floating-decimal': 'error',
        'no-func-assign': 'error',
        'no-implicit-coercion': 'error',
        'no-implicit-globals': 'error',
        'no-implied-eval': 'error',
        'no-inline-comments': 'off',
        'no-inner-declarations': ['error', 'functions'],
        'no-invalid-regexp': 'error',
        'no-invalid-this': 'off',
        'no-irregular-whitespace': 'error',
        'no-iterator': 'error',
        'no-label-var': 'error',
        'no-labels': 'error',
        'no-lone-blocks': 'error',
        'no-lonely-if': 'error',
        'no-loop-func': 'error',
        'no-mixed-spaces-and-tabs': 'error',
        'no-new-native-nonconstructor': 'error',
        'linebreak-style': ['error', 'unix'],
        'no-multi-spaces': 'error',
        'no-multi-str': 'error',
        'no-multiple-empty-lines': ['error', { max: 1 }],
        'no-global-assign': 'error',
        'no-negated-condition': 'off',
        'no-nested-ternary': 'error',
        'no-new': 'error',
        'no-new-func': 'error',
        'no-new-object': 'error',
        'no-new-symbol': 'error',
        'no-new-wrappers': 'error',
        'no-obj-calls': 'error',
        'no-octal': 'error',
        'no-octal-escape': 'error',
        'no-param-reassign': ['error', { props: true }],
        'no-plusplus': 'error',
        'no-proto': 'error',
        'no-prototype-builtins': 'error',
        'no-redeclare': ['error', { builtinGlobals: true }],
        'no-regex-spaces': 'error',
        'no-restricted-syntax': 'off',
        'no-return-assign': ['error', 'always'],
        'no-self-assign': ['error', { props: true }],
        'no-self-compare': 'error',
        'no-sequences': 'error',
        'no-shadow': ['error', { builtinGlobals: true }],
        'no-shadow-restricted-names': 'error',
        'no-sparse-arrays': 'error',
        'no-tabs': 'error',
        'no-ternary': 'off',
        'no-trailing-spaces': 'error',
        'no-this-before-super': 'error',
        'no-throw-literal': 'error',
        'no-undef': ['error', { typeof: true }],
        'no-undef-init': 'error',
        'no-undefined': 'off',
        'no-unexpected-multiline': 'error',
        'no-underscore-dangle': 'error',
        'no-unmodified-loop-condition': 'error',
        'no-unneeded-ternary': 'error',
        'no-unreachable': 'error',
        'no-unsafe-finally': 'error',
        'no-unused-expressions': 'error',
        'no-unused-labels': 'error',
        'no-unused-vars': [
            'error',
            {
                vars: 'all',
                args: 'after-used',
                ignoreRestSiblings: true,
                argsIgnorePattern: '^_$',
                caughtErrors: 'all',
                caughtErrorsIgnorePattern: '^_$'
            }
        ],
        'no-use-before-define': 'error',
        'no-useless-call': 'error',
        'no-useless-computed-key': 'error',
        'no-useless-concat': 'error',
        'no-useless-constructor': 'error',
        'no-useless-escape': 'error',
        'no-useless-rename': 'error',
        'no-whitespace-before-property': 'error',
        'no-void': 'error',
        'prefer-const': [
            'error',
            {
                destructuring: 'all'
            }
        ],
        'prefer-spread': 'error',
        'prefer-template': 'error',
        'no-var': 'error',
        'no-warning-comments': [
            'error',
            {
                terms: ['todo', 'fixme', 'wtf', 'falls through', 'istanbul', 'c8'],
                location: 'anywhere'
            }
        ],
        'no-with': 'error',
        'no-magic-numbers': [
            'error',
            {
                ignoreDefaultValues: true,
                ignoreArrayIndexes: false,
                detectObjects: false,
                enforceConst: false,
                ignoreClassFieldInitialValues: false,
                ignore: [-1, 0, 1]
            }
        ],
        'no-mixed-operators': 'off',
        'array-bracket-spacing': ['error', 'never'],
        'array-bracket-newline': ['error', 'consistent'],
        'array-element-newline': ['error', 'consistent'],
        'arrow-body-style': ['error', 'always'],
        'arrow-parens': ['error', 'always'],
        'arrow-spacing': [
            'error',
            {
                before: true,
                after: true
            }
        ],
        'accessor-pairs': [
            'error',
            {
                enforceForClassMembers: true
            }
        ],
        'block-scoped-var': 'off',
        'block-spacing': 'off',
        'brace-style': ['error', '1tbs', { allowSingleLine: false }],
        camelcase: 'error',
        'comma-dangle': ['error', 'never'],
        'comma-spacing': [
            'error',
            {
                before: false,
                after: true
            }
        ],
        'comma-style': ['error', 'last'],
        complexity: ['error', { max: 6 }],
        'computed-property-spacing': [
            'error',
            'never',
            {
                enforceForClassMembers: true
            }
        ],
        'consistent-return': 'error',
        'consistent-this': ['error', 'self'],
        'constructor-super': 'error',
        'generator-star-spacing': ['error', { before: false, after: true }],
        curly: ['error', 'all'],
        'default-case': 'error',
        'dot-location': ['error', 'property'],
        'dot-notation': 'error',
        'eol-last': 'error',
        eqeqeq: 'error',
        'func-names': 'off',
        'func-style': 'off',
        'guard-for-in': 'error',
        'id-length': ['error', { min: 2, properties: 'never' }],
        indent: [
            'error',
            indentSize,
            {
                SwitchCase: 1,
                VariableDeclarator: 1,
                MemberExpression: 1
            }
        ],
        'init-declarations': ['error', 'always'],
        'jsx-quotes': 'off',
        'key-spacing': [
            'error',
            {
                beforeColon: false,
                afterColon: true
            }
        ],
        'lines-around-comment': 'off',
        'max-depth': ['error', { max: 5 }],
        'max-lines': ['error', { max: 500, skipBlankLines: true, skipComments: false }],
        'max-nested-callbacks': ['error', { max: 4 }],
        'max-params': ['error', { max: 4 }],
        'max-statements': ['error', { max: 10 }],
        'multiline-ternary': 'off',
        'max-statements-per-line': ['error', { max: 1 }],
        'new-cap': [
            'error',
            {
                newIsCap: true,
                capIsNew: true
            }
        ],
        'new-parens': 'error',
        'newline-per-chained-call': 'off',
        'object-curly-newline': 'off',
        'object-curly-spacing': ['error', 'always'],
        'object-property-newline': 'off',
        'object-shorthand': ['error', 'always'],
        'one-var': ['error', 'never'],
        'one-var-declaration-per-line': 'error',
        'operator-assignment': ['error', 'always'],
        'operator-linebreak': ['error', 'after', { overrides: { '?': 'before', ':': 'before' } }],
        'padded-blocks': [
            'error',
            'never',
            {
                allowSingleLineBlocks: false
            }
        ],
        'prefer-arrow-callback': [
            'error',
            {
                allowNamedFunctions: true
            }
        ],
        'prefer-rest-params': 'error',
        'quote-props': ['error', 'as-needed'],
        quotes: ['error', 'single', { avoidEscape: true }],
        radix: 'error',
        'id-match': 'off',
        'require-yield': 'error',
        'rest-spread-spacing': ['error', 'never'],
        semi: ['error', 'always'],
        'semi-spacing': [
            'error',
            {
                before: false,
                after: true
            }
        ],
        'sort-vars': 'off',
        'keyword-spacing': [
            'error',
            {
                before: true,
                after: true
            }
        ],
        'space-before-blocks': ['error', 'always'],
        'space-before-function-paren': [
            'error',
            {
                anonymous: 'always',
                named: 'never',
                asyncArrow: 'always'
            }
        ],
        'space-in-parens': ['error', 'never'],
        'space-infix-ops': 'error',
        'space-unary-ops': 'error',
        'spaced-comment': [
            'error',
            'always',
            {
                line: {
                    exceptions: ['-', '+', '*'],
                    markers: ['!', '/', '=>']
                },
                block: {
                    exceptions: ['-', '+', '*'],
                    markers: ['!', '*'],
                    balanced: true
                }
            }
        ],
        'sort-imports': 'off',
        strict: ['error', 'safe'],
        'template-curly-spacing': 'error',
        'unicode-bom': ['error', 'never'],
        'use-isnan': 'error',
        'valid-typeof': 'error',
        'vars-on-top': 'error',
        'wrap-iife': ['error', 'inside'],
        'wrap-regex': 'off',
        'yield-star-spacing': ['error', { before: false, after: true }],
        yoda: ['error', 'never'],
        'capitalized-comments': 'off',
        'class-methods-use-this': 'error',
        'func-call-spacing': ['error', 'never'],
        'func-name-matching': 'off',
        'line-comment-position': 'off',
        'no-await-in-loop': 'off',
        'no-compare-neg-zero': 'error',
        'no-multi-assign': 'error',
        'no-restricted-properties': 'off',
        'no-template-curly-in-string': 'error',
        'no-unsafe-negation': 'error',
        'no-useless-return': 'error',
        'nonblock-statement-body-position': 'off',
        'prefer-destructuring': [
            'error',
            {
                VariableDeclarator: {
                    array: false,
                    object: true
                },
                AssignmentExpression: {
                    array: false,
                    object: false
                }
            },
            {
                enforceForRenamedProperties: false
            }
        ],
        'prefer-numeric-literals': 'error',
        'prefer-promise-reject-errors': [
            'error',
            {
                allowEmptyReject: false
            }
        ],
        'require-await': 'off',
        'sort-keys': 'off',
        'symbol-description': 'error',
        'template-tag-spacing': ['error', 'never'],
        'for-direction': 'off',
        'padding-line-between-statements': [
            'error',
            {
                blankLine: 'always',
                prev: 'directive',
                next: '*'
            },
            {
                blankLine: 'any',
                prev: 'directive',
                next: 'directive'
            }
        ],
        'semi-style': ['error', 'last'],
        'switch-colon-spacing': [
            'error',
            {
                after: true,
                before: false
            }
        ],
        'function-paren-newline': 'off',
        'getter-return': [
            'error',
            {
                allowImplicit: false
            }
        ],
        'implicit-arrow-linebreak': 'off',
        'lines-between-class-members': [
            'error',
            'always',
            {
                exceptAfterSingleLine: true
            }
        ],
        'multiline-comment-style': 'off',
        'max-classes-per-file': 'off',
        'max-lines-per-function': ['error', { max: 20 }],
        'prefer-object-spread': 'error',
        'no-async-promise-executor': 'error',
        'no-misleading-character-class': 'error',
        'default-param-last': 'error',
        'prefer-regex-literals': 'error',
        'require-unicode-regexp': 'off',
        'function-call-argument-newline': ['error', 'consistent'],
        'no-useless-catch': 'error',
        'prefer-named-capture-group': 'error',
        'no-import-assign': 'error',
        'require-atomic-updates': 'error',

        'no-restricted-imports': 'off',

        'no-alert': 'off',
        'no-script-url': 'off',
        'no-restricted-globals': 'off',
        'max-len': [
            'error',
            {
                code: 120,
                tabWidth: indentSize,
                ignoreComments: true,
                ignoreTrailingComments: true,
                ignoreUrls: true,
                ignoreStrings: false,
                ignoreTemplateLiterals: false,
                ignoreRegExpLiterals: true
            }
        ],

        'grouped-accessor-pairs': 'off',
        'no-constructor-return': 'error',
        'no-dupe-else-if': 'error',
        'no-setter-return': 'error',
        'prefer-exponentiation-operator': 'error',

        'default-case-last': 'error',
        'no-restricted-exports': 'off',
        'no-useless-backreference': 'error',
        'id-denylist': 'off',
        'no-loss-of-precision': 'off',
        'no-promise-executor-return': 'error',
        'no-unreachable-loop': 'error',
        'no-nonoctal-decimal-escape': 'error',
        'no-unsafe-optional-chaining': 'error',
        'no-unused-private-class-members': 'error',
        'no-constant-binary-expression': 'error',
        'logical-assignment-operators': ['error', 'never'],
        'prefer-object-has-own': 'error',

        'no-secrets/no-secrets': ['error', { tolerance: 5 }],

        'promise/avoid-new': 'off',
        'promise/no-nesting': 'error',
        'promise/no-promise-in-callback': 'error',
        'promise/no-callback-in-promise': 'error',
        'promise/no-native': 'off',
        'promise/prefer-await-to-callbacks': 'off',
        'promise/catch-or-return': 'error',
        'promise/always-return': 'off',
        'promise/param-names': 'error',
        'promise/no-return-wrap': [
            'error',
            {
                allowReject: true
            }
        ],
        'promise/no-new-statics': 'error',
        'promise/no-return-in-finally': 'error',
        'promise/valid-params': 'error',
        'promise/prefer-await-to-then': 'error',
        'promise/no-multiple-resolved': 'error',

        'eslint-comments/disable-enable-pair': [
            'error',
            {
                allowWholeFile: true
            }
        ],
        'eslint-comments/no-aggregating-enable': 'error',
        'eslint-comments/no-duplicate-disable': 'error',
        'eslint-comments/no-unused-disable': 'error',
        'eslint-comments/no-unused-enable': 'error',
        'eslint-comments/no-restricted-disable': 'off',
        'eslint-comments/no-unlimited-disable': 'error',
        'eslint-comments/no-use': 'off',
        'eslint-comments/require-description': 'error',

        'import/no-deprecated': 'error',
        'import/exports-last': 'off',
        'import/dynamic-import-chunkname': 'off',
        'import/unambiguous': 'off',
        'import/no-dynamic-require': 'error',
        'import/no-named-export': 'off',
        'import/no-default-export': 'error',
        'import/prefer-default-export': 'off',
        'import/newline-after-import': 'error',
        'import/no-nodejs-modules': 'off',
        'import/max-dependencies': ['error', { max: 8 }],
        'import/first': 'error',
        'import/no-unused-modules': 'error',
        'import/no-anonymous-default-export': 'off',
        'import/no-named-default': 'off',
        'import/no-cycle': 'error',
        'import/no-relative-parent-imports': 'off',
        'import/group-exports': 'off',
        'import/no-internal-modules': 'off',
        'import/no-restricted-paths': 'off',
        'import/named': 'off',
        'import/no-namespace': 'off',
        'import/default': 'error',
        'import/export': 'error',
        'import/extensions': [
            'error',
            {
                js: 'always',
                jsx: 'always',
                json: 'always'
            }
        ],
        'import/namespace': [
            'error',
            {
                allowComputed: true
            }
        ],
        'import/no-absolute-path': 'error',
        'import/no-webpack-loader-syntax': 'error',
        'import/no-self-import': 'error',
        'import/no-useless-path-segments': [
            'error',
            {
                noUselessIndex: true
            }
        ],
        'import/no-amd': 'error',
        'import/no-commonjs': 'error',
        'import/no-duplicates': 'error',
        'import/no-extraneous-dependencies': 'error',
        'import/no-mutable-exports': 'error',
        'import/no-named-as-default-member': 'error',
        'import/no-named-as-default': 'error',
        'import/order': 'error',
        'import/no-unassigned-import': [
            'error',
            {
                allow: []
            }
        ],
        'import/no-unresolved': ['error'],
        'import/no-relative-packages': 'off',
        'import/no-import-module-exports': 'off',
        'import/no-empty-named-blocks': 'error',
        'import/consistent-type-specifier-style': 'off',

        'unicorn/string-content': 'off',
        'unicorn/prefer-string-trim-start-end': 'error',
        'unicorn/prefer-set-has': 'error',
        'unicorn/prefer-string-replace-all': 'error',
        'unicorn/prefer-number-properties': 'error',
        'unicorn/prefer-negative-index': 'error',
        'unicorn/prefer-modern-dom-apis': 'off',
        'unicorn/no-null': 'off',
        'unicorn/catch-error-name': 'error',
        'unicorn/consistent-function-scoping': 'off',
        'unicorn/custom-error-definition': 'off',
        'unicorn/error-message': 'error',
        'unicorn/escape-case': 'error',
        'unicorn/expiring-todo-comments': 'error',
        'unicorn/explicit-length-check': 'error',
        'unicorn/no-useless-length-check': 'error',
        'unicorn/filename-case': 'off',
        'unicorn/new-for-builtins': 'error',
        'unicorn/no-abusive-eslint-disable': 'error',
        'unicorn/no-instanceof-array': 'error',
        'unicorn/no-console-spaces': 'error',
        'unicorn/no-array-callback-reference': 'off',
        'unicorn/no-for-loop': 'error',
        'unicorn/no-hex-escape': 'error',
        'unicorn/no-keyword-prefix': 'off',
        'unicorn/no-nested-ternary': 'off',
        'unicorn/no-new-buffer': 'error',
        'unicorn/no-process-exit': 'error',
        'unicorn/no-unreadable-array-destructuring': 'error',
        'unicorn/no-unused-properties': 'off',
        'unicorn/no-zero-fractions': 'error',
        'unicorn/number-literal-case': 'error',
        'unicorn/prefer-add-event-listener': 'error',
        'unicorn/prefer-dom-node-dataset': 'error',
        'unicorn/prefer-keyboard-event-key': 'error',
        'unicorn/prefer-array-flat-map': 'error',
        'unicorn/prefer-includes': 'error',
        'unicorn/prefer-dom-node-append': 'error',
        'unicorn/prefer-dom-node-remove': 'error',
        'unicorn/prefer-query-selector': 'error',
        'unicorn/prefer-reflect-apply': 'error',
        'unicorn/prefer-spread': 'off',
        'unicorn/prefer-string-starts-ends-with': 'error',
        'unicorn/prefer-string-slice': 'error',
        'unicorn/prefer-dom-node-text-content': 'error',
        'unicorn/prefer-type-error': 'error',
        'unicorn/prevent-abbreviations': 'off',
        'unicorn/better-regex': 'error',
        'unicorn/throw-new-error': 'error',
        'unicorn/no-array-reduce': 'off',
        'unicorn/no-useless-undefined': 'off',
        'unicorn/prefer-optional-catch-binding': 'error',
        'unicorn/no-object-as-default-parameter': 'off',
        'unicorn/prefer-array-find': 'error',
        'unicorn/import-style': 'off',
        'unicorn/numeric-separators-style': 'error',
        'unicorn/prefer-math-trunc': 'error',
        'unicorn/prefer-ternary': 'error',
        'unicorn/prefer-array-some': 'error',
        'unicorn/prefer-default-parameters': 'error',
        'unicorn/no-lonely-if': 'error',
        'unicorn/empty-brace-spaces': 'off',
        'unicorn/prefer-date-now': 'error',
        'unicorn/consistent-destructuring': 'off',
        'unicorn/no-array-for-each': 'off',
        'unicorn/no-array-push-push': 'error',
        'unicorn/no-new-array': 'error',
        'unicorn/no-this-assignment': 'error',
        'unicorn/prefer-array-index-of': 'error',
        'unicorn/prefer-regexp-test': 'error',
        'unicorn/no-static-only-class': 'error',
        'unicorn/prefer-array-flat': 'error',
        'unicorn/prefer-module': 'off',
        'unicorn/prefer-node-protocol': 'error',
        'unicorn/prefer-switch': 'off',
        'unicorn/no-document-cookie': 'off',
        'unicorn/require-array-join-separator': 'off',
        'unicorn/require-number-to-fixed-digits-argument': 'off',
        'unicorn/prefer-prototype-methods': 'off',
        'unicorn/no-array-method-this-argument': 'off',
        'unicorn/require-post-message-target-origin': 'error',
        'unicorn/no-useless-spread': 'error',
        'unicorn/prefer-object-from-entries': 'error',
        'unicorn/no-useless-fallback-in-spread': 'error',
        'unicorn/no-invalid-remove-event-listener': 'off',
        'unicorn/template-indent': 'error',
        'unicorn/no-empty-file': 'error',
        'unicorn/prefer-export-from': 'error',
        'unicorn/no-await-expression-member': 'error',
        'unicorn/prefer-code-point': 'error',
        'unicorn/no-thenable': 'off',
        'unicorn/no-useless-promise-resolve-reject': 'error',
        'unicorn/prefer-json-parse-buffer': 'off',
        'unicorn/relative-url-style': 'off',
        'unicorn/text-encoding-identifier-case': 'off',
        'unicorn/no-useless-switch-case': 'error',
        'unicorn/prefer-modern-math-apis': 'error',
        'unicorn/no-unreadable-iife': 'error',
        'unicorn/prefer-native-coercion-functions': 'error',
        'unicorn/prefer-event-target': 'off',
        'unicorn/prefer-logical-operator-over-ternary': 'off',
        'unicorn/no-unnecessary-await': 'error',
        'unicorn/switch-case-braces': 'off',
        'unicorn/no-negated-condition': 'error',
        'unicorn/no-typeof-undefined': 'error',
        'unicorn/prefer-set-size': 'error',
        'unicorn/prefer-blob-reading-methods': 'error',
        'unicorn/prefer-top-level-await': 'off',
        'unicorn/prefer-at': 'error',

        'array-func/from-map': 'error',
        'array-func/no-unnecessary-this-arg': 'error',
        'array-func/prefer-array-from': 'error',
        'array-func/avoid-reverse': 'error',
        'array-func/prefer-flat-map': 'error',
        'array-func/prefer-flat': 'error',

        'sonarjs/cognitive-complexity': 'off',
        'sonarjs/elseif-without-else': 'off',
        'sonarjs/max-switch-cases': ['error', maxSwitchCases],
        'sonarjs/no-all-duplicated-branches': 'error',
        'sonarjs/no-collapsible-if': 'error',
        'sonarjs/no-collection-size-mischeck': 'error',
        'sonarjs/no-duplicate-string': 'off',
        'sonarjs/no-duplicated-branches': 'error',
        'sonarjs/no-element-overwrite': 'error',
        'sonarjs/no-empty-collection': 'error',
        'sonarjs/no-extra-arguments': 'off',
        'sonarjs/no-gratuitous-expressions': 'error',
        'sonarjs/no-identical-conditions': 'error',
        'sonarjs/no-identical-expressions': 'error',
        'sonarjs/no-identical-functions': 'error',
        'sonarjs/no-ignored-return': 'error',
        'sonarjs/no-inverted-boolean-check': 'error',
        'sonarjs/no-nested-switch': 'error',
        'sonarjs/no-nested-template-literals': 'error',
        'sonarjs/no-one-iteration-loop': 'error',
        'sonarjs/no-redundant-boolean': 'off',
        'sonarjs/no-redundant-jump': 'off',
        'sonarjs/no-same-line-conditional': 'error',
        'sonarjs/no-small-switch': 'error',
        'sonarjs/no-unused-collection': 'error',
        'sonarjs/no-use-of-empty-return-value': 'error',
        'sonarjs/no-useless-catch': 'error',
        'sonarjs/non-existent-operator': 'error',
        'sonarjs/prefer-immediate-return': 'off',
        'sonarjs/prefer-object-literal': 'error',
        'sonarjs/prefer-single-boolean-return': 'error',
        'sonarjs/prefer-while': 'error',

        'prettier/prettier': 'error'
    }
};
