import type { ESLint } from 'eslint';
import arrayFunctionPlugin from 'eslint-plugin-array-func';
import mathPlugin from 'eslint-plugin-math';
import noBarrelFiles from 'eslint-plugin-no-barrel-files';
import promisePlugin from 'eslint-plugin-promise';
import regexpPlugin from 'eslint-plugin-regexp';
import sonarjsPlugin from 'eslint-plugin-sonarjs';
import unicornPlugin from 'eslint-plugin-unicorn';
import { enormoraPlugin } from '../plugins/enormora/enormora-plugin.ts';
import { disable } from '../rule-severity.ts';

const maxSwitchCases = 6;

export const bestPracticesRuleSet = {
    plugins: {
        unicorn: unicornPlugin,
        enormora: enormoraPlugin,
        promise: promisePlugin,
        'array-func': arrayFunctionPlugin,
        sonarjs: sonarjsPlugin,
        'no-barrel-files': noBarrelFiles,
        regexp: regexpPlugin as ESLint.Plugin,
        math: mathPlugin as ESLint.Plugin
    },
    settings: {},
    rules: {
        'math/abs': disable<'Covered by unicorn/prefer-math-abs'>(),
        'math/no-static-infinity-calculations': 'error',
        'math/no-static-nan-calculations': 'error',
        'math/prefer-exponentiation-operator': disable<'Covered by prefer-exponentiation-operator'>(),
        'math/prefer-math-cbrt': 'error',
        'math/prefer-math-e': disable<'Overlaps unicorn/prefer-math-constants'>(),
        'math/prefer-math-hypot': disable<'Overlaps unicorn/prefer-modern-math-apis'>(),
        'math/prefer-math-ln10': disable<'Overlaps unicorn/prefer-math-constants'>(),
        'math/prefer-math-ln2': disable<'Overlaps unicorn/prefer-math-constants'>(),
        'math/prefer-math-log10': disable<'Overlaps unicorn/prefer-modern-math-apis'>(),
        'math/prefer-math-log10e': disable<'Overlaps unicorn/prefer-math-constants'>(),
        'math/prefer-math-log2': disable<'Overlaps unicorn/prefer-modern-math-apis'>(),
        'math/prefer-math-log2e': disable<'Overlaps unicorn/prefer-math-constants'>(),
        'math/prefer-math-pi': disable<'Overlaps unicorn/prefer-math-constants'>(),
        'math/prefer-math-sqrt': 'error',
        'math/prefer-math-sqrt1-2': disable<'Overlaps unicorn/prefer-math-constants'>(),
        'math/prefer-math-sqrt2': disable<'Overlaps unicorn/prefer-math-constants'>(),
        'math/prefer-math-sum-precise': disable<
            'Runtime support and changed summation rounding require explicit opt-in'
        >(),
        'math/prefer-math-trunc': disable<'Covered by unicorn/prefer-math-trunc'>(),
        'math/prefer-number-epsilon': 'error',
        'math/prefer-number-is-finite': disable<'Overlaps unicorn/prefer-number-properties'>(),
        'math/prefer-number-is-integer': disable<'Overlaps unicorn/prefer-number-is-safe-integer'>(),
        'math/prefer-number-is-nan': disable<
            'Overlaps use-isnan, no-self-compare and unicorn/prefer-number-properties'
        >(),
        'math/prefer-number-is-safe-integer': disable<'Overlaps unicorn/prefer-number-is-safe-integer'>(),
        'math/prefer-number-max-safe-integer': 'error',
        'math/prefer-number-max-value': 'error',
        'math/prefer-number-min-safe-integer': disable<
            'math/prefer-number-max-safe-integer already reports the literal inside negative bounds'
        >(),
        'math/prefer-number-min-value': 'error',

        'enormora/prefer-ternary-for-value-selection': 'error',
        'unicorn/string-content': disable<'String replacements depend on the consuming project'>(),
        'unicorn/consistent-template-literal-escape': 'error',
        'unicorn/prefer-string-trim-start-end': 'error',
        'unicorn/prefer-set-has': 'error',
        'unicorn/prefer-string-replace-all': 'error',
        'unicorn/prefer-number-properties': [ 'error', { checkInfinity: true, checkNaN: true } ],
        'unicorn/prefer-negative-index': 'error',
        'unicorn/prefer-modern-dom-apis': disable<'Enabled only in the browser preset'>(),
        'unicorn/no-null': disable<
            'null represents explicit absence and survives JSON serialization, unlike undefined'
        >(),
        'unicorn/catch-error-name': 'error',
        'unicorn/consistent-function-scoping': 'error',
        'unicorn/custom-error-definition': 'error',
        'unicorn/error-message': 'error',
        'unicorn/escape-case': 'error',
        'unicorn/expiring-todo-comments': 'error',
        'unicorn/explicit-length-check': 'error',
        'unicorn/no-useless-length-check': 'error',
        'unicorn/filename-case': disable<
            'Use ls-lint or similar tools to cover filenames and folders outside ESLint'
        >(),
        'unicorn/no-immediate-mutation': 'error',
        'unicorn/new-for-builtins': 'error',
        'unicorn/no-abusive-eslint-disable': 'error',
        'unicorn/no-console-spaces': 'error',
        'unicorn/no-array-callback-reference': disable<
            'TypeScript and behavior tests are preferred over restricting compatible callback references'
        >(),
        'unicorn/no-for-loop': 'error',
        'unicorn/no-keyword-prefix': disable<'Keyword prefixes may carry domain meaning'>(),
        'unicorn/no-nested-ternary': disable<'Covered by no-nested-ternary'>(),
        'unicorn/no-new-buffer': 'error',
        'unicorn/no-process-exit': 'error',
        'unicorn/no-unreadable-array-destructuring': 'error',
        'unicorn/no-unused-properties': 'error',
        'unicorn/no-zero-fractions': 'error',
        'unicorn/number-literal-case': 'error',
        'unicorn/prefer-add-event-listener': 'error',
        'unicorn/prefer-keyboard-event-key': 'error',
        'unicorn/prefer-array-flat-map': 'error',
        'unicorn/prefer-includes': 'error',
        'unicorn/prefer-dom-node-append': 'error',
        'unicorn/prefer-dom-node-remove': 'error',
        'unicorn/prefer-query-selector': 'error',
        'unicorn/prefer-reflect-apply': 'error',
        'unicorn/prefer-spread': disable<'Conflicts with the existing array-func/prefer-array-from rule'>(),
        'unicorn/prefer-string-starts-ends-with': 'error',
        'unicorn/prefer-string-slice': 'error',
        'unicorn/prefer-dom-node-text-content': 'error',
        'unicorn/prefer-type-error': 'error',
        'unicorn/name-replacements': disable<
            'Desired naming replacements can conflict with third-party library and SDK identifiers'
        >(),
        'unicorn/throw-new-error': 'error',
        'unicorn/no-array-reduce': disable<'Functional programming is preferred; array reductions are allowed'>(),
        'unicorn/no-useless-undefined': disable<
            'Conflicts with init-declarations, which requires variable initializers'
        >(),
        'unicorn/prefer-optional-catch-binding': 'error',
        'unicorn/no-object-as-default-parameter': disable<'Default option objects are allowed'>(),
        'unicorn/prefer-array-find': 'error',
        'unicorn/import-style': disable<'Prescribing per-module import styles adds no useful constraint'>(),
        'unicorn/numeric-separators-style': 'error',
        'unicorn/prefer-math-trunc': 'error',
        'unicorn/prefer-ternary': disable<
            'Value selection is handled by enormora/prefer-ternary-for-value-selection'
        >(),
        'unicorn/prefer-array-some': 'error',
        'unicorn/prefer-default-parameters': 'error',
        'unicorn/no-lonely-if': 'error',
        'unicorn/empty-brace-spaces': disable<'Brace spacing is handled by the active formatter'>(),
        'unicorn/prefer-date-now': 'error',
        'unicorn/consistent-destructuring': 'error',
        'unicorn/no-new-array': 'error',
        'unicorn/no-this-assignment': 'error',
        'unicorn/prefer-array-index-of': 'error',
        'unicorn/prefer-regexp-test': 'error',
        'unicorn/no-static-only-class': 'error',
        'unicorn/prefer-array-flat': 'error',
        'unicorn/prefer-module': disable<'ESM is already enforced by import/no-commonjs and import/no-amd'>(),
        'unicorn/prefer-node-protocol': 'error',
        'unicorn/prefer-switch': disable<'Conflicts with restricted-syntax/no-switch-statement'>(),
        'unicorn/no-document-cookie': disable<
            'Cookie API selection depends on browser support and application needs'
        >(),
        'unicorn/require-array-join-separator': 'error',
        'unicorn/require-number-to-fixed-digits-argument': 'error',
        'unicorn/prefer-prototype-methods': 'error',
        'unicorn/no-array-method-this-argument': disable<'Explicit callback context arguments are allowed'>(),
        'unicorn/require-post-message-target-origin': 'error',
        'unicorn/no-useless-spread': 'error',
        'unicorn/prefer-object-from-entries': 'error',
        'unicorn/no-useless-fallback-in-spread': 'error',
        'unicorn/no-invalid-remove-event-listener': disable<
            'Listener lifecycle validation depends on browser-specific code'
        >(),
        'unicorn/template-indent': 'error',
        'unicorn/no-empty-file': 'error',
        'unicorn/prefer-export-from': 'error',
        'unicorn/no-await-expression-member': 'error',
        'unicorn/prefer-code-point': 'error',
        'unicorn/no-thenable': disable<
            'A general ban on methods, properties, or exports named then is too restrictive'
        >(),
        'unicorn/no-barrel-files': disable<'Covered by no-barrel-files/no-barrel-files'>(),
        'unicorn/no-useless-promise-resolve-reject': 'error',
        'unicorn/relative-url-style': disable<'Relative URL spelling need not follow a fixed style'>(),
        'unicorn/text-encoding-identifier-case': disable<'Equivalent encoding label spellings are allowed'>(),
        'unicorn/no-useless-switch-case': 'error',
        'unicorn/prefer-modern-math-apis': 'error',
        'unicorn/no-unreadable-iife': 'error',
        'unicorn/prefer-native-coercion-functions': 'error',
        'unicorn/prefer-event-target': disable<'Event emitter APIs may be required by existing contracts'>(),
        'unicorn/prefer-logical-operator-over-ternary': disable<'Explicit ternaries are allowed for value selection'>(),
        'unicorn/no-unnecessary-await': 'error',
        'unicorn/switch-case-braces': disable<
            'Switch statements are prohibited by restricted-syntax/no-switch-statement'
        >(),
        'unicorn/no-negated-condition': 'error',
        'unicorn/no-typeof-undefined': 'error',
        'unicorn/prefer-set-size': 'error',
        'unicorn/prefer-blob-reading-methods': 'error',
        'unicorn/prefer-top-level-await': 'error',
        'unicorn/prefer-at': 'error',
        'unicorn/no-unnecessary-polyfills': disable<'Polyfill requirements depend on the consuming runtime targets'>(),
        'unicorn/no-single-promise-in-promise-methods': 'error',
        'unicorn/no-await-in-promise-methods': 'error',
        'unicorn/no-anonymous-default-export': 'error',
        'unicorn/consistent-empty-array-spread': 'error',
        'unicorn/no-invalid-fetch-options': 'error',
        'unicorn/no-magic-array-flat-depth': 'error',
        'unicorn/no-negation-in-equality-check': 'error',
        'unicorn/prefer-string-raw': 'error',
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
        'unicorn/prefer-import-meta-properties': disable<
            'Import metadata availability depends on the consuming runtime'
        >(),
        'unicorn/prefer-simple-condition-first': 'error',
        'unicorn/prefer-single-call': 'error',
        'unicorn/require-module-attributes': 'error',
        'unicorn/require-module-specifiers': 'error',
        'unicorn/no-useless-collection-argument': 'error',
        'unicorn/prefer-response-static-json': 'error',
        'unicorn/consistent-conditional-object-spread': [ 'error', 'ternary' ],
        'unicorn/consistent-tuple-labels': 'error',
        'unicorn/default-export-style': disable<'Default exports are prohibited by import/no-default-export'>(),
        'unicorn/no-accidental-bitwise-operator': 'error',
        'unicorn/no-array-concat-in-loop': 'error',
        'unicorn/no-array-front-mutation': 'error',
        'unicorn/no-array-sort-for-min-max': 'error',
        'unicorn/no-async-promise-finally': 'error',
        'unicorn/no-boolean-sort-comparator': 'error',
        'unicorn/no-chained-comparison': 'error',
        'unicorn/no-collection-bracket-access': 'error',
        'unicorn/no-constant-zero-expression': 'error',
        'unicorn/no-double-comparison': 'error',
        'unicorn/no-duplicate-if-branches': 'error',
        'unicorn/no-duplicate-logical-operands': 'error',
        'unicorn/no-impossible-length-comparison': 'error',
        'unicorn/no-invalid-character-comparison': 'error',
        'unicorn/no-invalid-well-known-symbol-methods': 'error',
        'unicorn/no-loop-iterable-mutation': 'error',
        'unicorn/no-misrefactored-assignment': 'error',
        'unicorn/no-nonstandard-builtin-properties': 'error',
        'unicorn/no-unnecessary-array-flat-map': 'error',
        'unicorn/no-unnecessary-boolean-comparison': 'error',
        'unicorn/no-unnecessary-fetch-options': 'error',
        'unicorn/no-unsafe-promise-all-settled-values': 'error',
        'unicorn/no-useless-compound-assignment': 'error',
        'unicorn/no-useless-delete-check': 'error',
        'unicorn/no-useless-logical-operand': 'error',
        'unicorn/no-xor-as-exponentiation': 'error',
        'unicorn/prefer-abort-signal-any': 'error',
        'unicorn/prefer-abort-signal-timeout': 'error',
        'unicorn/prefer-aggregate-error': 'error',
        'unicorn/prefer-array-from-async': 'error',
        'unicorn/prefer-array-from-range': 'error',
        'unicorn/prefer-array-iterable-methods': 'error',
        'unicorn/prefer-block-statement-over-iife': 'error',
        'unicorn/prefer-boolean-return': disable<'Overlaps sonarjs/prefer-single-boolean-return'>(),
        'unicorn/prefer-continue': 'error',
        'unicorn/prefer-error-is-error': disable<
            'Intended to be enabled after API support is verified in the target environments'
        >(),
        'unicorn/prefer-flat-math-min-max': 'error',
        'unicorn/prefer-group-by': disable<
            'Intended to be enabled after API support is verified in the target environments'
        >(),
        'unicorn/prefer-hoisting-branch-code': 'error',
        'unicorn/prefer-iterator-helpers': disable<
            'Intended to be enabled after API support is verified in the target environments'
        >(),
        'unicorn/prefer-math-constants': 'error',
        'unicorn/prefer-promise-try': disable<
            'Intended to be enabled after API support is verified in the target environments'
        >(),
        'unicorn/prefer-promise-with-resolvers': disable<
            'Intended to be enabled after API support is verified in the target environments'
        >(),
        'unicorn/prefer-regexp-escape': disable<
            'Intended to be enabled after API support is verified in the target environments'
        >(),
        'unicorn/prefer-set-methods': disable<
            'Intended to be enabled after API support is verified in the target environments'
        >(),
        'unicorn/prefer-simplified-conditions': 'error',
        'unicorn/prefer-single-replace': 'error',
        'unicorn/prefer-unary-minus': 'error',
        'unicorn/prefer-url-can-parse': 'error',
        'unicorn/prefer-url-search-parameters': 'error',
        'unicorn/prefer-while-loop-condition': 'error',
        'unicorn/isolated-functions': disable<'Functions may close over local state'>(),
        'unicorn/switch-case-break-position': 'error',
        'unicorn/class-reference-in-static-methods': 'error',
        'unicorn/comment-content': disable<'Comment wording is not restricted beyond spelling and formatting'>(),
        'unicorn/consistent-boolean-name': disable<
            'Valid boolean names such as enabled and looksLike do not fit a fixed prefix list'
        >(),
        'unicorn/consistent-class-member-order': disable<
            'Class member ordering is configured by @typescript-eslint/member-ordering'
        >(),
        'unicorn/consistent-compound-words': 'error',
        'unicorn/consistent-export-decorator-position': 'error',
        'unicorn/consistent-arrow-return-style': 'error',
        'unicorn/consistent-function-style': disable<'Declarations and expressions are both allowed'>(),
        'unicorn/consistent-json-file-read': 'error',
        'unicorn/consistent-optional-chaining': 'error',
        'unicorn/explicit-timer-delay': 'error',
        'unicorn/id-match': disable<'No universal identifier pattern is prescribed'>(),
        'unicorn/iteration-fallback-style': 'error',
        'unicorn/logical-assignment-operators': disable<'Covered by logical-assignment-operators'>(),
        'unicorn/max-nested-calls': [ 'error', { max: 3 } ],
        'unicorn/no-array-fill-with-reference-type': 'error',
        'unicorn/no-array-from-fill': 'error',
        'unicorn/no-array-splice': 'error',
        'unicorn/no-asterisk-prefix-in-documentation-comments': disable<
            'Conventional documentation comment prefixes are allowed'
        >(),
        'unicorn/no-break-in-nested-loop': 'error',
        'unicorn/no-computed-property-existence-check': 'error',
        'unicorn/no-confusing-array-splice': 'error',
        'unicorn/no-confusing-array-with': 'error',
        'unicorn/no-declarations-before-early-exit': 'error',
        'unicorn/no-duplicate-loops': 'error',
        'unicorn/no-duplicate-set-values': 'error',
        'unicorn/no-error-property-assignment': 'error',
        'unicorn/no-exports-in-scripts': 'error',
        'unicorn/no-for-each': disable<
            'Functional programming is preferred; array callbacks are allowed for side effects'
        >(),
        'unicorn/no-global-object-property-assignment': 'error',
        'unicorn/no-incorrect-template-string-interpolation': disable<
            'Literal interpolation syntax may be intentional in templates'
        >(),
        'unicorn/no-invalid-argument-count': 'error',
        'unicorn/no-manually-wrapped-comments': disable<'Comments may be wrapped for readability'>(),
        'unicorn/no-mismatched-map-key': 'error',
        'unicorn/no-negated-array-predicate': 'error',
        'unicorn/no-negated-comparison': 'error',
        'unicorn/no-non-function-verb-prefix': disable<'Domain names may use verb prefixes for non-function values'>(),
        'unicorn/no-object-methods-with-collections': 'error',
        'unicorn/no-optional-chaining-on-undeclared-variable': 'error',
        'unicorn/no-redundant-comparison': 'error',
        'unicorn/no-return-array-push': 'error',
        'unicorn/no-subtraction-comparison': 'error',
        'unicorn/no-this-outside-of-class': 'error',
        'unicorn/no-top-level-assignment-in-function': 'error',
        'unicorn/no-top-level-side-effects': disable<'Module initialization side effects are allowed'>(),
        'unicorn/no-uncalled-method': 'error',
        'unicorn/no-undeclared-class-members': 'error',
        'unicorn/no-unnecessary-global-this': 'error',
        'unicorn/no-unnecessary-nested-ternary': 'error',
        'unicorn/no-unnecessary-splice': 'error',
        'unicorn/no-unreadable-for-of-expression': 'error',
        'unicorn/no-unreadable-new-expression': 'error',
        'unicorn/no-unreadable-object-destructuring': 'error',
        'unicorn/no-unsafe-buffer-conversion': 'error',
        'unicorn/no-unsafe-property-key': 'error',
        'unicorn/no-unsafe-sqlite-interpolation': disable<'Enabled only in the node preset'>(),
        'unicorn/no-unsafe-string-replacement': 'error',
        'unicorn/no-unused-builtin-method-return': 'error',
        'unicorn/no-useless-boolean-cast': 'error',
        'unicorn/no-useless-coercion': 'error',
        'unicorn/no-useless-concat': 'error',
        'unicorn/no-useless-continue': 'error',
        'unicorn/no-useless-else': 'error',
        'unicorn/no-useless-override': 'error',
        'unicorn/no-useless-recursion': disable<'Functional programming is preferred; tail recursion is allowed'>(),
        'unicorn/no-useless-template-literals': 'error',
        'unicorn/operator-assignment': disable<'Covered by operator-assignment'>(),
        'unicorn/prefer-array-from-map': 'error',
        'unicorn/prefer-array-last-methods': 'error',
        'unicorn/prefer-array-slice': 'error',
        'unicorn/prefer-await': disable<'Overlaps promise/prefer-await-to-then'>(),
        'unicorn/prefer-direct-iteration': 'error',
        'unicorn/prefer-dispose': disable<'Resource disposal syntax depends on runtime support and API contracts'>(),
        'unicorn/prefer-early-return': disable<
            'Shorter control flow is not always clearer; no-else-return and max-depth cover separate concerns'
        >(),
        'unicorn/prefer-else-if': 'error',
        'unicorn/prefer-get-or-insert-computed': disable<
            'Intended to be enabled after API support is verified in the target environments'
        >(),
        'unicorn/prefer-global-number-constants': disable<'Conflicts with unicorn/prefer-number-properties'>(),
        'unicorn/prefer-has-check': 'error',
        'unicorn/prefer-https': 'error',
        'unicorn/prefer-identifier-import-export-specifiers': 'error',
        'unicorn/prefer-includes-over-repeated-comparisons': 'error',
        'unicorn/prefer-iterable-in-constructor': 'error',
        'unicorn/prefer-iterator-concat': disable<
            'Intended to be enabled after API support is verified in the target environments'
        >(),
        'unicorn/prefer-iterator-to-array': 'error',
        'unicorn/prefer-iterator-to-array-at-end': 'error',
        'unicorn/prefer-map-from-entries': 'error',
        'unicorn/prefer-math-abs': 'error',
        'unicorn/prefer-minimal-ternary': 'error',
        'unicorn/prefer-number-coercion': disable<
            'Parsing numeric prefixes such as 10px differs intentionally from whole-value Number conversion'
        >(),
        'unicorn/prefer-number-is-safe-integer': 'error',
        'unicorn/prefer-object-define-properties': 'error',
        'unicorn/prefer-object-destructuring-defaults': 'error',
        'unicorn/prefer-object-iterable-methods': 'error',
        'unicorn/prefer-private-class-fields': disable<
            'Class declarations are generally prohibited by restricted-syntax/no-class-declaration'
        >(),
        'unicorn/prefer-queue-microtask': 'error',
        'unicorn/prefer-short-arrow-method': disable<
            'Method syntax is preferred for readability and its dynamic this binding'
        >(),
        'unicorn/prefer-simple-sort-comparator': 'error',
        'unicorn/prefer-single-array-predicate': 'error',
        'unicorn/prefer-single-object-destructuring': 'error',
        'unicorn/prefer-smaller-scope': [ 'error', { checkTypeAliases: false } ],
        'unicorn/prefer-split-limit': 'error',
        'unicorn/prefer-string-match-all': 'error',
        'unicorn/prefer-string-pad-start-end': 'error',
        'unicorn/prefer-string-repeat': 'error',
        'unicorn/prefer-temporal': disable<
            'Intended to be enabled after API support is verified in the target environments'
        >(),
        'unicorn/prefer-type-literal-last': 'error',
        'unicorn/prefer-uint8array-base64': disable<
            'Intended to be enabled after API support is verified in the target environments'
        >(),
        'unicorn/prefer-unicode-code-point-escapes': 'error',
        'unicorn/prefer-url-href': 'error',
        'unicorn/require-array-sort-compare': 'error',
        'unicorn/require-proxy-trap-boolean-return': 'error',
        'unicorn/try-complexity': 'error',
        'unicorn/no-missing-local-resource': disable<'Resource resolution depends on the consuming build pipeline'>(),
        'unicorn/no-multiple-promise-resolver-calls': 'error',
        'unicorn/no-shorthand-property-overrides': disable<'CSS linting is outside the supported preset scope'>(),
        'unicorn/no-transition-all': disable<'CSS linting is outside the supported preset scope'>(),
        'unicorn/no-unnecessary-string-trim': 'error',
        'unicorn/no-useless-re-export': 'error',
        'unicorn/prefer-then-catch': 'error',
        'unicorn/require-frontmatter-fields': disable<
            'Frontmatter requirements depend on the consuming content framework'
        >(),
        'unicorn/single-line-block-comment-style': 'error',
        'unicorn/no-async-iterator-callback': 'error',
        'unicorn/no-unused-iterator-helper': 'error',
        'unicorn/no-useless-set-construction': 'error',
        'unicorn/no-using-resource-escape': 'error',
        'unicorn/prefer-combined-guards': 'error',
        'unicorn/prefer-iterator-zip': disable<
            'Intended to be enabled after API support is verified in the target environments'
        >(),
        'unicorn/prefer-json-import': disable<'JSON module loading depends on the consuming runtime and bundler'>(),
        'unicorn/prefer-temporal-conversion': disable<
            'Intended to be enabled after API support is verified in the target environments'
        >(),
        'unicorn/prefer-uint8array-hex': disable<
            'Intended to be enabled after API support is verified in the target environments'
        >(),
        'unicorn/comma-spacing': disable<'Covered by @stylistic/comma-spacing'>(),
        'unicorn/indent': disable<'Covered by @stylistic/indent'>(),
        'unicorn/key-name-casing': disable<'Object keys may follow external API naming conventions'>(),
        'unicorn/no-loss-of-precision': disable<'Covered by no-loss-of-precision'>(),
        'unicorn/no-leading-empty-lines': 'error',
        'unicorn/no-unnecessary-parameters': 'error',
        'unicorn/prefer-promise-static-methods': 'error',
        'unicorn/no-incomplete-accessor-override': 'error',
        'unicorn/prefer-escaped-irregular-whitespace': 'error',
        'unicorn/prefer-literal-ascii': 'error',
        'unicorn/prefer-short-escape-sequences': 'error',
        'unicorn/no-unsafe-json-serialization': 'error',
        'unicorn/no-invalid-property-descriptor': 'error',
        'unicorn/no-invalid-intl-options': 'error',
        'unicorn/no-invalid-temporal-arithmetic': 'error',
        'unicorn/require-text-decoder-streaming': 'error',
        'unicorn/no-invalid-url-protocol-comparison': 'error',
        'unicorn/no-url-in-search-params': 'error',
        'unicorn/no-invalid-response-options': 'error',
        'unicorn/no-repeated-call-wrappers': 'error',
        'unicorn/no-unnecessary-default-arguments': 'error',

        'array-func/from-map': 'error',
        'array-func/no-unnecessary-this-arg': 'error',
        'array-func/prefer-array-from': 'error',
        'array-func/avoid-reverse': 'error',
        'array-func/prefer-flat-map': 'error',
        'array-func/prefer-flat': 'error',

        'sonarjs/anchor-precedence': 'error',
        'sonarjs/argument-type': 'error',
        'sonarjs/arguments-order': 'error',
        'sonarjs/arguments-usage': disable<'Rest parameters are already required by prefer-rest-params'>(),
        'sonarjs/array-callback-without-return': disable<'Covered by array-callback-return'>(),
        'sonarjs/array-constructor': disable<'Covered by no-array-constructor'>(),
        'sonarjs/arrow-function-convention': disable<'Function style is left to intent and readability'>(),
        'sonarjs/assertions-in-test-cases': disable<'Assertion placement requires test-runner-specific context'>(),
        'sonarjs/assertions-in-tests': disable<'Assertion requirements are handled by the test runner presets'>(),
        'sonarjs/async-test-assertions': disable<'Async assertion checks require test-runner-specific context'>(),
        'sonarjs/avoid-mutating-nested-properties-of-shallow-clones': disable<
            'Intentional local mutation is allowed'
        >(),
        'sonarjs/aws-apigateway-public-api': disable<'Enabled only in the aws-cdk preset'>(),
        'sonarjs/aws-ec2-rds-dms-public': disable<'Enabled only in the aws-cdk preset'>(),
        'sonarjs/aws-ec2-unencrypted-ebs-volume': disable<'Enabled only in the aws-cdk preset'>(),
        'sonarjs/aws-efs-unencrypted': disable<'Enabled only in the aws-cdk preset'>(),
        'sonarjs/aws-iam-all-privileges': disable<'Enabled only in the aws-cdk preset'>(),
        'sonarjs/aws-iam-all-resources-accessible': disable<
            'IAM resource scope depends on the consuming infrastructure policy'
        >(),
        'sonarjs/aws-iam-privilege-escalation': disable<'Enabled only in the aws-cdk preset'>(),
        'sonarjs/aws-iam-public-access': disable<'Enabled only in the aws-cdk preset'>(),
        'sonarjs/aws-opensearchservice-domain': disable<'Enabled only in the aws-cdk preset'>(),
        'sonarjs/aws-rds-unencrypted-databases': disable<'Enabled only in the aws-cdk preset'>(),
        'sonarjs/aws-restricted-ip-admin-access': disable<'Enabled only in the aws-cdk preset'>(),
        'sonarjs/aws-s3-bucket-granted-access': disable<'Enabled only in the aws-cdk preset'>(),
        'sonarjs/aws-s3-bucket-insecure-http': disable<'Enabled only in the aws-cdk preset'>(),
        'sonarjs/aws-s3-bucket-public-access': disable<'Enabled only in the aws-cdk preset'>(),
        'sonarjs/aws-s3-bucket-versioning': disable<'Enabled only in the aws-cdk preset'>(),
        'sonarjs/aws-sagemaker-unencrypted-notebook': disable<'Enabled only in the aws-cdk preset'>(),
        'sonarjs/aws-sns-unencrypted-topics': disable<'Enabled only in the aws-cdk preset'>(),
        'sonarjs/aws-sqs-unencrypted-queue': disable<'Enabled only in the aws-cdk preset'>(),
        'sonarjs/bitwise-operators': disable<'Covered by no-bitwise'>(),
        'sonarjs/block-scoped-var': disable<'Block scoping is enforced by no-var'>(),
        'sonarjs/bool-param-default': disable<'Boolean parameters need not have default values'>(),
        'sonarjs/call-argument-line': 'error',
        'sonarjs/chai-determinate-assertion': disable<
            'Chai assertion style is outside the runner presets provided here'
        >(),
        'sonarjs/class-name': 'error',
        'sonarjs/class-prototype': disable<
            'Prototype assignment policy is left to the consuming project'
        >(),
        'sonarjs/code-eval': disable<'Covered by no-eval'>(),
        'sonarjs/cognitive-complexity': disable<
            'Use the configured core complexity, nesting, and statement limits instead'
        >(),
        'sonarjs/comma-or-logical-or-case': 'error',
        'sonarjs/comment-regex': disable<'Comment patterns depend on the consuming project'>(),
        'sonarjs/composite-assertions': disable<'Assertion grouping is left to the behavior under test'>(),
        'sonarjs/concise-regex': 'error',
        'sonarjs/constructor-for-side-effects': 'error',
        'sonarjs/content-length': disable<'HTTP payload limits depend on the consuming server application'>(),
        'sonarjs/content-security-policy': disable<
            'Framework-specific header and middleware checks cannot cover every application reliably'
        >(),
        'sonarjs/cookie-no-httponly': disable<'Cookie security settings depend on the consuming server application'>(),
        'sonarjs/cors': disable<
            'Framework-specific header and middleware checks cannot cover every application reliably'
        >(),
        'sonarjs/csrf': disable<
            'Framework-specific header and middleware checks cannot cover every application reliably'
        >(),
        'sonarjs/cyclomatic-complexity': disable<'Covered by complexity'>(),
        'sonarjs/declarations-in-global-scope': disable<
            'Module source type and no-implicit-globals prevent accidental globals'
        >(),
        'sonarjs/deprecation': 'error',
        'sonarjs/destructuring-assignment-syntax': disable<
            'Destructuring choices are handled by prefer-destructuring'
        >(),
        'sonarjs/different-types-comparison': 'error',
        'sonarjs/disabled-auto-escaping': disable<'Template escaping policy depends on the consuming framework'>(),
        'sonarjs/disabled-resource-integrity': disable<
            'Resource integrity policy depends on the consuming web application'
        >(),
        'sonarjs/disabled-timeout': disable<'Timeout policy depends on the consuming network application'>(),
        'sonarjs/dompurify-unsafe-config': disable<'DOMPurify configuration belongs to projects using that library'>(),
        'sonarjs/duplicates-in-character-class': 'error',
        'sonarjs/dynamically-constructed-templates': disable<
            'Template construction depends on the consuming template engine'
        >(),
        'sonarjs/elseif-without-else': disable<'Conditional chains need not have a final else branch'>(),
        'sonarjs/empty-string-repetition': 'error',
        'sonarjs/encryption-secure-mode': disable<'Enabled only in the node preset'>(),
        'sonarjs/existing-groups': 'error',
        'sonarjs/explicit-test-skip': disable<'Skipped tests are handled by the test runner presets'>(),
        'sonarjs/expression-complexity': disable<
            'Expression readability is not measured by a fixed complexity score'
        >(),
        'sonarjs/file-header': disable<'File headers depend on the consuming project'>(),
        'sonarjs/file-name-differ-from-class': disable<
            'Class declarations are prohibited by restricted-syntax/no-class-declaration'
        >(),
        'sonarjs/file-permissions': disable<'Enabled only in the node preset'>(),
        'sonarjs/file-uploads': disable<'Upload security depends on the consuming server application'>(),
        'sonarjs/fixme-tag': disable<'Covered by no-warning-comments'>(),
        'sonarjs/for-in': disable<'Object iteration safeguards are handled by guard-for-in'>(),
        'sonarjs/for-loop-increment-sign': 'error',
        'sonarjs/function-inside-loop': disable<'Covered by no-loop-func'>(),
        'sonarjs/function-name': disable<'Function naming need not follow a project-independent pattern'>(),
        'sonarjs/function-return-type': 'error',
        'sonarjs/future-reserved-words': 'error',
        'sonarjs/generator-without-yield': disable<'Covered by require-yield'>(),
        'sonarjs/hardcoded-secret-signatures': 'error',
        'sonarjs/hashing': disable<'Enabled only in the node preset'>(),
        'sonarjs/hooks-before-test-cases': disable<'Hook ordering is handled by the test runner presets'>(),
        'sonarjs/in-operator-type-error': 'error',
        'sonarjs/inconsistent-function-call': 'error',
        'sonarjs/index-of-compare-to-positive-number': 'error',
        'sonarjs/insecure-cookie': disable<'Cookie transport policy depends on the consuming server application'>(),
        'sonarjs/insecure-jwt-token': disable<'JWT verification belongs to projects using that library'>(),
        'sonarjs/inverted-assertion-arguments': disable<
            'Assertion argument checks require the selected assertion library'
        >(),
        'sonarjs/jsx-no-leaked-render': disable<'Handled by react/jsx-no-leaked-render in the JSX presets'>(),
        'sonarjs/label-position': disable<'Covered by no-labels'>(),
        'sonarjs/link-with-target-blank': disable<'Handled by react/jsx-no-target-blank in the JSX presets'>(),
        'sonarjs/max-lines': disable<'Covered by max-lines'>(),
        'sonarjs/max-lines-per-function': disable<
            'Nested function bodies count against the enclosing function line limit'
        >(),
        'sonarjs/max-switch-cases': [ 'error', maxSwitchCases ],
        'sonarjs/max-union-size': disable<'Domain unions need not obey a fixed member limit'>(),
        'sonarjs/memoize-cache-key': disable<'Memoization validation depends on the consuming library'>(),
        'sonarjs/misplaced-loop-counter': 'error',
        'sonarjs/nested-control-flow': disable<'Covered by max-depth'>(),
        'sonarjs/new-operator-misuse': 'error',
        'sonarjs/no-all-duplicated-branches': 'error',
        'sonarjs/no-alphabetical-sort': 'error',
        'sonarjs/no-angular-bypass-sanitization': disable<'Angular sanitization policy belongs to Angular projects'>(),
        'sonarjs/no-array-delete': 'error',
        'sonarjs/no-associative-arrays': 'error',
        'sonarjs/no-async-constructor': 'error',
        'sonarjs/no-built-in-override': disable<'Covered by no-global-assign and no-shadow-restricted-names'>(),
        'sonarjs/no-case-label-in-switch': 'error',
        'sonarjs/no-clear-text-protocols': disable<
            'Protocol policy is handled by unicorn/prefer-https where applicable'
        >(),
        'sonarjs/no-code-after-done': disable<'Handled by mocha/no-code-after-done in the mocha preset'>(),
        'sonarjs/no-collapsible-if': 'error',
        'sonarjs/no-collection-size-mischeck': 'error',
        'sonarjs/no-commented-code': disable<
            'Unreliable detection misses broken commented code; comments are discouraged in favor of clear code'
        >(),
        'sonarjs/no-control-regex': disable<'Covered by no-control-regex'>(),
        'sonarjs/no-dead-store': disable<'Covered by no-useless-assignment'>(),
        'sonarjs/no-debounce-throttle-in-render': disable<
            'Render-time debounce policy depends on the consuming React application'
        >(),
        'sonarjs/no-debug-commands-in-ui-tests': disable<
            'UI automation commands depend on the consuming test framework'
        >(),
        'sonarjs/no-default-utility-imports': disable<
            'Import granularity depends on the consuming package and bundler'
        >(),
        'sonarjs/no-delete-var': disable<'Covered by no-delete-var'>(),
        'sonarjs/no-duplicate-in-composite': disable<
            'Covered by @typescript-eslint/no-duplicate-type-constituents in the typescript preset'
        >(),
        'sonarjs/no-duplicate-parameterized-test-case': disable<
            'Parameterized test discovery requires test-runner-specific context'
        >(),
        'sonarjs/no-duplicate-string': disable<
            'Literal types provide typo checks where needed; repeated strings need not become constants'
        >(),
        'sonarjs/no-duplicate-test-title': disable<'Handled by the test runner presets'>(),
        'sonarjs/no-duplicated-branches': 'error',
        'sonarjs/no-element-overwrite': 'error',
        'sonarjs/no-empty-after-reluctant': 'error',
        'sonarjs/no-empty-alternatives': 'error',
        'sonarjs/no-empty-character-class': disable<'Covered by no-empty-character-class'>(),
        'sonarjs/no-empty-collection': 'error',
        'sonarjs/no-empty-group': 'error',
        'sonarjs/no-empty-parameterized-test-dataset': disable<
            'Dataset validation requires test-runner-specific context'
        >(),
        'sonarjs/no-empty-test-file': disable<'Test file discovery belongs to the consuming test runner'>(),
        'sonarjs/no-empty-test-title': disable<'Handled by the test runner presets'>(),
        'sonarjs/no-equals-in-for-termination': 'error',
        'sonarjs/no-exclusive-tests': disable<'Handled by the test runner presets'>(),
        'sonarjs/no-extra-arguments': disable<'JavaScript functions may intentionally ignore additional arguments'>(),
        'sonarjs/no-fallthrough': disable<'Covered by no-fallthrough'>(),
        'sonarjs/no-fixed-wait-in-tests': disable<'Wait policy depends on the consuming UI test framework'>(),
        'sonarjs/no-floating-point-equality': 'error',
        'sonarjs/no-for-in-iterable': disable<
            'Handled by @typescript-eslint/no-for-in-array in the typescript preset'
        >(),
        'sonarjs/no-forced-browser-interaction': disable<
            'Browser automation policy depends on the consuming UI test framework'
        >(),
        'sonarjs/no-function-declaration-in-block': disable<'Block-scoped function declarations are allowed'>(),
        'sonarjs/no-global-this': 'error',
        'sonarjs/no-globals-shadowing': disable<'Covered by no-shadow with builtinGlobals'>(),
        'sonarjs/no-gratuitous-expressions': 'error',
        'sonarjs/no-hardcoded-ip': 'error',
        'sonarjs/no-hardcoded-passwords': 'error',
        'sonarjs/no-hardcoded-secrets': 'error',
        'sonarjs/no-hook-setter-in-body': disable<'Handled by react-hooks/set-state-in-render in the react preset'>(),
        'sonarjs/no-identical-conditions': 'error',
        'sonarjs/no-identical-expressions': 'error',
        'sonarjs/no-identical-functions': 'error',
        'sonarjs/no-ignored-exceptions': 'error',
        'sonarjs/no-ignored-return': 'error',
        'sonarjs/no-implicit-dependencies': disable<'Covered by import/no-extraneous-dependencies'>(),
        'sonarjs/no-implicit-global': disable<'Covered by no-implicit-globals'>(),
        'sonarjs/no-in-misuse': 'error',
        'sonarjs/no-incompatible-assertion-types': disable<
            'Assertion type compatibility depends on the selected assertion library'
        >(),
        'sonarjs/no-incomplete-assertions': disable<'Assertion completeness is checked by the test runner presets'>(),
        'sonarjs/no-inconsistent-returns': disable<'Covered by consistent-return and its TypeScript extension'>(),
        'sonarjs/no-incorrect-string-concat': disable<'Covered by prefer-template'>(),
        'sonarjs/no-internal-api-use': 'error',
        'sonarjs/no-interpolation-in-inline-snapshots': disable<
            'Handled by @vitest/no-interpolation-in-snapshots in the vitest preset'
        >(),
        'sonarjs/no-invalid-regexp': disable<'Covered by no-invalid-regexp'>(),
        'sonarjs/no-invariant-returns': 'error',
        'sonarjs/no-inverted-boolean-check': 'error',
        'sonarjs/no-labels': disable<'Covered by no-labels'>(),
        'sonarjs/no-literal-call': 'error',
        'sonarjs/no-mime-sniff': disable<'Response header policy depends on the consuming server application'>(),
        'sonarjs/no-misleading-array-reverse': 'error',
        'sonarjs/no-misleading-character-class': disable<'Covered by no-misleading-character-class'>(),
        'sonarjs/no-mixed-completion-style': disable<
            'Handled by mocha/no-async-and-done and mocha/no-return-and-done'
        >(),
        'sonarjs/no-mutate-reactive-state-in-updated-hook': disable<
            'Vue lifecycle mutation checks belong to Vue projects'
        >(),
        'sonarjs/no-nested-assignment': 'error',
        'sonarjs/no-nested-conditional': disable<'Covered by no-nested-ternary'>(),
        'sonarjs/no-nested-functions': 'error',
        'sonarjs/no-nested-incdec': disable<'Increment operators are already prohibited by no-plusplus'>(),
        'sonarjs/no-nested-switch': 'error',
        'sonarjs/no-nested-template-literals': 'error',
        'sonarjs/no-networkidle-wait': disable<'Network wait policy depends on the consuming UI test framework'>(),
        'sonarjs/no-os-command-from-path': disable<'Enabled only in the node preset'>(),
        'sonarjs/no-parameter-reassignment': 'error',
        'sonarjs/no-primitive-wrappers': disable<'Covered by no-new-wrappers'>(),
        'sonarjs/no-redundant-assignments': 'error',
        'sonarjs/no-redundant-boolean': disable<
            'Overlaps no-extra-boolean-cast and unicorn condition simplification rules'
        >(),
        'sonarjs/no-redundant-jump': disable<'Overlaps no-useless-return and unicorn/no-useless-continue'>(),
        'sonarjs/no-redundant-optional': 'error',
        'sonarjs/no-reference-error': disable<'Covered by no-undef'>(),
        'sonarjs/no-referrer-policy': disable<'Referrer policy depends on the consuming web application'>(),
        'sonarjs/no-regex-spaces': disable<'Covered by no-regex-spaces'>(),
        'sonarjs/no-require-or-define': disable<'Covered by import/no-commonjs and import/no-amd'>(),
        'sonarjs/no-return-type-any': disable<'Handled by @typescript-eslint/no-explicit-any and no-unsafe-return'>(),
        'sonarjs/no-same-argument-assert': disable<
            'Assertion argument validation depends on the selected assertion library'
        >(),
        'sonarjs/no-same-line-conditional': 'error',
        'sonarjs/no-selector-parameter': 'error',
        'sonarjs/no-session-cookies-on-static-assets': disable<
            'Static asset session policy depends on the consuming server application'
        >(),
        'sonarjs/no-skipped-tests': disable<'Handled by the test runner presets'>(),
        'sonarjs/no-small-switch': 'error',
        'sonarjs/no-sonar-comments': disable<'Sonar-specific directives need not be prohibited'>(),
        'sonarjs/no-table-as-layout': disable<'Table semantics depend on the consuming UI framework'>(),
        'sonarjs/no-trivial-assertions': disable<'Assertion quality is judged by observable behavior in test review'>(),
        'sonarjs/no-try-promise': 'error',
        'sonarjs/no-undefined-argument': 'error',
        'sonarjs/no-undefined-assignment': disable<'Explicit undefined assignment is allowed'>(),
        'sonarjs/no-unenclosed-multiline-block': disable<'Covered by curly'>(),
        'sonarjs/no-uniq-key': disable<'Enabled only in the react preset'>(),
        'sonarjs/no-unthrown-error': 'error',
        'sonarjs/no-unused-collection': 'error',
        'sonarjs/no-unused-function-argument': disable<'Covered by no-unused-vars and its TypeScript extension'>(),
        'sonarjs/no-unused-vars': disable<'Covered by no-unused-vars and its TypeScript extension'>(),
        'sonarjs/no-use-of-empty-return-value': 'error',
        'sonarjs/no-useless-catch': disable<'Covered by no-useless-catch'>(),
        'sonarjs/no-useless-increment': disable<'Increment operators are already prohibited by no-plusplus'>(),
        'sonarjs/no-useless-intersection': 'error',
        'sonarjs/no-useless-react-setstate': disable<'Enabled only in the react preset'>(),
        'sonarjs/no-variable-usage-before-declaration': disable<
            'Covered by no-use-before-define and its TypeScript extension'
        >(),
        'sonarjs/no-vue-class-component': disable<'Vue component API choice belongs to Vue projects'>(),
        'sonarjs/no-vue-mixins': disable<'Mixin policy belongs to Vue projects'>(),
        'sonarjs/no-weak-cipher': disable<'Enabled only in the node preset'>(),
        'sonarjs/no-weak-keys': disable<'Enabled only in the node preset'>(),
        'sonarjs/no-wildcard-import': 'error',
        'sonarjs/non-existent-operator': 'error',
        'sonarjs/non-number-in-arithmetic-expression': disable<
            'Arithmetic type compatibility is checked by TypeScript in typed projects'
        >(),
        'sonarjs/null-dereference': 'error',
        'sonarjs/object-alt-content': disable<'Object element accessibility depends on the consuming UI framework'>(),
        'sonarjs/operation-returning-nan': disable<
            'Numeric input validity depends on application types and validation'
        >(),
        'sonarjs/parameterized-tests': disable<'Test parameterization is handled by the test runner presets'>(),
        'sonarjs/post-message': disable<'Enabled only in the browser preset'>(),
        'sonarjs/prefer-cypress-should': disable<'Cypress assertion style belongs to Cypress projects'>(),
        'sonarjs/prefer-default-last': disable<'Covered by default-case-last'>(),
        'sonarjs/prefer-immediate-return': disable<'Intermediate values may document domain meaning'>(),
        'sonarjs/prefer-native-axios-alternative': disable<
            'Axios-specific migration checks are outside the supported preset scope'
        >(),
        'sonarjs/prefer-native-jquery-alternative': disable<
            'jQuery-specific migration checks are outside the supported preset scope'
        >(),
        'sonarjs/prefer-native-lodash-alternative': disable<
            'Lodash is not used in the intended toolchain, so migration checks add no value'
        >(),
        'sonarjs/prefer-object-literal': disable<'Covered by no-object-constructor'>(),
        'sonarjs/prefer-promise-shorthand': 'error',
        'sonarjs/prefer-read-only-props': disable<'Enabled only in the react-tsx preset'>(),
        'sonarjs/prefer-regexp-exec': 'error',
        'sonarjs/prefer-single-boolean-return': 'error',
        'sonarjs/prefer-specific-assertions': disable<'Assertion style is handled by the test runner presets'>(),
        'sonarjs/prefer-type-guard': 'error',
        'sonarjs/prefer-while': 'error',
        'sonarjs/production-debug': disable<'Debug configuration depends on the consuming build and runtime'>(),
        'sonarjs/pseudo-random': 'error',
        'sonarjs/public-static-readonly': 'error',
        'sonarjs/publicly-writable-directories': disable<'Enabled only in the node preset'>(),
        'sonarjs/reduce-initial-value': 'error',
        'sonarjs/redundant-type-aliases': 'error',
        'sonarjs/regex-complexity': 'error',
        'sonarjs/review-blockchain-mnemonic': disable<
            'Mnemonic handling belongs to projects using blockchain libraries'
        >(),
        'sonarjs/session-regeneration': disable<
            'Session lifecycle policy depends on the consuming server application'
        >(),
        'sonarjs/shorthand-property-grouping': disable<'Object properties may follow domain order'>(),
        'sonarjs/single-char-in-character-classes': 'error',
        'sonarjs/single-character-alternation': 'error',
        // regexp/no-super-linear-backtracking subsumes this with a sound NFA-based analysis
        // (sonarjs is heuristic); see the regexp/* block below.
        'sonarjs/slow-regex': disable<'Covered by regexp/no-super-linear-backtracking'>(),
        'sonarjs/sql-queries': disable<'SQL query safety depends on the consuming database API'>(),
        'sonarjs/stable-tests': disable<'Test environment stability requires runner-specific context'>(),
        'sonarjs/stateful-regex': 'error',
        'sonarjs/strict-transport-security': disable<'Transport headers depend on the consuming server application'>(),
        'sonarjs/strings-comparison': disable<'String ordering semantics depend on the domain and locale'>(),
        'sonarjs/super-linear-regex': 'error',
        'sonarjs/synchronous-exception-assertions': disable<
            'Exception assertion validation depends on the selected assertion library'
        >(),
        'sonarjs/synchronous-suite-callback': disable<
            'Handled by mocha/no-async-suite and @vitest/valid-describe-callback'
        >(),
        'sonarjs/table-header': disable<'Table accessibility depends on the consuming UI framework'>(),
        'sonarjs/table-header-reference': disable<'Table accessibility depends on the consuming UI framework'>(),
        'sonarjs/test-check-exception': disable<
            'Exception assertion validation depends on the selected assertion library'
        >(),
        'sonarjs/testing-library-prefer-query-by-disappearance': disable<
            'Testing Library query style belongs to projects using that library'
        >(),
        'sonarjs/testing-library-query-assertion': disable<
            'Testing Library query assertions belong to projects using that library'
        >(),
        'sonarjs/todo-tag': disable<'Covered by no-warning-comments'>(),
        'sonarjs/too-many-break-or-continue-in-loop': disable<
            'Continue is prohibited and break use is judged by readability'
        >(),
        'sonarjs/unicode-aware-regex': disable<'Covered by require-unicode-regexp'>(),
        'sonarjs/unused-import': disable<'Covered by no-unused-vars and its TypeScript extension'>(),
        'sonarjs/unused-named-groups': 'error',
        'sonarjs/unverified-certificate': disable<'Enabled only in the node preset'>(),
        'sonarjs/unverified-hostname': disable<'Enabled only in the node preset'>(),
        'sonarjs/updated-const-var': disable<'Covered by no-const-assign'>(),
        'sonarjs/updated-loop-counter': 'error',
        'sonarjs/use-type-alias': 'error',
        'sonarjs/values-not-convertible-to-numbers': disable<
            'Numeric conversion validity depends on application types and validation'
        >(),
        'sonarjs/variable-name': disable<'Identifier naming is configured by the active language preset'>(),
        'sonarjs/vitest-mock-at-module-scope': disable<'Vitest mock placement belongs to Vitest projects'>(),
        'sonarjs/void-use': disable<'Covered by no-void'>(),
        'sonarjs/weak-ssl': disable<'Enabled only in the node preset'>(),
        'sonarjs/x-powered-by': disable<'Server identification headers depend on the consuming server application'>(),
        'sonarjs/xml-parser-xxe': disable<'XML entity policy belongs to projects using an XML parser'>(),

        'promise/avoid-new': disable<'Promise construction is needed when adapting callback APIs'>(),
        'promise/no-nesting': 'error',
        'promise/no-promise-in-callback': 'error',
        'promise/no-callback-in-promise': 'error',
        'promise/no-native': disable<'Native promises are preferred'>(),
        'promise/prefer-await-to-callbacks': disable<'Callback APIs may be required by external contracts'>(),
        'promise/catch-or-return': 'error',
        'promise/always-return': disable<'Promise callbacks may intentionally return no value'>(),
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
        'no-barrel-files/prefer-source-imports': 'error',

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
        'regexp/no-control-character': disable<'Covered by no-control-regex'>(),
        'regexp/no-dupe-characters-character-class': disable<'Covered by sonarjs/duplicates-in-character-class'>(),
        'regexp/no-empty-alternative': disable<'Covered by sonarjs/no-empty-alternatives'>(),
        'regexp/no-empty-character-class': disable<'Covered by no-empty-character-class'>(),
        'regexp/no-invalid-regexp': disable<'Covered by no-invalid-regexp'>(),
        'regexp/no-misleading-unicode-character': disable<'Covered by no-misleading-character-class'>(),
        'regexp/no-useless-backreference': disable<'Covered by no-useless-backreference'>(),
        'regexp/no-useless-escape': disable<'Covered by no-useless-escape'>(),
        'regexp/prefer-character-class': disable<'Overlaps unicorn/better-regex and sonarjs/concise-regex'>(),
        'regexp/prefer-d': disable<'Overlaps unicorn/better-regex'>(),
        'regexp/prefer-named-capture-group': disable<'Covered by prefer-named-capture-group'>(),
        'regexp/prefer-plus-quantifier': disable<'Overlaps unicorn/better-regex'>(),
        'regexp/prefer-question-quantifier': disable<'Overlaps unicorn/better-regex'>(),
        'regexp/prefer-regexp-exec': disable<
            'Handled by @typescript-eslint/prefer-regexp-exec in the typescript preset'
        >(),
        'regexp/prefer-regexp-test': disable<'Covered by unicorn/prefer-regexp-test'>(),
        'regexp/prefer-star-quantifier': disable<'Overlaps unicorn/better-regex'>(),
        'regexp/prefer-w': disable<'Overlaps unicorn/better-regex'>(),
        'regexp/require-unicode-regexp': disable<'Covered by require-unicode-regexp'>(),
        'regexp/strict': disable<'Overlaps unicorn/better-regex'>(),

        // Pure style preferences outside the project's scope.
        'regexp/grapheme-string-literal': disable<'Unicode string notation need not use grapheme escapes'>(),
        'regexp/hexadecimal-escape': disable<'Equivalent hexadecimal escape spellings are allowed'>(),
        'regexp/letter-case': disable<'Regular expression letter casing need not follow a fixed style'>(),
        'regexp/prefer-lookaround': disable<'Lookarounds are not required over explicit matching groups'>(),
        'regexp/prefer-predefined-assertion': disable<'Equivalent assertion forms are allowed'>(),
        'regexp/prefer-quantifier': disable<'Explicit repetition may be clearer than a quantifier'>(),
        'regexp/prefer-range': disable<'Explicit character lists are allowed'>(),
        'regexp/require-unicode-sets-regexp': disable<
            'Unicode sets mode depends on the consuming runtime and expression semantics'
        >(),
        'regexp/sort-alternatives': disable<'Alternatives may follow domain order'>(),
        'regexp/sort-character-class-elements': disable<'Character class elements may follow domain order'>(),
        'regexp/sort-flags': disable<'Regular expression flag order is not prescribed'>(),
        'regexp/unicode-escape': disable<'Equivalent Unicode escape spellings are allowed'>(),
        'regexp/unicode-property': disable<'Unicode property spelling need not follow a fixed style'>(),
        'regexp/use-ignore-case': disable<'Explicit case variants are allowed'>()
    }
};
