import test from 'ava';
import typescriptParser from '@typescript-eslint/parser';
import { RuleTester } from 'eslint';
import { builtinRules } from 'eslint/use-at-your-own-risk';
import {
    createNoClassDeclarationRestriction,
    noClassDeclarationRestriction,
    noEmptyFunctionBodyRestriction,
    noSwitchStatementRestriction
} from '../configs/rule-sets/restricted-syntax.js';
import { noInlineSignatureTypeLiteralRestriction, noTsEnumDeclarationRestriction } from '../configs/typescript.js';

const noRestrictedSyntaxRule = builtinRules.get('no-restricted-syntax');

const javascriptRuleTester = new RuleTester({
    languageOptions: { ecmaVersion: 'latest', sourceType: 'module' }
});

const typescriptRuleTester = new RuleTester({
    languageOptions: {
        parser: typescriptParser,
        ecmaVersion: 'latest',
        sourceType: 'module'
    }
});

function runRuleCases(t, ruleTester, restriction, cases) {
    const valid = cases.valid.map((code) => {
        return { code, options: [restriction] };
    });
    const invalid = cases.invalid.map((entry) => {
        const code = typeof entry === 'string' ? entry : entry.code;
        const count = typeof entry === 'string' ? 1 : entry.count;
        return {
            code,
            options: [restriction],
            errors: Array.from({ length: count }, () => {
                return { message: restriction.message };
            })
        };
    });

    t.notThrows(() => {
        ruleTester.run('no-restricted-syntax', noRestrictedSyntaxRule, { valid, invalid });
    });
}

test('noClassDeclarationRestriction permits Error subclasses but forbids other classes', (t) => {
    runRuleCases(t, javascriptRuleTester, noClassDeclarationRestriction, {
        valid: [
            'class FooError extends Error {}',
            'class CustomError extends Error { constructor() { super(); } }',
            'const x = 1;',
            'function noop() {}'
        ],
        invalid: [
            'class Foo {}',
            'class Foo extends Bar {}',
            'class MyStack extends Stack {}',
            'class Wrapper extends ns.Error {}'
        ]
    });
});

test('createNoClassDeclarationRestriction with CDK pattern permits CDK base classes', (t) => {
    const cdkRestriction = createNoClassDeclarationRestriction({
        allowedSuperClassNamePattern: '/(Error|Construct|Stack|Resource)$/',
        message: 'CDK class restriction'
    });

    runRuleCases(t, javascriptRuleTester, cdkRestriction, {
        valid: [
            'class FooError extends Error {}',
            'class MyConstruct extends Construct {}',
            'class MyStack extends Stack {}',
            'class MyNestedStack extends NestedStack {}',
            'class MyResource extends Resource {}',
            'class MyBucket extends BaseResource {}'
        ],
        invalid: ['class Foo {}', 'class MyBucket extends Bucket {}', 'class MyHelper extends Helper {}']
    });
});

test('noSwitchStatementRestriction forbids switch statements', (t) => {
    runRuleCases(t, javascriptRuleTester, noSwitchStatementRestriction, {
        valid: ['if (x === 1) { a(); } else { b(); }', 'const result = x === 1 ? a() : b();'],
        invalid: [
            'switch (x) { case 1: break; default: break; }',
            'function pick(x) { switch (x) { case "a": return 1; default: return 0; } }'
        ]
    });
});

test('noEmptyFunctionBodyRestriction forbids empty bodies even with comments', (t) => {
    runRuleCases(t, javascriptRuleTester, noEmptyFunctionBodyRestriction, {
        valid: [
            'function foo() { return 1; }',
            'const arrow = () => { return 1; };',
            'const expr = function () { return 1; };',
            'const lambda = () => 1;'
        ],
        invalid: [
            'function foo() {}',
            'function foo() { /* intentionally empty */ }',
            'const arrow = () => {};',
            'const arrow = () => { /* noop */ };',
            'const expr = function () {};'
        ]
    });
});

test('noTsEnumDeclarationRestriction forbids TS enum declarations', (t) => {
    runRuleCases(t, typescriptRuleTester, noTsEnumDeclarationRestriction, {
        valid: ['type Color = "red" | "green" | "blue";', 'const Color = { red: "red", green: "green" } as const;'],
        invalid: ['enum Color { Red, Green, Blue }', 'const enum Status { Active, Inactive }']
    });
});

test('noInlineSignatureTypeLiteralRestriction forbids inline object types in function signatures', (t) => {
    runRuleCases(t, typescriptRuleTester, noInlineSignatureTypeLiteralRestriction, {
        valid: [
            'function foo(x: NamedType): NamedType { return x; }',
            'function foo(x: string | number): boolean { return true; }',
            'const arrow = (x: NamedType): NamedType => x;',
            'type Handler = (event: NamedEvent) => NamedResult;',
            'function foo(): void {}',
            'const obj: { a: number } = { a: 1 };',
            'function foo(): NamedType { const inner: { b: string } = { b: "x" }; return inner as unknown as NamedType; }'
        ],
        invalid: [
            'function foo(x: { a: number }): void {}',
            'function foo(): { b: string } { return { b: "x" }; }',
            { code: 'const arrow = (x: { a: number }): { b: string } => ({ b: "x" });', count: 2 },
            'function foo(x: { a: number } = { a: 1 }): void {}',
            'function foo({ x }: { x: number }): void {}',
            'type Handler = (event: { id: string }) => void;',
            'declare function foo(x: { a: number }): void;'
        ]
    });
});
