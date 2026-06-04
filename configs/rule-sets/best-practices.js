import arrayFunctionPlugin from 'eslint-plugin-array-func';
import noBarrelFiles from 'eslint-plugin-no-barrel-files';
import promisePlugin from 'eslint-plugin-promise';
import * as regexpPlugin from 'eslint-plugin-regexp';
import sonarjsPlugin from 'eslint-plugin-sonarjs';
import unicornPlugin from 'eslint-plugin-unicorn';

const maxSwitchCases = 6;

function isSonarjsRuleDeprecated(sonarjsRule) {
    return sonarjsRule.meta?.deprecated ?? false;
}

const nonDeprecatedSonarjsRuleNames = new Set(
    Object
        .entries(sonarjsPlugin.rules)
        .filter(([ , sonarjsRule ]) => {
            return !isSonarjsRuleDeprecated(sonarjsRule);
        })
        .map(([ sonarjsRuleName ]) => {
            return `sonarjs/${sonarjsRuleName}`;
        })
);

const nonDeprecatedSonarjsRecommendedRules = Object.fromEntries(
    Object.entries(sonarjsPlugin.configs.recommended.rules).filter(([ sonarjsRuleName ]) => {
        return nonDeprecatedSonarjsRuleNames.has(sonarjsRuleName);
    })
);

