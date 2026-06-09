import { RuleTester } from '@typescript-eslint/rule-tester';
import { AST_NODE_TYPES } from '@typescript-eslint/utils';
import { suite, suiteTeardown, test } from 'mocha';
import { noImpureSatisfiesRule } from '../../configs/plugins/enormora-typescript/no-impure-satisfies.ts';

RuleTester.afterAll = suiteTeardown;
RuleTester.describe = function registerSuite(name: string, fn: () => void): void {
    suite(name, fn);
};
RuleTester.it = function registerTest(name: string, fn: () => void): void {
    test(name, fn);
};
RuleTester.itOnly = function registerTestOnly(name: string, fn: () => void): void {
    // Intentionally not delegating to mocha's exclusive variant — keep
    // every case running, no matter which one the rule tester labels
    // "only".
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

const satisfiesNodeType = AST_NODE_TYPES.TSSatisfiesExpression;

ruleTester.run('no-impure-satisfies', noImpureSatisfiesRule, {
    valid: [],
    invalid: [
        {
            code: 'const value = { x: 1 } satisfies { x: 1 };',
            errors: [
                {
                    messageId: 'typeChangingSatisfies',
                    type: satisfiesNodeType,
                    line: 1,
                    column: 15,
                    endLine: 1,
                    endColumn: 42
                }
            ]
        },
        {
            code: 'const value = [ 1, 2, 3 ] satisfies readonly [ 1, 2, 3 ];',
            errors: [
                {
                    messageId: 'typeChangingSatisfies',
                    type: satisfiesNodeType,
                    line: 1,
                    column: 15,
                    endLine: 1,
                    endColumn: 57
                }
            ]
        },
        {
            code: "const value = 'foo' satisfies 'foo';",
            errors: [
                {
                    messageId: 'typeChangingSatisfies',
                    type: satisfiesNodeType,
                    line: 1,
                    column: 15,
                    endLine: 1,
                    endColumn: 36
                }
            ]
        },
        {
            code: "const value = { kind: 'circle', radius: 1 } satisfies { kind: 'circle'; radius: number };",
            errors: [
                {
                    messageId: 'typeChangingSatisfies',
                    type: satisfiesNodeType,
                    line: 1,
                    column: 15,
                    endLine: 1,
                    endColumn: 89
                }
            ]
        },
        {
            code: 'const value = { a: 1, b: { c: 1 } } satisfies { a: 1; b: { readonly c: 1 } };',
            errors: [
                {
                    messageId: 'typeChangingSatisfies',
                    type: satisfiesNodeType,
                    line: 1,
                    column: 15,
                    endLine: 1,
                    endColumn: 77
                }
            ]
        },
        {
            code: 'const value = ({ x: 1 } satisfies { x: 1 }) satisfies { x: 1 };',
            errors: [
                {
                    messageId: 'typeChangingSatisfies',
                    type: satisfiesNodeType,
                    line: 1,
                    column: 15,
                    endLine: 1,
                    endColumn: 63
                },
                {
                    messageId: 'typeChangingSatisfies',
                    type: satisfiesNodeType,
                    line: 1,
                    column: 16,
                    endLine: 1,
                    endColumn: 43
                }
            ]
        },
        {
            code: 'const value = { fn() { return 1; } } satisfies { fn: () => 1 };',
            errors: [
                {
                    messageId: 'typeChangingSatisfies',
                    type: satisfiesNodeType,
                    line: 1,
                    column: 15,
                    endLine: 1,
                    endColumn: 63
                }
            ]
        },
        {
            code: 'const value = { x: 1 } satisfies { x: number };',
            errors: [
                {
                    messageId: 'trivialSatisfies',
                    type: satisfiesNodeType,
                    line: 1,
                    column: 15,
                    endLine: 1,
                    endColumn: 47
                }
            ]
        },
        {
            code: [
                'type Handler = (event: string) => void;',
                'declare const handler: Handler;',
                'handler satisfies Handler;'
            ]
                .join('\n'),
            errors: [
                {
                    messageId: 'trivialSatisfies',
                    type: satisfiesNodeType,
                    line: 3,
                    column: 1,
                    endLine: 3,
                    endColumn: 26
                }
            ]
        },
        {
            code: [
                'declare function getFoo(): { readonly x: number };',
                'getFoo() satisfies { readonly x: number };'
            ]
                .join('\n'),
            errors: [
                {
                    messageId: 'trivialSatisfies',
                    type: satisfiesNodeType,
                    line: 2,
                    column: 1,
                    endLine: 2,
                    endColumn: 42
                }
            ]
        },
        {
            code: [
                'declare function getFoo(): { readonly x: number };',
                'getFoo() satisfies object;'
            ]
                .join('\n'),
            errors: [
                {
                    messageId: 'trivialSatisfies',
                    type: satisfiesNodeType,
                    line: 2,
                    column: 1,
                    endLine: 2,
                    endColumn: 26
                }
            ]
        },
        {
            code: 'const value = 1 satisfies number;',
            errors: [
                {
                    messageId: 'trivialSatisfies',
                    type: satisfiesNodeType,
                    line: 1,
                    column: 15,
                    endLine: 1,
                    endColumn: 33
                }
            ]
        },
        {
            code: 'const value: { x: number } = ({ x: 1 } satisfies { x: number });',
            errors: [
                {
                    messageId: 'trivialSatisfies',
                    type: satisfiesNodeType,
                    line: 1,
                    column: 31,
                    endLine: 1,
                    endColumn: 63
                }
            ]
        },
        {
            code: [
                'declare const raw: unknown;',
                '(raw as { readonly x: number }) satisfies { readonly x: number };'
            ]
                .join('\n'),
            errors: [
                {
                    messageId: 'trivialSatisfies',
                    type: satisfiesNodeType,
                    line: 2,
                    column: 1,
                    endLine: 2,
                    endColumn: 65
                }
            ]
        },
        {
            code: [
                'function build(): { x: number } {',
                '    return { x: 1 } satisfies { x: number };',
                '}',
                'void build;'
            ]
                .join('\n'),
            errors: [
                {
                    messageId: 'trivialSatisfies',
                    type: satisfiesNodeType,
                    line: 2,
                    column: 12,
                    endLine: 2,
                    endColumn: 44
                }
            ]
        },
        {
            code: [
                'function build(): { x: 1 } {',
                '    return { x: 1 } satisfies { x: 1 };',
                '}',
                'void build;'
            ]
                .join('\n'),
            errors: [
                {
                    messageId: 'typeChangingSatisfies',
                    type: satisfiesNodeType,
                    line: 2,
                    column: 12,
                    endLine: 2,
                    endColumn: 39
                }
            ]
        },
        {
            code: [
                'function build(value: { x: number } = ({ x: 1 } satisfies { x: number })): void {',
                '    void value;',
                '}',
                'void build;'
            ]
                .join('\n'),
            errors: [
                {
                    messageId: 'trivialSatisfies',
                    type: satisfiesNodeType,
                    line: 1,
                    column: 40,
                    endLine: 1,
                    endColumn: 72
                }
            ]
        },
        {
            code: 'JSON.stringify({ x: 1 } satisfies { x: number });',
            errors: [
                {
                    messageId: 'trivialSatisfies',
                    type: satisfiesNodeType,
                    line: 1,
                    column: 16,
                    endLine: 1,
                    endColumn: 48
                }
            ]
        },
        {
            code: 'JSON.stringify({ x: 1 } satisfies { x: 1 });',
            errors: [
                {
                    messageId: 'typeChangingSatisfies',
                    type: satisfiesNodeType,
                    line: 1,
                    column: 16,
                    endLine: 1,
                    endColumn: 43
                }
            ]
        },
        {
            code: [
                'declare function identity<Value>(value: Value): Value;',
                'identity({ x: 1 } satisfies { x: number });'
            ]
                .join('\n'),
            errors: [
                {
                    messageId: 'trivialSatisfies',
                    type: satisfiesNodeType,
                    line: 2,
                    column: 10,
                    endLine: 2,
                    endColumn: 42
                }
            ]
        },
        {
            code: [
                'declare function identity<Value>(value: Value): Value;',
                'identity({ x: 1 } satisfies { x: 1 });'
            ]
                .join('\n'),
            errors: [
                {
                    messageId: 'typeChangingSatisfies',
                    type: satisfiesNodeType,
                    line: 2,
                    column: 10,
                    endLine: 2,
                    endColumn: 37
                }
            ]
        },
        {
            code: [
                'type Mirror<Source> = { [Key in keyof Source]: Source[Key] };',
                'const value = { x: 1 } satisfies Mirror<{ x: number }>;',
                'void value;'
            ]
                .join('\n'),
            errors: [
                {
                    messageId: 'trivialSatisfies',
                    type: satisfiesNodeType,
                    line: 2,
                    column: 15,
                    endLine: 2,
                    endColumn: 55
                }
            ]
        },
        {
            code: [
                "declare const flag: 'a' | 'b';",
                'flag satisfies string;'
            ]
                .join('\n'),
            errors: [
                {
                    messageId: 'trivialSatisfies',
                    type: satisfiesNodeType,
                    line: 2,
                    column: 1,
                    endLine: 2,
                    endColumn: 22
                }
            ]
        }
    ]
});
