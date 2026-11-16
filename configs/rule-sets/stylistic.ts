import stylisticPlugin from '@stylistic/eslint-plugin';
import destructuringPlugin from 'eslint-plugin-destructuring';
import { indentSize } from '../constants.ts';
import { disable } from '../rule-severity.ts';

export const stylisticRuleSet = {
    plugins: {
        destructuring: destructuringPlugin,
        '@stylistic': stylisticPlugin
    },

    settings: {},

    rules: {
        'destructuring/in-methods-params': 'error',
        'destructuring/in-params': [ 'error', { 'max-params': 0 } ],
        'destructuring/no-rename': disable<'Destructured bindings may be renamed to express their local role'>(),

        '@stylistic/array-bracket-newline': disable<'Layout is handled by the active formatter'>(),
        '@stylistic/array-bracket-spacing': [ 'error', 'always' ],
        '@stylistic/array-element-newline': [ 'error', 'consistent' ],
        '@stylistic/arrow-parens': [ 'error', 'always' ],
        '@stylistic/arrow-spacing': [
            'error',
            {
                before: true,
                after: true
            }
        ],
        '@stylistic/block-spacing': disable<'Layout is handled by the active formatter'>(),
        '@stylistic/brace-style': [ 'error', '1tbs', { allowSingleLine: false } ],
        '@stylistic/comma-dangle': [ 'error', 'never' ],
        '@stylistic/comma-spacing': [
            'error',
            {
                before: false,
                after: true
            }
        ],
        '@stylistic/comma-style': [ 'error', 'last' ],
        '@stylistic/computed-property-spacing': [
            'error',
            'never',
            {
                enforceForClassMembers: true
            }
        ],
        '@stylistic/dot-location': [ 'error', 'property' ],
        '@stylistic/eol-last': 'error',
        '@stylistic/exp-list-style': disable<'Experimental list layout rules are not part of the enforced style'>(),
        '@stylistic/exp-jsx-props-style': disable<
            'Experimental JSX prop layout rules are not part of the enforced style'
        >(),
        '@stylistic/function-call-spacing': [ 'error', 'never' ],
        '@stylistic/function-call-argument-newline': [ 'error', 'consistent' ],
        '@stylistic/function-paren-newline': disable<'Layout is handled by the active formatter'>(),
        '@stylistic/generator-star-spacing': [ 'error', { before: false, after: true } ],
        '@stylistic/indent-binary-ops': [ 'error', indentSize ],
        '@stylistic/implicit-arrow-linebreak': disable<'Layout is handled by the active formatter'>(),
        '@stylistic/indent': [
            'error',
            indentSize,
            {
                SwitchCase: 1,
                VariableDeclarator: 1,
                MemberExpression: 1
            }
        ],
        '@stylistic/jsx-child-element-spacing': disable<'Layout is handled by the active formatter'>(),
        '@stylistic/jsx-closing-bracket-location': disable<'Layout is handled by the active formatter'>(),
        '@stylistic/jsx-closing-tag-location': disable<'Layout is handled by the active formatter'>(),
        '@stylistic/jsx-curly-brace-presence': disable<'Layout is handled by the active formatter'>(),
        '@stylistic/jsx-curly-newline': disable<'Layout is handled by the active formatter'>(),
        '@stylistic/jsx-curly-spacing': disable<'Layout is handled by the active formatter'>(),
        '@stylistic/jsx-equals-spacing': disable<'Layout is handled by the active formatter'>(),
        '@stylistic/jsx-first-prop-new-line': disable<'Layout is handled by the active formatter'>(),
        '@stylistic/jsx-indent-props': disable<'Layout is handled by the active formatter'>(),
        '@stylistic/jsx-max-props-per-line': disable<'Layout is handled by the active formatter'>(),
        '@stylistic/jsx-newline': disable<'Layout is handled by the active formatter'>(),
        '@stylistic/jsx-one-expression-per-line': disable<'Layout is handled by the active formatter'>(),
        '@stylistic/jsx-self-closing-comp': disable<'Layout is handled by the active formatter'>(),
        '@stylistic/jsx-tag-spacing': disable<'Layout is handled by the active formatter'>(),
        '@stylistic/jsx-quotes': disable<'Layout is handled by the active formatter'>(),
        '@stylistic/jsx-wrap-multilines': disable<'Layout is handled by the active formatter'>(),
        '@stylistic/jsx-function-call-newline': disable<'Layout is handled by the active formatter'>(),
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
        '@stylistic/linebreak-style': [ 'error', 'unix' ],
        '@stylistic/lines-between-class-members': [
            'error',
            'always',
            {
                exceptAfterSingleLine: true
            }
        ],
        '@stylistic/lines-around-comment': disable<'Comments need not have surrounding blank lines'>(),
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
        '@stylistic/max-statements-per-line': [ 'error', { max: 1 } ],
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
        '@stylistic/multiline-ternary': disable<'Layout is handled by the active formatter'>(),
        '@stylistic/new-parens': 'error',
        '@stylistic/newline-per-chained-call': disable<'Layout is handled by the active formatter'>(),
        '@stylistic/no-confusing-arrow': 'error',
        '@stylistic/no-extra-parens': 'error',
        '@stylistic/no-extra-semi': 'error',
        '@stylistic/no-floating-decimal': 'error',
        '@stylistic/no-mixed-operators': disable<'Standard operator precedence is allowed without extra parentheses'>(),
        '@stylistic/no-mixed-spaces-and-tabs': 'error',
        '@stylistic/no-multi-spaces': 'error',
        '@stylistic/no-multiple-empty-lines': [ 'error', { max: 1 } ],
        '@stylistic/no-tabs': 'error',
        '@stylistic/no-trailing-spaces': 'error',
        '@stylistic/no-whitespace-before-property': 'error',
        '@stylistic/nonblock-statement-body-position': disable<'Block bodies are already required by curly'>(),
        '@stylistic/object-curly-newline': disable<'Layout is handled by the active formatter'>(),
        '@stylistic/object-curly-spacing': [ 'error', 'always' ],
        '@stylistic/object-property-newline': disable<'Layout is handled by the active formatter'>(),
        '@stylistic/one-var-declaration-per-line': 'error',
        '@stylistic/operator-linebreak': [ 'error', 'after', { overrides: { '?': 'before', ':': 'before' } } ],
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
        '@stylistic/quote-props': [ 'error', 'as-needed' ],
        '@stylistic/quotes': [ 'error', 'single', { avoidEscape: true } ],
        '@stylistic/rest-spread-spacing': [ 'error', 'never' ],
        '@stylistic/semi': [ 'error', 'always' ],
        '@stylistic/semi-spacing': [
            'error',
            {
                before: false,
                after: true
            }
        ],
        '@stylistic/semi-style': [ 'error', 'last' ],
        '@stylistic/space-before-blocks': [ 'error', 'always' ],
        '@stylistic/space-before-function-paren': [
            'error',
            {
                anonymous: 'always',
                named: 'never',
                asyncArrow: 'always'
            }
        ],
        '@stylistic/space-in-parens': [ 'error', 'never' ],
        '@stylistic/space-infix-ops': 'error',
        '@stylistic/space-unary-ops': 'error',
        '@stylistic/spaced-comment': [
            'error',
            'always',
            {
                line: {
                    exceptions: [ '-', '+', '*' ],
                    markers: [ '!', '/', '=>' ]
                },
                block: {
                    exceptions: [ '-', '+', '*' ],
                    markers: [ '!', '*' ],
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
        '@stylistic/curly-newline': disable<'Layout is handled by the active formatter'>(),
        '@stylistic/template-curly-spacing': 'error',
        '@stylistic/template-tag-spacing': [ 'error', 'never' ],
        '@stylistic/type-annotation-spacing': 'error',
        '@stylistic/type-generic-spacing': 'error',
        '@stylistic/type-named-tuple-spacing': 'error',
        '@stylistic/wrap-iife': [ 'error', 'inside' ],
        '@stylistic/wrap-regex': disable<'Regular expression literals need not have extra parentheses'>(),
        '@stylistic/yield-star-spacing': [ 'error', { before: false, after: true } ],
        '@stylistic/jsx-pascal-case': disable<'JSX component casing is configured by the JSX presets'>(),
        '@stylistic/line-comment-position': disable<'Comments may appear above or beside the code they explain'>(),
        '@stylistic/multiline-comment-style': disable<'Line and block comments are both allowed'>()
    }
};
