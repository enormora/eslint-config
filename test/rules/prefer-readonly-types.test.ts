import assert from 'node:assert';
import { RuleTester } from '@typescript-eslint/rule-tester';
import { AST_NODE_TYPES } from '@typescript-eslint/utils';
import { Linter } from 'eslint';
import typescriptParser from '@typescript-eslint/parser';
import { suite, suiteTeardown, test } from 'mocha';
import {
    enormoraTypescriptPlugin
} from '../../configs/plugins/enormora-typescript/enormora-typescript-plugin.ts';
import {
    preferReadonlyTypesRule
} from '../../configs/plugins/enormora-typescript/prefer-readonly-types.ts';

RuleTester.afterAll = suiteTeardown;
RuleTester.describe = function registerSuite(name: string, fn: () => void): void {
    suite(name, fn);
};
RuleTester.it = function registerTest(name: string, fn: () => void): void {
    test(name, fn);
};
RuleTester.itOnly = function registerTestOnly(name: string, fn: () => void): void {
    test(name, fn);
};

const ruleTester = new RuleTester({
    languageOptions: {
        parserOptions: {
            projectService: {
                allowDefaultProject: [ '*.ts*' ]
            },
            tsconfigRootDir: process.cwd()
        }
    }
});

const propertySignatureType = AST_NODE_TYPES.TSPropertySignature;
const indexSignatureType = AST_NODE_TYPES.TSIndexSignature;
const arrayType = AST_NODE_TYPES.TSArrayType;
const tupleType = AST_NODE_TYPES.TSTupleType;
const mappedType = AST_NODE_TYPES.TSMappedType;
const typeReferenceType = AST_NODE_TYPES.TSTypeReference;

