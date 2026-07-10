import { RuleTester } from '@typescript-eslint/rule-tester';
import { AST_NODE_TYPES } from '@typescript-eslint/utils';
import { suite, suiteTeardown, test } from 'mocha';
import {
    noUnnecessaryReadonlySchemaRule
} from '../../configs/plugins/enormora-zod/no-unnecessary-readonly-schema.ts';

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
    readonly messageId: 'unnecessaryReadonly';
    readonly type: AST_NODE_TYPES;
    readonly line: number;
    readonly column: number;
    readonly endLine: number;
    readonly endColumn: number;
};

function unnecessaryError(column: number, endColumn: number): ExpectedError {
    return {
        messageId: 'unnecessaryReadonly',
        type: AST_NODE_TYPES.CallExpression,
        line: 1,
        column,
        endLine: 1,
        endColumn
    };
}

ruleTester.run('no-unnecessary-readonly-schema', noUnnecessaryReadonlySchemaRule, {
    valid: [
        { code: 'z.readonly(z.object({ a: z.string() }));' },
        { code: 'z.readonly(z.array(z.string()));' },
        { code: 'z.readonly(z.tuple([ z.string() ]));' },
        { code: 'z.readonly(z.record(z.string(), z.number()));' },
        { code: 'z.string();' },
        { code: 'z.object({ a: z.string() });' },
        { code: 'other.readonly(z.string());' },
        { code: 'z.readonly();' }
    ],
    invalid: [
        {
            code: 'z.readonly(z.string());',
            output: 'z.string();',
            errors: [ unnecessaryError(1, 23) ]
        },
        {
            code: 'z.readonly(z.number());',
            output: 'z.number();',
            errors: [ unnecessaryError(1, 23) ]
        },
        {
            code: 'z.readonly(z.boolean());',
            output: 'z.boolean();',
            errors: [ unnecessaryError(1, 24) ]
        },
        {
            code: "z.readonly(z.literal('a'));",
            output: "z.literal('a');",
            errors: [ unnecessaryError(1, 27) ]
        },
        {
            code: 'z.readonly(z.date());',
            output: 'z.date();',
            errors: [ unnecessaryError(1, 21) ]
        },
        {
            code: 'z.readonly(z.readonly(z.string()));',
            output: [
                'z.readonly(z.string());',
                'z.string();'
            ],
            errors: [ unnecessaryError(1, 35), unnecessaryError(12, 34) ]
        }
    ]
});
