import codeSpellChecker from '@cspell/eslint-plugin';
import eslintCommentsPlugin from '@eslint-community/eslint-plugin-eslint-comments';
import importPlugin, { createNodeResolver } from 'eslint-plugin-import-x';
import noSecretsPlugin from 'eslint-plugin-no-secrets';
import { ecmaVersion, javascriptExtensions } from '../../constants.ts';
import { bestPracticesRuleSet } from '../../rule-sets/best-practices.ts';
import {
    baseRestrictedSyntaxPlugin,
    noClassDeclarationRestriction,
    noEmptyFunctionBodyRestriction,
    noInOperatorRestriction,
    noSwitchStatementRestriction
} from '../../rule-sets/restricted-syntax.ts';
import { stylisticRuleSet } from '../../rule-sets/stylistic.ts';
import { disable } from '../../rule-severity.ts';

export const cspellSpellcheckerOptions = {
    autoFix: false,
    numSuggestions: 3,
    generateSuggestions: true,
    ignoreImports: true,
    ignoreImportProperties: true,
    checkIdentifiers: true,
    checkStrings: true,
    checkStringTemplates: true,
    checkJSXText: true,
    checkComments: true,
    cspell: {
        words: [],
        ignoreWords: [],
        flagWords: [],
        ignoreRegExpList: [],
        includeRegExpList: [],
        allowCompoundWords: true,
        import: [],
        dictionaries: []
    },
    customWordListFile: undefined,
    debugMode: false
};

