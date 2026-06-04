import assert from 'node:assert';
import { suite, test } from 'mocha';
import { baseConfig } from '../../configs/presets/base/base.js';
import { typescriptConfig } from '../../configs/presets/typescript/typescript.js';
import { fixFixture, lintFixture, resolveFixture, uniqueSortedRuleIds } from './lint-fixture.js';

const comboName = 'base-typescript';
const configs = [ ...baseConfig, { ...typescriptConfig, files: [ '**/*.ts' ] } ];

const expectedViolationRuleIds = [
    '@stylistic/array-bracket-spacing',
    '@stylistic/no-extra-parens',
    '@typescript-eslint/array-type',
    '@typescript-eslint/ban-ts-comment',
    '@typescript-eslint/consistent-type-assertions',
    '@typescript-eslint/consistent-type-definitions',
    '@typescript-eslint/default-param-last',
    '@typescript-eslint/explicit-member-accessibility',
    '@typescript-eslint/max-params',
    '@typescript-eslint/method-signature-style',
    '@typescript-eslint/naming-convention',
    '@typescript-eslint/no-confusing-void-expression',
    '@typescript-eslint/no-explicit-any',
    '@typescript-eslint/no-extraneous-class',
    '@typescript-eslint/no-floating-promises',
    '@typescript-eslint/no-inferrable-types',
    '@typescript-eslint/no-magic-numbers',
    '@typescript-eslint/no-namespace',
    '@typescript-eslint/no-non-null-assertion',
    '@typescript-eslint/no-shadow',
    '@typescript-eslint/no-this-alias',
    '@typescript-eslint/no-unnecessary-condition',
    '@typescript-eslint/no-unnecessary-type-assertion',
    '@typescript-eslint/no-unsafe-assignment',
    '@typescript-eslint/no-unsafe-call',
    '@typescript-eslint/no-unsafe-member-access',
    '@typescript-eslint/no-unsafe-type-assertion',
    '@typescript-eslint/no-unused-vars',
    '@typescript-eslint/no-useless-constructor',
    '@typescript-eslint/only-throw-error',
    '@typescript-eslint/parameter-properties',
    '@typescript-eslint/prefer-as-const',
    '@typescript-eslint/prefer-for-of',
    '@typescript-eslint/prefer-includes',
    '@typescript-eslint/prefer-nullish-coalescing',
    '@typescript-eslint/prefer-optional-chain',
    '@typescript-eslint/prefer-return-this-type',
    '@typescript-eslint/promise-function-async',
    '@typescript-eslint/related-getter-setter-pairs',
    '@typescript-eslint/require-array-sort-compare',
    '@typescript-eslint/strict-boolean-expressions',
    '@typescript-eslint/triple-slash-reference',
    'complexity',
    'default-case',
    'dprint/typescript',
    'eqeqeq',
    'functional/no-this-expressions',
    'functional/prefer-immutable-types',
    'functional/type-declaration-immutability',
    'id-length',
    'import/no-duplicates',
    'init-declarations',
    'max-depth',
    'max-statements',
    'no-bitwise',
    'no-console',
    'no-constant-condition',
    'no-debugger',
    'no-duplicate-imports',
    'no-eq-null',
    'no-nested-ternary',
    'no-param-reassign',
    'no-plusplus',
    'no-proto',
    'no-template-curly-in-string',
    'no-throw-literal',
    'no-undef',
    'no-unneeded-ternary',
    'no-useless-catch',
    'no-useless-concat',
    'no-useless-rename',
    'no-var',
    'no-warning-comments',
    'operator-assignment',
    'prefer-template',
    'promise/catch-or-return',
    'restricted-syntax-typescript/no-inline-signature-type-literal',
    'restricted-syntax-typescript/no-public-class-property',
    'restricted-syntax/no-class-declaration',
    'restricted-syntax/no-empty-function-body',
    'restricted-syntax/no-switch-statement',
    'restricted-syntax/no-unnecessary-arrow-function',
    'sonarjs/deprecation',
    'sonarjs/no-alphabetical-sort',
    'sonarjs/no-collapsible-if',
    'sonarjs/no-nested-conditional',
    'sonarjs/no-small-switch',
    'sonarjs/no-unused-collection',
    'sonarjs/no-useless-catch',
    'sonarjs/prefer-promise-shorthand',
    'sonarjs/todo-tag',
    'unicorn/catch-error-name',
    'unicorn/error-message',
    'unicorn/no-array-sort',
    'unicorn/no-await-expression-member',
    'unicorn/no-for-loop',
    'unicorn/no-immediate-mutation',
    'unicorn/no-lonely-if',
    'unicorn/no-process-exit',
    'unicorn/no-this-assignment',
    'unicorn/numeric-separators-style',
    'unicorn/prefer-includes',
    'unicorn/prefer-math-trunc',
    'unicorn/prefer-node-protocol',
    'unicorn/prefer-string-slice'
];

