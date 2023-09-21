import importPlugin from 'eslint-plugin-import';
import eslintCommentsPlugin from 'eslint-plugin-eslint-comments';
import noSecretsPlugin from 'eslint-plugin-no-secrets';
import { stylisticRuleSet } from './rule-sets/stylistic.js';
import { bestPracticesRuleSet } from './rule-sets/best-practices.js';
import { ecmaVersion, indentSize, javascriptExtensions } from './constants.js';

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
        ...stylisticRuleSet.plugins,
        ...bestPracticesRuleSet.plugins,
        import: importPlugin,
        'eslint-comments': eslintCommentsPlugin,
        'no-secrets': noSecretsPlugin
    },
    settings: {
        ...stylisticRuleSet.settings,
        ...bestPracticesRuleSet.settings,
        'import/parsers': {
            espree: javascriptExtensions
        }
    },
    rules: {
        ...stylisticRuleSet.rules,
        ...bestPracticesRuleSet.rules,

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
        'max-lines-per-function': ['error', { max: 50 }],
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
        // this rule doesn’t work correctly for ESM modules which use the exports field in package.json instead of main, see also https://github.com/import-js/eslint-plugin-import/issues/2703
        'import/no-unresolved': 'off',
        'import/no-relative-packages': 'off',
        'import/no-import-module-exports': 'off',
        'import/no-empty-named-blocks': 'error',
        'import/consistent-type-specifier-style': 'off'
    }
};