export const baseSharedConfig = {
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
        'no-secrets': noSecretsPlugin,
        '@cspell': codeSpellChecker,
        'restricted-syntax': baseRestrictedSyntaxPlugin
    },
    settings: {
        ...stylisticRuleSet.settings,
        ...bestPracticesRuleSet.settings,
        'import/parsers': {
            espree: javascriptExtensions
        },
        'import-x/resolver-next': [ createNodeResolver() ]
    },
    rules: {
        ...stylisticRuleSet.rules,
        ...bestPracticesRuleSet.rules,

        'array-callback-return': [
            'error',
            {
                allowImplicit: false,
                checkForEach: true,
                allowVoid: false
            }
        ],
        camelcase: disable<'External property names need not use camelCase'>(),
        'no-array-constructor': 'error',
        'no-bitwise': 'error',
        'no-caller': 'error',
        'no-case-declarations': 'error',
        'no-class-assign': 'error',
        'no-cond-assign': 'error',
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
        'no-else-return': [ 'error', { allowElseIf: false } ],
        'no-empty': [ 'error', { allowEmptyCatch: true } ],
        'no-empty-character-class': 'error',
        'no-empty-function': disable<'Covered by restricted-syntax/no-empty-function-body'>(),
        'no-empty-pattern': 'error',
        'no-empty-static-block': 'error',
        'no-eq-null': 'error',
        'no-eval': 'error',
        'no-ex-assign': 'error',
        'no-extend-native': 'error',
        'no-extra-bind': 'error',
        'no-extra-boolean-cast': 'error',
        'no-extra-label': 'error',
        'no-fallthrough': 'error',
        'no-func-assign': 'error',
        'no-implicit-coercion': 'error',
        'no-implicit-globals': 'error',
        'no-implied-eval': 'error',
        'no-inline-comments': disable<'Inline explanations are allowed'>(),
        'no-inner-declarations': [ 'error', 'functions' ],
        'no-invalid-regexp': 'error',
        'no-invalid-this': disable<'JavaScript callbacks may intentionally bind this'>(),
        'no-irregular-whitespace': 'error',
        'no-iterator': 'error',
        'no-label-var': 'error',
        'no-labels': 'error',
        'no-lone-blocks': 'error',
        'no-lonely-if': 'error',
        'no-loop-func': 'error',
        'no-new-native-nonconstructor': 'error',
        'no-multi-str': 'error',
        'no-global-assign': 'error',
        'no-negated-condition': disable<'Covered by unicorn/no-negated-condition'>(),
        'no-nested-ternary': 'error',
        'no-new': 'error',
        'no-new-func': 'error',
        'no-new-wrappers': 'error',
        'no-obj-calls': 'error',
        'no-object-constructor': 'error',
        'no-octal': 'error',
        'no-octal-escape': 'error',
        'no-param-reassign': [ 'error', { props: true } ],
        'no-plusplus': 'error',
        'no-proto': 'error',
        'no-prototype-builtins': 'error',
        'no-redeclare': [ 'error', { builtinGlobals: true } ],
        'no-regex-spaces': 'error',
        'no-restricted-syntax': disable<'Restrictions use individually configurable restricted-syntax rules'>(),
        'restricted-syntax/no-class-declaration': [ 'error', noClassDeclarationRestriction ],
        'restricted-syntax/no-switch-statement': [ 'error', noSwitchStatementRestriction ],
        'restricted-syntax/no-empty-function-body': [ 'error', noEmptyFunctionBodyRestriction ],
        'restricted-syntax/no-in-operator': [ 'error', noInOperatorRestriction ],
        'restricted-syntax/no-unnecessary-arrow-function': 'error',
        'no-return-assign': [ 'error', 'always' ],
        'no-self-assign': [ 'error', { props: true } ],
        'no-self-compare': 'error',
        'no-sequences': 'error',
        'no-shadow': [ 'error', { builtinGlobals: true } ],
        'no-shadow-restricted-names': 'error',
        'no-sparse-arrays': 'error',
        'no-ternary': disable<'Ternaries are preferred for value selection'>(),
        'no-this-before-super': 'error',
        'no-throw-literal': 'error',
        'no-unassigned-vars': 'error',
        'no-undef': [ 'error', { typeof: true } ],
        'no-undef-init': 'error',
        'no-undefined': disable<'Explicit undefined values are allowed'>(),
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
        'no-void': 'error',
        'prefer-const': [
            'error',
            {
                destructuring: 'all'
            }
        ],
        'prefer-spread': 'error',
        'prefer-template': 'error',
        'preserve-caught-error': 'error',
        'no-var': 'error',
        'no-warning-comments': [
            'error',
            {
                terms: [
                    'todo',
                    'fixme',
                    'wtf',
                    'falls through',
                    'istanbul',
                    'c8',
                    'v8 ignore',
                    'node:coverage',
                    'prettier-ignore',
                    'dprint-ignore',
                    'cspell:disable',
                    'cspell:ignore',
                    'cspell:words',
                    'Stryker disable',
                    'Stryker restore'
                ],
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
                ignore: [ -1, 0, 1 ]
            }
        ],
        'arrow-body-style': [ 'error', 'always' ],
        'accessor-pairs': [
            'error',
            {
                enforceForClassMembers: true
            }
        ],
        'block-scoped-var': disable<'Use block-scoped declarations enforced by no-var'>(),
        complexity: [ 'error', { max: 6 } ],
        'consistent-return': 'error',
        'consistent-this': [ 'error', 'self' ],
        'constructor-super': 'error',
        curly: [ 'error', 'all' ],
        'default-case': 'error',
        'dot-notation': 'error',
        eqeqeq: 'error',
        'func-names': disable<'Function names are required only when they clarify intent'>(),
        'func-style': disable<'Declarations and expressions are both allowed'>(),
        'guard-for-in': 'error',
        'id-length': [ 'error', { min: 2, properties: 'never' } ],
        'init-declarations': [ 'error', 'always' ],
        'max-depth': [ 'error', { max: 5 } ],
        'max-lines': [ 'error', { max: 500, skipBlankLines: true, skipComments: true } ],
        'max-nested-callbacks': [ 'error', { max: 4 } ],
        'max-params': [ 'error', { max: 4 } ],
        'max-statements': [ 'error', { max: 10 } ],
        'new-cap': [
            'error',
            {
                newIsCap: true,
                capIsNew: true
            }
        ],
        'object-shorthand': [ 'error', 'always' ],
        'one-var': [ 'error', 'never' ],
        'operator-assignment': [ 'error', 'always' ],
        'prefer-arrow-callback': disable<'Named function callbacks are allowed when they clarify intent'>(),
        'prefer-rest-params': 'error',
        radix: 'error',
        'id-match': disable<'No universal identifier pattern is prescribed'>(),
        'require-yield': 'error',
        'sort-vars': disable<'Declarations may follow logical dependency order'>(),
        'sort-imports': disable<'Import ordering is handled by import/order'>(),
        strict: [ 'error', 'safe' ],
        'unicode-bom': [ 'error', 'never' ],
        'use-isnan': 'error',
        'valid-typeof': 'error',
        'vars-on-top': 'error',
        yoda: [ 'error', 'never' ],
        'capitalized-comments': disable<'Comments need not start with a capital letter'>(),
        'class-methods-use-this': 'error',
        'func-name-matching': disable<'Function names may describe a different role from their binding'>(),
        'no-await-in-loop': disable<'Sequential asynchronous work is allowed'>(),
        'no-compare-neg-zero': 'error',
        'no-multi-assign': 'error',
        'no-restricted-properties': disable<'Property restrictions depend on the consuming project'>(),
        'no-template-curly-in-string': 'error',
        'no-unsafe-negation': 'error',
        'no-useless-return': 'error',
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
        'require-await': disable<'Async functions may implement a promise-returning contract without awaiting'>(),
        'sort-keys': disable<'Object properties may follow domain order'>(),
        'symbol-description': 'error',
        'for-direction': 'error',
        'getter-return': [
            'error',
            {
                allowImplicit: false
            }
        ],
        'max-classes-per-file': disable<
            'Class declarations are already prohibited by restricted-syntax/no-class-declaration'
        >(),
        'max-lines-per-function': disable<
            'Nested function bodies count against the enclosing function line limit'
        >(),
        'prefer-object-spread': 'error',
        'no-async-promise-executor': 'error',
        'no-misleading-character-class': 'error',
        'default-param-last': 'error',
        'prefer-regex-literals': 'error',
        'require-unicode-regexp': 'error',
        'no-useless-catch': 'error',
        'prefer-named-capture-group': 'error',
        'no-import-assign': 'error',
        'require-atomic-updates': 'error',

        'no-restricted-imports': disable<
            'Import restrictions use individually configurable restricted-imports rules'
        >(),

        'no-alert': disable<'Enabled only in the browser preset'>(),
        'no-script-url': disable<'Enabled only in the browser preset'>(),
        'no-restricted-globals': disable<'Enabled only in the browser preset'>(),

        'grouped-accessor-pairs': [ 'error', 'getBeforeSet' ],
        'no-constructor-return': 'error',
        'no-dupe-else-if': 'error',
        'no-setter-return': 'error',
        'prefer-exponentiation-operator': 'error',

        'default-case-last': 'error',
        'no-restricted-exports': disable<'Export restrictions depend on the consuming project'>(),
        'no-useless-backreference': 'error',
        'id-denylist': disable<'Identifier deny lists depend on the consuming project'>(),
        'no-loss-of-precision': 'error',
        'no-promise-executor-return': 'error',
        'no-unreachable-loop': 'error',
        'no-nonoctal-decimal-escape': 'error',
        'no-unsafe-optional-chaining': 'error',
        'no-unused-private-class-members': 'error',
        'no-constant-binary-expression': 'error',
        'logical-assignment-operators': [ 'error', 'never' ],
        'prefer-object-has-own': 'error',
        'no-useless-assignment': 'error',

        'no-secrets/no-secrets': [ 'error', { tolerance: 5 } ],
        'no-secrets/no-pattern-match': disable<
            'Secret scanning uses no-secrets/no-secrets without a project-specific pattern list'
        >(),

        'eslint-comments/disable-enable-pair': [
            'error',
            {
                allowWholeFile: true
            }
        ],
        'eslint-comments/no-aggregating-enable': 'error',
        'eslint-comments/no-duplicate-disable': 'error',
        'eslint-comments/no-unused-enable': 'error',
        'eslint-comments/no-restricted-disable': disable<'Any rule may be disabled with an explanation'>(),
        'eslint-comments/no-unlimited-disable': 'error',
        'eslint-comments/no-use': disable<'Explained inline configuration is allowed'>(),
        'eslint-comments/require-description': 'error',

        'import/avoid-barrel-files': disable<'Covered by no-barrel-files/no-barrel-files'>(),
        'import/avoid-importing-barrel-files': disable<'Covered by no-barrel-files/prefer-source-imports'>(),
        'import/avoid-namespace-import': disable<'Covered by sonarjs/no-wildcard-import'>(),
        'import/avoid-re-export-all': disable<'Barrel exports are handled by no-barrel-files/no-barrel-files'>(),
        'import/no-deprecated': 'error',
        'import/exports-last': disable<'Exports may appear with their declarations'>(),
        'import/dynamic-import-chunkname': disable<'Chunk naming depends on the consuming bundler'>(),
        'import/unambiguous': disable<'The preset explicitly selects module source type'>(),
        'import/no-dynamic-require': 'error',
        'import/no-named-export': disable<'Named exports are preferred'>(),
        'import/no-default-export': 'error',
        'import/prefer-default-export': disable<'Conflicts with import/no-default-export'>(),
        'import/newline-after-import': 'error',
        'import/no-nodejs-modules': disable<'Node.js built-ins are allowed in projects that target Node.js'>(),
        'import/max-dependencies': [ 'error', { max: 10 } ],
        'import/first': 'error',
        'import/no-unused-modules': [ 'error', { unusedExports: true, suppressMissingFileEnumeratorAPIWarning: true } ],
        'import/no-anonymous-default-export': disable<
            'Default exports are already prohibited by import/no-default-export'
        >(),
        'import/no-named-default': disable<'Covered by unicorn/no-named-default'>(),
        'import/no-cycle': 'error',
        'import/no-relative-parent-imports': disable<'Relative imports across parent directories are allowed'>(),
        'import/group-exports': disable<'Exports may appear with their declarations'>(),
        'import/no-internal-modules': disable<'Public subpath imports are allowed'>(),
        'import/no-restricted-paths': disable<'Import boundaries depend on the consuming project'>(),
        'import/named': disable<'TypeScript is preferred for named import validation'>(),
        'import/no-namespace': disable<'Covered by sonarjs/no-wildcard-import'>(),
        'import/default': 'error',
        'import/export': 'error',
        'import/extensions': [
            'error',
            {
                js: 'ignorePackages',
                jsx: 'ignorePackages',
                json: 'ignorePackages'
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
        'import/no-unresolved': disable<'Resolution can misreport ESM packages that use package.json exports'>(),
        'import/no-relative-packages': disable<'Relative workspace imports are allowed'>(),
        'import/no-import-module-exports': disable<'CommonJS imports are already prohibited by import/no-commonjs'>(),
        'import/no-empty-named-blocks': 'error',
        'import/consistent-type-specifier-style': disable<
            'Type import style is configured by @typescript-eslint/consistent-type-imports'
        >(),
        'import/no-rename-default': disable<'Default import names may reflect their local role'>(),
        'import/prefer-namespace-import': disable<'Named imports are allowed'>(),

        '@cspell/spellchecker': [ 'error', cspellSpellcheckerOptions ]
    }
};