suite('base+typescript integration', function () {
    test('base+typescript violations fixture reports the expected rule ids', async function () {
        const { messages } = await lintFixture(configs, comboName, 'violations.ts');
        assert.deepStrictEqual(uniqueSortedRuleIds(messages), expectedViolationRuleIds);
    });

    test('base+typescript clean fixture produces no reports', async function () {
        const { messages } = await lintFixture(configs, comboName, 'clean.ts');
        const detail = messages.map(function toRuleLocation(message) {
            return { ruleId: message.ruleId, line: message.line, message: message.message };
        });
        assert.deepStrictEqual(detail, []);
    });

    test('base+typescript autofix is idempotent on the violations fixture', async function () {
        const { code, filePath } = await resolveFixture(comboName, 'violations.ts');
        const firstPass = fixFixture(configs, code, filePath);
        const secondPass = fixFixture(configs, firstPass.output, filePath);
        assert.strictEqual(secondPass.output, firstPass.output, 'second autofix pass changed the output');
        assert.strictEqual(secondPass.fixed, false, 'second autofix pass reported further fixes');
    });

    test('base+typescript built-in mutable classes do not poison immutability checks', async function () {
        const { messages } = await lintFixture(configs, comboName, 'builtin-classes.ts');
        const immutabilityMessages = messages
            .filter(function isImmutabilityMessage(message) {
                return message.ruleId === 'functional/prefer-immutable-types' ||
                    message.ruleId === 'functional/type-declaration-immutability';
            })
            .map(function toRuleLocation(message) {
                return { ruleId: message.ruleId, line: message.line, message: message.message };
            });
        assert.deepStrictEqual(immutabilityMessages, []);
    });

    test('base+typescript named class/interface parameters pass while inline mutable parameters are flagged', async function () {
        const { messages } = await lintFixture(configs, comboName, 'named-class-type-parameters.ts');
        const flaggedLines = new Set(
            messages
                .filter(function isImmutableTypesMessage(message) {
                    return message.ruleId === 'functional/prefer-immutable-types';
                })
                .map(function toLine(message) {
                    return message.line;
                })
        );
        const acceptedNamedTypeLines = new Set([ 33, 34, 35, 36, 37 ]);
        const expectedInlineMutableLines = new Set([ 40, 41, 42, 43, 44 ]);
        const unexpectedNamedTypeReports = Array.from(acceptedNamedTypeLines).filter(function isFlagged(line) {
            return flaggedLines.has(line);
        });
        const missingInlineMutableReports = Array.from(expectedInlineMutableLines).filter(function isNotFlagged(line) {
            return !flaggedLines.has(line);
        });
        assert.deepStrictEqual(unexpectedNamedTypeReports, [], 'named class/interface parameters must not be flagged');
        assert.deepStrictEqual(
            missingInlineMutableReports,
            [],
            'inline mutable parameter types must still be flagged'
        );
    });

    test('base+typescript named-reference-shaped parameters (typeof, unions, utility wrappers) are accepted while inferred mutable types stay flagged', async function () {
        const { messages } = await lintFixture(configs, comboName, 'named-reference-shapes.ts');
        const flaggedLines = new Set(
            messages
                .filter((message) => {
                    return message.ruleId === 'functional/prefer-immutable-types';
                })
                .map((message) => {
                    return message.line;
                })
        );
        const acceptedNamedReferenceLines = new Set([ 40, 41, 42, 43 ]);
        const expectedFlaggedLines = new Set([ 47, 50, 51 ]);
        const unexpectedNamedReferenceReports = Array.from(acceptedNamedReferenceLines).filter(
            (line) => {
                return flaggedLines.has(line);
            }
        );
        const missingFlaggedReports = Array.from(expectedFlaggedLines).filter((line) => {
            return !flaggedLines.has(line);
        });
        assert.deepStrictEqual(
            unexpectedNamedReferenceReports,
            [],
            'named-reference-shaped parameter types must not be flagged'
        );
        assert.deepStrictEqual(
            missingFlaggedReports,
            [],
            'lowercase-namespaced inferred mutable types and inline mutable types must still be flagged'
        );
    });

    test('base+typescript named-reference-shaped type aliases are accepted while inline structural aliases stay flagged', async function () {
        const { messages } = await lintFixture(configs, comboName, 'named-reference-shapes.ts');
        const flaggedLines = new Set(
            messages
                .filter((message) => {
                    return message.ruleId === 'functional/type-declaration-immutability';
                })
                .map((message) => {
                    return message.line;
                })
        );
        const acceptedAliasLines = new Set([ 54, 55, 56, 57 ]);
        const expectedFlaggedAliasLines = new Set([ 61, 65, 66 ]);
        const unexpectedAliasReports = Array.from(acceptedAliasLines).filter((line) => {
            return flaggedLines.has(line);
        });
        const missingAliasReports = Array.from(expectedFlaggedAliasLines).filter((line) => {
            return !flaggedLines.has(line);
        });
        assert.deepStrictEqual(
            unexpectedAliasReports,
            [],
            'named-reference-shaped type aliases must not be flagged'
        );
        assert.deepStrictEqual(
            missingAliasReports,
            [],
            'lowercase-namespaced inferred mutable aliases and inline mutable aliases must still be flagged'
        );
    });
});
