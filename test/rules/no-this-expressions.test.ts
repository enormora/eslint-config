import { RuleTester } from '@typescript-eslint/rule-tester';
import { AST_NODE_TYPES } from '@typescript-eslint/utils';
import { suite, suiteTeardown, test } from 'mocha';
import {
    noThisExpressionsRule
} from '../../configs/plugins/enormora-typescript/no-this-expressions.ts';

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

const thisExpression = AST_NODE_TYPES.ThisExpression;

ruleTester.run('no-this-expressions', noThisExpressionsRule, {
    valid: [
        { code: 'class C { constructor() { this.x = 1; } public x = 0; }' },
        { code: 'class C { method(): void { this.x = 1; } public x = 0; }' },
        { code: 'class C { static method(): void { this.x = 1; } static x = 0; }' },
        { code: 'class C { public x = 0; get value(): number { return this.x; } }' },
        { code: 'class C { public x = 0; set value(value: number) { this.x = value; } }' },
        { code: 'class C { public x = 0; readonly self = this; }' },
        { code: 'class C { public x = 0; readonly compute = this.x + 1; }' },
        { code: 'class C { public x = 0; readonly handler = (): number => this.x; }' },
        { code: 'class C { public x = 0; method(): void { const inner = (): number => this.x; inner(); } }' },
        { code: 'class C { static x = 0; static { this.x = 1; } }' },
        {
            code: [
                'class Boom extends Error {',
                '    code: string;',
                '    constructor(message: string, code: string) {',
                '        super(message);',
                '        this.code = code;',
                '        this.name = "Boom";',
                '    }',
                '}'
            ]
                .join('\n')
        }
    ],
    invalid: [
        {
            code: 'this.foo = 1;',
            errors: [
                {
                    messageId: 'unexpectedThis',
                    type: thisExpression,
                    line: 1,
                    column: 1,
                    endLine: 1,
                    endColumn: 5
                }
            ]
        },
        {
            code: 'function f(): unknown { return this; }',
            errors: [
                {
                    messageId: 'unexpectedThis',
                    type: thisExpression,
                    line: 1,
                    column: 32,
                    endLine: 1,
                    endColumn: 36
                }
            ]
        },
        {
            code: 'const f = function(): unknown { return this; };',
            errors: [
                {
                    messageId: 'unexpectedThis',
                    type: thisExpression,
                    line: 1,
                    column: 40,
                    endLine: 1,
                    endColumn: 44
                }
            ]
        },
        {
            code: 'const obj = { method(): unknown { return this; } }; obj.method();',
            errors: [
                {
                    messageId: 'unexpectedThis',
                    type: thisExpression,
                    line: 1,
                    column: 42,
                    endLine: 1,
                    endColumn: 46
                }
            ]
        },
        {
            code: 'class C { method(): void { function inner(): unknown { return this; } inner(); } }',
            errors: [
                {
                    messageId: 'unexpectedThis',
                    type: thisExpression,
                    line: 1,
                    column: 63,
                    endLine: 1,
                    endColumn: 67
                }
            ]
        },
        {
            code: 'const arrow = (): unknown => this;',
            errors: [
                {
                    messageId: 'unexpectedThis',
                    type: thisExpression,
                    line: 1,
                    column: 30,
                    endLine: 1,
                    endColumn: 34
                }
            ]
        }
    ]
});
