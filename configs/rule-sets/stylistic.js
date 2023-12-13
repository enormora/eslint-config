import prettierPlugin from 'eslint-plugin-prettier';
import destructuringPlugin from 'eslint-plugin-destructuring';
import stylisticPlugin from '@stylistic/eslint-plugin';
import { indentSize } from '../constants.js';

export const stylisticRuleSet = {
    plugins: {
        prettier: prettierPlugin,
        destructuring: destructuringPlugin,
        '@stylistic': stylisticPlugin
    },

    settings: {},

    rules: {
        'prettier/prettier': 'error',

        'destructuring/in-methods-params': 'error',
        'destructuring/in-params': ['error', { 'max-params': 0 }],
        'destructuring/no-rename': 'off',

        '@stylistic/array-bracket-newline': ['error', 'consistent'],
        '@stylistic/array-bracket-spacing': ['error', 'never'],
        '@stylistic/array-element-newline': ['error', 'consistent'],
        '@stylistic/arrow-parens': ['error', 'always'],
        '@stylistic/arrow-spacing': [
            'error',
            {
                before: true,
                after: true
            }
        ],
        '@stylistic/block-spacing': 'off',
        '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: false }],
        '@stylistic/comma-dangle': ['error', 'never'],
        '@stylistic/comma-spacing': [
            'error',
            {
                before: false,
                after: true
            }
        ],
        '@stylistic/comma-style': ['error', 'last'],
        '@stylistic/computed-property-spacing': [
            'error',
            'never',
            {
                enforceForClassMembers: true
            }
        ],
        '@stylistic/dot-location': ['error', 'property'],
        '@stylistic/eol-last': 'error',
        '@stylistic/func-call-spacing': ['error', 'never'],
        '@stylistic/function-call-spacing': ['error', 'never'],
        '@stylistic/function-call-argument-newline': ['error', 'consistent'],
        '@stylistic/function-paren-newline': 'off',
        '@stylistic/generator-star-spacing': ['error', { before: false, after: true }],
        '@stylistic/indent-binary-ops': ['error', indentSize],
        '@stylistic/implicit-arrow-linebreak': 'off',
        '@stylistic/indent': [
            'error',
            indentSize,
            {
                SwitchCase: 1,
                VariableDeclarator: 1,
                MemberExpression: 1
            }
        ],
        '@stylistic/jsx-child-element-spacing': 'off',
        '@stylistic/jsx-closing-bracket-location': 'off',
        '@stylistic/jsx-closing-tag-location': 'off',
        '@stylistic/jsx-curly-brace-presence': 'off',
        '@stylistic/jsx-curly-newline': 'off',
        '@stylistic/jsx-curly-spacing': 'off',
        '@stylistic/jsx-equals-spacing': 'off',
        '@stylistic/jsx-first-prop-new-line': 'off',
        '@stylistic/jsx-indent': 'off',
        '@stylistic/jsx-indent-props': 'off',
        '@stylistic/jsx-max-props-per-line': 'off',
        '@stylistic/jsx-newline': 'off',
        '@stylistic/jsx-one-expression-per-line': 'off',
        '@stylistic/jsx-props-no-multi-spaces': 'off',
        '@stylistic/jsx-self-closing-comp': 'off',
        '@stylistic/jsx-sort-props': 'off',
        '@stylistic/jsx-tag-spacing': 'off',
        '@stylistic/jsx-quotes': 'off',
        '@stylistic/jsx-wrap-multilines': 'off',
        '@stylistic/key-spacing': [
            'error',
            {
                beforeColon: false,
                afterColon: true
            }
        ],
        '@stylistic/keyword-spacing': [
            'error',
            {
                before: true,
                after: true
            }
        ],
        '@stylistic/linebreak-style': ['error', 'unix'],
        '@stylistic/lines-between-class-members': [
            'error',
            'always',
            {
                exceptAfterSingleLine: true
            }
        ],
        '@stylistic/lines-around-comment': 'off',
        '@stylistic/max-len': [
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
        '@stylistic/max-statements-per-line': ['error', { max: 1 }],
        '@stylistic/member-delimiter-style': [
            'error',
            {
                multiline: {
                    delimiter: 'semi',
                    requireLast: true
                },
                singleline: {
                    delimiter: 'semi',
                    requireLast: false
                }
            }
        ],
        '@stylistic/multiline-ternary': 'off',
        '@stylistic/new-parens': 'error',
        '@stylistic/newline-per-chained-call': 'off',
        '@stylistic/no-confusing-arrow': 'error',
        // Currently this rule conflicts with prettier, because in some cases prettier adds unnecessary extra parens. Unfortunately there is no way to turn this off yet. We should re-enable this rule once this has been fixed in prettier or once there is a better formatter that doesn’t add unnecessary parens. See https://github.com/prettier/prettier/issues/3089
        '@stylistic/no-extra-parens': 'off',
        '@stylistic/no-extra-semi': 'error',
        '@stylistic/no-floating-decimal': 'error',
        '@stylistic/no-mixed-operators': 'off',
        '@stylistic/no-mixed-spaces-and-tabs': 'error',
        '@stylistic/no-multi-spaces': 'error',
        '@stylistic/no-multiple-empty-lines': ['error', { max: 1 }],
        '@stylistic/no-tabs': 'error',
        '@stylistic/no-trailing-spaces': 'error',
        '@stylistic/no-whitespace-before-property': 'error',
        '@stylistic/nonblock-statement-body-position': 'off',
        '@stylistic/object-curly-newline': 'off',
        '@stylistic/object-curly-spacing': ['error', 'always'],
        '@stylistic/object-property-newline': 'off',
        '@stylistic/one-var-declaration-per-line': 'error',
        '@stylistic/operator-linebreak': ['error', 'after', { overrides: { '?': 'before', ':': 'before' } }],
        '@stylistic/padded-blocks': [
            'error',
            'never',
            {
                allowSingleLineBlocks: false
            }
        ],
        '@stylistic/padding-line-between-statements': [
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
        '@stylistic/quote-props': ['error', 'as-needed'],
        '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
        '@stylistic/rest-spread-spacing': ['error', 'never'],
        '@stylistic/semi': ['error', 'always'],
        '@stylistic/semi-spacing': [
            'error',
            {
                before: false,
                after: true
            }
        ],
        '@stylistic/semi-style': ['error', 'last'],
        '@stylistic/space-before-blocks': ['error', 'always'],
        '@stylistic/space-before-function-paren': [
            'error',
            {
                anonymous: 'always',
                named: 'never',
                asyncArrow: 'always'
            }
        ],
        '@stylistic/space-in-parens': ['error', 'never'],
        '@stylistic/space-infix-ops': 'error',
        '@stylistic/space-unary-ops': 'error',
        '@stylistic/spaced-comment': [
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
        '@stylistic/switch-colon-spacing': [
            'error',
            {
                after: true,
                before: false
            }
        ],
        '@stylistic/template-curly-spacing': 'error',
        '@stylistic/template-tag-spacing': ['error', 'never'],
        '@stylistic/type-annotation-spacing': 'error',
        '@stylistic/type-generic-spacing': 'error',
        '@stylistic/type-named-tuple-spacing': 'error',
        '@stylistic/wrap-iife': ['error', 'inside'],
        '@stylistic/wrap-regex': 'off',
        '@stylistic/yield-star-spacing': ['error', { before: false, after: true }]
    }
};