ruleTester.run('prefer-readonly-types', preferReadonlyTypesRule, {
    valid: [
        // Surface-level property in a top-level type alias is handled by the existing
        // functional/* rules — our rule deliberately skips it to avoid double-reporting.
        { code: 'type Surface = { foo: string };' },
        // Surface-level property in an interface body — same reason.
        { code: 'interface Surface { foo: string }' },
        // Top-level array — no enclosing literal, our rule skips.
        { code: 'type Surface = string[];' },
        // Function parameter array — no enclosing literal, our rule skips.
        { code: 'declare function takeArr(items: string[]): void;' },
        // Variable annotation array — no enclosing literal.
        { code: 'declare const items: string[];' },
        // Nested property already readonly.
        { code: 'type Nested = { readonly outer: { readonly inner: string } };' },
        // Nested array already wrapped in readonly.
        { code: 'type Nested = { readonly outer: readonly string[] };' },
        // Nested tuple already wrapped.
        { code: 'type Nested = { readonly outer: readonly [string, number] };' },
        // Nested mapped type already readonly.
        { code: 'type Nested = { readonly outer: { readonly [K in string]: number } };' },
        // Nested ReadonlyArray reference.
        { code: 'type Nested = { readonly outer: ReadonlyArray<string> };' },
        // Nested ReadonlyMap / ReadonlySet references.
        { code: 'type Nested = { readonly outer: ReadonlyMap<string, number> };' },
        { code: 'type Nested = { readonly outer: ReadonlySet<string> };' },
        // Record wrapped in Readonly already.
        { code: 'type Nested = { readonly outer: Readonly<Record<string, number>> };' },
        // Named class reference nested inside literal — not recursed into.
        {
            code: [
                'declare class Existing { id: number }',
                'type Wrapper = { readonly outer: Existing };'
            ]
                .join('\n')
        },
        // Index signature already readonly on a nested literal.
        { code: 'type Nested = { readonly outer: { readonly [key: string]: number } };' }
    ],
    invalid: [
        // Nested property missing readonly.
        {
            code: 'type Nested = { readonly outer: { foo: string } };',
            output: 'type Nested = { readonly outer: { readonly foo: string } };',
            errors: [ { messageId: 'propertyShouldBeReadonly', type: propertySignatureType } ]
        },
        // Nested property inside an interface body's literal value.
        {
            code: 'interface Wrapper { readonly outer: { foo: string } }',
            output: 'interface Wrapper { readonly outer: { readonly foo: string } }',
            errors: [ { messageId: 'propertyShouldBeReadonly', type: propertySignatureType } ]
        },
        // Nested index signature missing readonly.
        {
            code: 'type Nested = { readonly outer: { [key: string]: number } };',
            output: 'type Nested = { readonly outer: { readonly [key: string]: number } };',
            errors: [ { messageId: 'indexSignatureShouldBeReadonly', type: indexSignatureType } ]
        },
        // Nested array missing readonly.
        {
            code: 'type Nested = { readonly outer: string[] };',
            output: 'type Nested = { readonly outer: readonly string[] };',
            errors: [ { messageId: 'arrayShouldBeReadonly', type: arrayType } ]
        },
        // Union element wrapped in parens before readonly.
        {
            code: 'type Nested = { readonly outer: (string | number)[] };',
            output: 'type Nested = { readonly outer: readonly (string | number)[] };',
            errors: [ { messageId: 'arrayShouldBeReadonly', type: arrayType } ]
        },
        // Nested tuple missing readonly.
        {
            code: 'type Nested = { readonly outer: [string, number] };',
            output: 'type Nested = { readonly outer: readonly [string, number] };',
            errors: [ { messageId: 'tupleShouldBeReadonly', type: tupleType } ]
        },
        // Tuple with rest array — autofix needs two passes: outer tuple first, then
        // inner array wraps with parens.
        {
            code: 'type Nested = { readonly outer: [string, ...string[]] };',
            output: [
                'type Nested = { readonly outer: readonly [string, ...string[]] };',
                'type Nested = { readonly outer: readonly [string, ...(readonly string[])] };'
            ],
            errors: [
                { messageId: 'tupleShouldBeReadonly', type: tupleType },
                { messageId: 'arrayShouldBeReadonly', type: arrayType }
            ]
        },
        // Nested mapped type missing readonly modifier.
        {
            code: 'type Nested = { readonly outer: { [K in string]: number } };',
            output: 'type Nested = { readonly outer: { readonly [K in string]: number } };',
            errors: [ { messageId: 'mappedTypeShouldBeReadonly', type: mappedType } ]
        },
        // Nested Array<T> reference renamed.
        {
            code: 'type Nested = { readonly outer: Array<string> };',
            output: 'type Nested = { readonly outer: ReadonlyArray<string> };',
            errors: [
                {
                    messageId: 'namedReferenceShouldBeReadonly',
                    type: typeReferenceType,
                    data: { name: 'Array', readonlyName: 'ReadonlyArray' }
                }
            ]
        },
        // Nested Map<K, V> reference renamed.
        {
            code: 'type Nested = { readonly outer: Map<string, number> };',
            output: 'type Nested = { readonly outer: ReadonlyMap<string, number> };',
            errors: [
                {
                    messageId: 'namedReferenceShouldBeReadonly',
                    type: typeReferenceType,
                    data: { name: 'Map', readonlyName: 'ReadonlyMap' }
                }
            ]
        },
        // Nested Set<T> reference renamed.
        {
            code: 'type Nested = { readonly outer: Set<string> };',
            output: 'type Nested = { readonly outer: ReadonlySet<string> };',
            errors: [
                {
                    messageId: 'namedReferenceShouldBeReadonly',
                    type: typeReferenceType,
                    data: { name: 'Set', readonlyName: 'ReadonlySet' }
                }
            ]
        },
        // Nested Record<K, V> wrapped in Readonly<>.
        {
            code: 'type Nested = { readonly outer: Record<string, number> };',
            output: 'type Nested = { readonly outer: Readonly<Record<string, number>> };',
            errors: [ { messageId: 'recordShouldBeReadonly', type: typeReferenceType } ]
        }
    ]
});

// RuleTester only applies one autofix pass per case. For nested arrays/tuples
// the final shape requires multiple passes, so `verifyAndFix` is used here to
// confirm the rule converges to the expected output.
suite('prefer-readonly-types autofix convergence', function () {
    const linter = new Linter({ configType: 'flat' });
    const configs = [
        {
            files: [ '**/*.ts' ],
            plugins: { 'enormora-typescript': enormoraTypescriptPlugin },
            languageOptions: { parser: typescriptParser },
            rules: { 'enormora-typescript/prefer-readonly-types': 'error' }
        }
    ] as unknown as Linter.Config[];

    test('nested array-of-array converges to fully readonly nesting', function () {
        const input = 'type Nested = { readonly outer: string[][] };';
        const expected = 'type Nested = { readonly outer: readonly (readonly string[])[] };';
        const result = linter.verifyAndFix(input, configs, { filename: 'probe.ts' });
        assert.strictEqual(result.output, expected, 'nested array autofix must converge to readonly nesting');
    });

    test('tuple with rest of mutable array converges to nested readonly', function () {
        const input = 'type Nested = { readonly outer: [string, ...string[]] };';
        const expected = 'type Nested = { readonly outer: readonly [string, ...(readonly string[])] };';
        const result = linter.verifyAndFix(input, configs, { filename: 'probe.ts' });
        assert.strictEqual(result.output, expected, 'tuple rest autofix must converge to readonly nesting');
    });
});