export const bestPracticesRuleSet = {
    plugins: {
        unicorn: unicornPlugin,
        promise: promisePlugin,
        'array-func': arrayFunctionPlugin,
        sonarjs: sonarjsPlugin,
        'no-barrel-files': noBarrelFiles,
        regexp: regexpPlugin
    },
    settings: {},
    rules: {
        'unicorn/string-content': 'off',
        'unicorn/consistent-template-literal-escape': 'error',
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
        'unicorn/no-immediate-mutation': 'error',
        'unicorn/new-for-builtins': 'error',
        'unicorn/no-abusive-eslint-disable': 'error',
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
        'unicorn/no-magic-array-flat-depth': 'error',
        'unicorn/no-negation-in-equality-check': 'error',
        'unicorn/prefer-string-raw': 'off',
        'unicorn/prefer-structured-clone': 'error',
        'unicorn/consistent-existence-index-check': 'error',
        'unicorn/prefer-global-this': 'error',
        'unicorn/prefer-math-min-max': 'error',
        'unicorn/consistent-assert': 'error',
        'unicorn/consistent-date-clone': 'error',
        'unicorn/no-accessor-recursion': 'error',
        'unicorn/no-array-reverse': 'error',
        'unicorn/no-array-sort': 'error',
        'unicorn/no-instanceof-builtins': 'error',
        'unicorn/no-named-default': 'error',
        'unicorn/no-unnecessary-array-flat-depth': 'error',
        'unicorn/no-unnecessary-array-splice-count': 'error',
        'unicorn/no-unnecessary-slice-end': 'error',
        'unicorn/no-useless-iterator-to-array': 'error',
        'unicorn/no-useless-error-capture-stack-trace': 'error',
        'unicorn/prefer-bigint-literals': 'error',
        'unicorn/prefer-class-fields': 'error',
        'unicorn/prefer-classlist-toggle': 'error',
        'unicorn/prefer-import-meta-properties': 'off',
        'unicorn/prefer-simple-condition-first': 'error',
        'unicorn/prefer-single-call': 'error',
        'unicorn/require-module-attributes': 'error',
        'unicorn/require-module-specifiers': 'error',
        'unicorn/no-useless-collection-argument': 'error',
        'unicorn/prefer-response-static-json': 'error',
        'unicorn/isolated-functions': 'off',
        'unicorn/switch-case-break-position': 'error',

        'array-func/from-map': 'error',
        'array-func/no-unnecessary-this-arg': 'error',
        'array-func/prefer-array-from': 'error',
        'array-func/avoid-reverse': 'error',
        'array-func/prefer-flat-map': 'error',
        'array-func/prefer-flat': 'error',

        ...nonDeprecatedSonarjsRecommendedRules,

        'sonarjs/cognitive-complexity': 'off',
        'sonarjs/elseif-without-else': 'off',
        'sonarjs/max-switch-cases': [ 'error', maxSwitchCases ],
        'sonarjs/no-all-duplicated-branches': 'error',
        'sonarjs/no-collapsible-if': 'error',
        'sonarjs/no-collection-size-mischeck': 'error',
        'sonarjs/no-clear-text-protocols': 'off',
        'sonarjs/no-duplicate-string': 'off',
        'sonarjs/no-duplicated-branches': 'error',
        'sonarjs/no-element-overwrite': 'error',
        'sonarjs/no-empty-collection': 'error',
        'sonarjs/no-extra-arguments': 'off',
        'sonarjs/function-name': 'off',
        'sonarjs/no-gratuitous-expressions': 'error',
        'sonarjs/no-identical-conditions': 'error',
        'sonarjs/no-identical-expressions': 'error',
        'sonarjs/no-identical-functions': 'error',
        'sonarjs/no-ignored-return': 'error',
        'sonarjs/no-inverted-boolean-check': 'error',
        'sonarjs/no-nested-switch': 'error',
        'sonarjs/no-nested-template-literals': 'error',
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
        // regexp/no-super-linear-backtracking subsumes this with a sound NFA-based analysis
        // (sonarjs is heuristic); see the regexp/* block below.
        'sonarjs/slow-regex': 'off',

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
        'promise/prefer-await-to-then': [ 'error', { strict: true } ],
        'promise/no-multiple-resolved': 'error',
        'promise/spec-only': 'error',
        'promise/prefer-catch': 'error',

        'no-barrel-files/no-barrel-files': 'error',

        // eslint-plugin-regexp — purely additive on top of core / unicorn / sonarjs regex coverage.
        // Rules with a working equivalent already in core, unicorn, or sonarjs are turned off here so
        // each diagnostic is reported by exactly one rule. The only swap is regexp/no-super-linear-backtracking
        // taking over from the (off-above) sonarjs/slow-regex.
        'regexp/confusing-quantifier': 'error',
        'regexp/control-character-escape': 'error',
        'regexp/match-any': 'error',
        'regexp/negation': 'error',
        'regexp/no-contradiction-with-assertion': 'error',
        'regexp/no-dupe-disjunctions': 'error',
        'regexp/no-empty-capturing-group': 'error',
        'regexp/no-empty-group': 'error',
        'regexp/no-empty-lookarounds-assertion': 'error',
        'regexp/no-empty-string-literal': 'error',
        'regexp/no-escape-backspace': 'error',
        'regexp/no-extra-lookaround-assertions': 'error',
        'regexp/no-invisible-character': 'error',
        'regexp/no-lazy-ends': 'error',
        'regexp/no-legacy-features': 'error',
        'regexp/no-misleading-capturing-group': 'error',
        'regexp/no-missing-g-flag': 'error',
        'regexp/no-non-standard-flag': 'error',
        'regexp/no-obscure-range': 'error',
        'regexp/no-octal': 'error',
        'regexp/no-optional-assertion': 'error',
        'regexp/no-potentially-useless-backreference': 'error',
        'regexp/no-standalone-backslash': 'error',
        'regexp/no-super-linear-backtracking': 'error',
        'regexp/no-super-linear-move': 'error',
        'regexp/no-trivially-nested-assertion': 'error',
        'regexp/no-trivially-nested-quantifier': 'error',
        'regexp/no-unused-capturing-group': 'error',
        'regexp/no-useless-assertions': 'error',
        'regexp/no-useless-character-class': 'error',
        'regexp/no-useless-dollar-replacements': 'error',
        'regexp/no-useless-flag': 'error',
        'regexp/no-useless-lazy': 'error',
        'regexp/no-useless-non-capturing-group': 'error',
        'regexp/no-useless-quantifier': 'error',
        'regexp/no-useless-range': 'error',
        'regexp/no-useless-set-operand': 'error',
        'regexp/no-useless-string-literal': 'error',
        'regexp/no-useless-two-nums-quantifier': 'error',
        'regexp/no-zero-quantifier': 'error',
        'regexp/optimal-lookaround-quantifier': 'error',
        'regexp/optimal-quantifier-concatenation': 'error',
        'regexp/prefer-escape-replacement-dollar-char': 'error',
        'regexp/prefer-named-backreference': 'error',
        'regexp/prefer-named-replacement': 'error',
        'regexp/prefer-result-array-groups': 'error',
        'regexp/prefer-set-operation': 'error',
        'regexp/prefer-unicode-codepoint-escapes': 'error',
        'regexp/simplify-set-operations': 'error',

        // Overlap with existing rules — keep the existing rule as single source of truth.
        'regexp/no-control-character': 'off', // core no-control-regex
        'regexp/no-dupe-characters-character-class': 'off', // sonarjs/duplicates-in-character-class
        'regexp/no-empty-alternative': 'off', // sonarjs/no-empty-alternatives
        'regexp/no-empty-character-class': 'off', // core no-empty-character-class
        'regexp/no-invalid-regexp': 'off', // core no-invalid-regexp
        'regexp/no-misleading-unicode-character': 'off', // core no-misleading-character-class
        'regexp/no-useless-backreference': 'off', // core no-useless-backreference
        'regexp/no-useless-escape': 'off', // core no-useless-escape
        'regexp/prefer-character-class': 'off', // unicorn/better-regex + sonarjs/concise-regex
        'regexp/prefer-d': 'off', // unicorn/better-regex
        'regexp/prefer-named-capture-group': 'off', // core prefer-named-capture-group
        'regexp/prefer-plus-quantifier': 'off', // unicorn/better-regex
        'regexp/prefer-question-quantifier': 'off', // unicorn/better-regex
        'regexp/prefer-regexp-exec': 'off', // @typescript-eslint/prefer-regexp-exec
        'regexp/prefer-regexp-test': 'off', // unicorn/prefer-regexp-test
        'regexp/prefer-star-quantifier': 'off', // unicorn/better-regex
        'regexp/prefer-w': 'off', // unicorn/better-regex
        'regexp/require-unicode-regexp': 'off', // matches core require-unicode-regexp (off)
        'regexp/strict': 'off', // unicorn/better-regex

        // Pure style preferences outside the project's scope.
        'regexp/grapheme-string-literal': 'off',
        'regexp/hexadecimal-escape': 'off',
        'regexp/letter-case': 'off',
        'regexp/prefer-lookaround': 'off',
        'regexp/prefer-predefined-assertion': 'off',
        'regexp/prefer-quantifier': 'off',
        'regexp/prefer-range': 'off',
        'regexp/require-unicode-sets-regexp': 'off',
        'regexp/sort-alternatives': 'off',
        'regexp/sort-character-class-elements': 'off',
        'regexp/sort-flags': 'off',
        'regexp/unicode-escape': 'off',
        'regexp/unicode-property': 'off',
        'regexp/use-ignore-case': 'off'
    }
};
