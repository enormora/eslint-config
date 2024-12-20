import unicornPlugin from 'eslint-plugin-unicorn';
import promisePlugin from 'eslint-plugin-promise';
import arrayFunctionPlugin from 'eslint-plugin-array-func';
import sonarjsPlugin from 'eslint-plugin-sonarjs';

const maxSwitchCases = 6;

export const bestPracticesRuleSet = {
    plugins: {
        unicorn: unicornPlugin,
        promise: promisePlugin,
        'array-func': arrayFunctionPlugin,
        sonarjs: sonarjsPlugin
    },
    settings: {},
    rules: {
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
        'unicorn/no-unnecessary-polyfills': 'off',
        'unicorn/no-single-promise-in-promise-methods': 'error',
        'unicorn/no-await-in-promise-methods': 'error',
        'unicorn/no-anonymous-default-export': 'error',
        'unicorn/consistent-empty-array-spread': 'error',
        'unicorn/no-invalid-fetch-options': 'error',
        'unicorn/no-length-as-slice-end': 'error',
        'unicorn/no-magic-array-flat-depth': 'error',
        'unicorn/no-negation-in-equality-check': 'error',
        'unicorn/prefer-string-raw': 'off',
        'unicorn/prefer-structured-clone': 'error',
        'unicorn/consistent-existence-index-check': 'error',
        'unicorn/prefer-global-this': 'error',
        'unicorn/prefer-math-min-max': 'error',

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
        'promise/spec-only': 'error'
    }
};
