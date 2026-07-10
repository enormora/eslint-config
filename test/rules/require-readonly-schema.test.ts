import { RuleTester } from '@typescript-eslint/rule-tester';
import { AST_NODE_TYPES } from '@typescript-eslint/utils';
import { suite, suiteTeardown, test } from 'mocha';
import {
    requireReadonlySchemaRule
} from '../../configs/plugins/enormora-zod/require-readonly-schema.ts';

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

type ExpectedError = {
    readonly messageId: 'schemaShouldBeReadonly';
    readonly type: AST_NODE_TYPES;
    readonly line: number;
    readonly column: number;
    readonly endLine: number;
    readonly endColumn: number;
};

function schemaError(column: number, endColumn: number): ExpectedError {
    return {
        messageId: 'schemaShouldBeReadonly',
        type: AST_NODE_TYPES.CallExpression,
        line: 1,
        column,
        endLine: 1,
        endColumn
    };
}

ruleTester.run('require-readonly-schema', requireReadonlySchemaRule, {
    valid: [
        { code: 'z.readonly(z.object({ a: z.string() }));' },
        { code: 'z.readonly(z.strictObject({ a: z.string() }));' },
        { code: 'z.readonly(z.looseObject({ a: z.string() }));' },
        { code: 'z.readonly(z.array(z.string()));' },
        { code: 'z.readonly(z.tuple([ z.string() ]));' },
        { code: 'z.readonly(z.record(z.string(), z.number()));' },
        { code: 'z.readonly(z.map(z.string(), z.number()));' },
        { code: 'z.readonly(z.set(z.string()));' },
        { code: 'z.string();' },
        { code: 'z.number();' },
        { code: 'z.boolean();' },
        { code: 'other.object({ a: 1 });' },
        { code: 'z.optional(z.readonly(z.object({ a: z.string() })));' },
        { code: 'z.readonly(z.object({ foo: z.readonly(z.string()) }));' },
        {
            code: 'z.readonly(z.object({ inner: z.readonly(z.object({ items: z.readonly(z.array(z.string())) })) }));'
        }
    ],
    invalid: [
        {
            code: 'z.object({ a: z.string() });',
            output: 'z.readonly(z.object({ a: z.string() }));',
            errors: [ schemaError(1, 28) ]
        },
        {
            code: 'z.strictObject({ a: z.string() });',
            output: 'z.readonly(z.strictObject({ a: z.string() }));',
            errors: [ schemaError(1, 34) ]
        },
        {
            code: 'z.looseObject({ a: z.string() });',
            output: 'z.readonly(z.looseObject({ a: z.string() }));',
            errors: [ schemaError(1, 33) ]
        },
        {
            code: 'z.array(z.string());',
            output: 'z.readonly(z.array(z.string()));',
            errors: [ schemaError(1, 20) ]
        },
        {
            code: 'z.tuple([ z.string() ]);',
            output: 'z.readonly(z.tuple([ z.string() ]));',
            errors: [ schemaError(1, 24) ]
        },
        {
            code: 'z.record(z.string(), z.number());',
            output: 'z.readonly(z.record(z.string(), z.number()));',
            errors: [ schemaError(1, 33) ]
        },
        {
            code: 'z.map(z.string(), z.number());',
            output: 'z.readonly(z.map(z.string(), z.number()));',
            errors: [ schemaError(1, 30) ]
        },
        {
            code: 'z.set(z.string());',
            output: 'z.readonly(z.set(z.string()));',
            errors: [ schemaError(1, 18) ]
        },
        {
            code: 'z.object({ foo: z.readonly(z.string()) });',
            output: 'z.readonly(z.object({ foo: z.readonly(z.string()) }));',
            errors: [ schemaError(1, 42) ]
        },
        {
            code: 'z.readonly(z.object({ list: z.array(z.string()) }));',
            output: 'z.readonly(z.object({ list: z.readonly(z.array(z.string())) }));',
            errors: [ schemaError(29, 48) ]
        },
        {
            code: 'z.readonly(z.object({ a: z.array(z.string()), b: z.tuple([ z.number() ]) }));',
            output:
                'z.readonly(z.object({ a: z.readonly(z.array(z.string())), b: z.readonly(z.tuple([ z.number() ])) }));',
            errors: [ schemaError(26, 45), schemaError(50, 73) ]
        },
        {
            code: 'z.object({ inner: z.strictObject({ b: z.string() }) });',
            output: [
                'z.readonly(z.object({ inner: z.strictObject({ b: z.string() }) }));',
                'z.readonly(z.object({ inner: z.readonly(z.strictObject({ b: z.string() })) }));'
            ],
            errors: [ schemaError(1, 55), schemaError(19, 52) ]
        }
    ]
});
