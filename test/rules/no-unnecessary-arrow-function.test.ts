import { RuleTester } from '@typescript-eslint/rule-tester';
import { AST_NODE_TYPES } from '@typescript-eslint/utils';
import { suite, suiteTeardown, test } from 'mocha';
import {
    noUnnecessaryArrowFunctionRule
} from '../../configs/plugins/restricted-syntax/no-unnecessary-arrow-function.ts';

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

const arrowFunctionNode = AST_NODE_TYPES.ArrowFunctionExpression;

const ruleTester = new RuleTester({
    languageOptions: {
        parserOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module'
        }
    }
});

ruleTester.run('no-unnecessary-arrow-function', noUnnecessaryArrowFunctionRule, {
    valid: [
        'const useThis = () => { return this.value; };',
        'element.addEventListener("click", () => { this.handle(); });',
        'const useArguments = () => { return arguments[0]; };',
        'class Base { build() { return () => { return super.build(); }; } }',
        'function Factory() { return () => { return new.target; }; }',
        'const outerWithInnerArrowThis = () => { return () => { return this.x; }; };',
        'const outerWithInnerFunctionThis = () => { return function () { return this.x; }; };',
        'function double(x) { return x * 2; }',
        'const add = function (a, b) { return a + b; };',
        'items.map(function (item) { return item.id; });',
        'const obj = { run() { return 1; } };',
        'class Worker { handle() { return 1; } }'
    ],
    invalid: [
        {
            code: 'const noop = () => { return 1; };',
            output: 'const noop = function () { return 1; };',
            errors: [ {
                messageId: 'unnecessaryArrow',
                type: arrowFunctionNode,
                line: 1,
                column: 14,
                endLine: 1,
                endColumn: 33
            } ]
        },
        {
            code: 'const identity = (x) => x;',
            output: 'const identity = function (x) { return x; };',
            errors: [ {
                messageId: 'unnecessaryArrow',
                type: arrowFunctionNode,
                line: 1,
                column: 18,
                endLine: 1,
                endColumn: 26
            } ]
        },
        {
            code: 'const identity = x => x;',
            output: 'const identity = function (x) { return x; };',
            errors: [ {
                messageId: 'unnecessaryArrow',
                type: arrowFunctionNode,
                line: 1,
                column: 18,
                endLine: 1,
                endColumn: 24
            } ]
        },
        {
            code: 'items.map((item) => item.id);',
            output: 'items.map(function (item) { return item.id; });',
            errors: [ {
                messageId: 'unnecessaryArrow',
                type: arrowFunctionNode,
                line: 1,
                column: 11,
                endLine: 1,
                endColumn: 28
            } ]
        },
        {
            code: 'const add = (a, b) => { return a + b; };',
            output: 'const add = function (a, b) { return a + b; };',
            errors: [ {
                messageId: 'unnecessaryArrow',
                type: arrowFunctionNode,
                line: 1,
                column: 13,
                endLine: 1,
                endColumn: 40
            } ]
        },
        {
            code: 'const make = () => ({ x: 1 });',
            output: 'const make = function () { return { x: 1 }; };',
            errors: [ {
                messageId: 'unnecessaryArrow',
                type: arrowFunctionNode,
                line: 1,
                column: 14,
                endLine: 1,
                endColumn: 30
            } ]
        },
        {
            code: 'const init = (count = 1) => count;',
            output: 'const init = function (count = 1) { return count; };',
            errors: [ {
                messageId: 'unnecessaryArrow',
                type: arrowFunctionNode,
                line: 1,
                column: 14,
                endLine: 1,
                endColumn: 34
            } ]
        },
        {
            code: 'const collect = (...values) => values;',
            output: 'const collect = function (...values) { return values; };',
            errors: [ {
                messageId: 'unnecessaryArrow',
                type: arrowFunctionNode,
                line: 1,
                column: 17,
                endLine: 1,
                endColumn: 38
            } ]
        },
        {
            code: 'const pickA = ({ a }) => a;',
            output: 'const pickA = function ({ a }) { return a; };',
            errors: [ {
                messageId: 'unnecessaryArrow',
                type: arrowFunctionNode,
                line: 1,
                column: 15,
                endLine: 1,
                endColumn: 27
            } ]
        },
        {
            code: 'const skip = () => {};',
            output: 'const skip = function () {};',
            errors: [ {
                messageId: 'unnecessaryArrow',
                type: arrowFunctionNode,
                line: 1,
                column: 14,
                endLine: 1,
                endColumn: 22
            } ]
        },
        {
            code: 'const fetchUser = async (id) => { return id; };',
            output: 'const fetchUser = async function (id) { return id; };',
            errors: [ {
                messageId: 'unnecessaryArrow',
                type: arrowFunctionNode,
                line: 1,
                column: 19,
                endLine: 1,
                endColumn: 47
            } ]
        },
        {
            code: 'const fetchUser = async id => id;',
            output: 'const fetchUser = async function (id) { return id; };',
            errors: [ {
                messageId: 'unnecessaryArrow',
                type: arrowFunctionNode,
                line: 1,
                column: 19,
                endLine: 1,
                endColumn: 33
            } ]
        },
        {
            code: 'const fetchUser = async () => fetch();',
            output: 'const fetchUser = async function () { return fetch(); };',
            errors: [ {
                messageId: 'unnecessaryArrow',
                type: arrowFunctionNode,
                line: 1,
                column: 19,
                endLine: 1,
                endColumn: 38
            } ]
        },
        {
            code: '(() => 1)();',
            output: '(function () { return 1; })();',
            errors: [ {
                messageId: 'unnecessaryArrow',
                type: arrowFunctionNode,
                line: 1,
                column: 2,
                endLine: 1,
                endColumn: 9
            } ]
        },
        {
            code: 'const compose = () => { return () => { return 1; }; };',
            output: [
                'const compose = function () { return () => { return 1; }; };',
                'const compose = function () { return function () { return 1; }; };'
            ],
            errors: [
                {
                    messageId: 'unnecessaryArrow',
                    type: arrowFunctionNode,
                    line: 1,
                    column: 17,
                    endLine: 1,
                    endColumn: 54
                },
                {
                    messageId: 'unnecessaryArrow',
                    type: arrowFunctionNode,
                    line: 1,
                    column: 32,
                    endLine: 1,
                    endColumn: 51
                }
            ]
        },
        {
            code: 'const tag = /* before */ (x) /* after */ => x;',
            output: 'const tag = /* before */ function (x) /* after */ { return x; };',
            errors: [ {
                messageId: 'unnecessaryArrow',
                type: arrowFunctionNode,
                line: 1,
                column: 26,
                endLine: 1,
                endColumn: 46
            } ]
        },
        {
            code: [
                'const handler = (event) => {',
                '    return event.target;',
                '};'
            ]
                .join('\n'),
            output: [
                'const handler = function (event) {',
                '    return event.target;',
                '};'
            ]
                .join('\n'),
            errors: [ {
                messageId: 'unnecessaryArrow',
                type: arrowFunctionNode,
                line: 1,
                column: 17,
                endLine: 3,
                endColumn: 2
            } ]
        }
    ]
});

const typescriptRuleTester = new RuleTester({
    languageOptions: {
        parserOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module'
        }
    }
});

typescriptRuleTester.run('no-unnecessary-arrow-function (typescript)', noUnnecessaryArrowFunctionRule, {
    valid: [
        'const lexicalThis = (): unknown => { return this; };',
        'const lexicalSuper = class extends Base { build(): unknown { return (): unknown => super.build(); } };'
    ],
    invalid: [
        {
            code: 'const annotated = (x: number): number => x;',
            output: 'const annotated = function (x: number): number { return x; };',
            errors: [ {
                messageId: 'unnecessaryArrow',
                type: arrowFunctionNode,
                line: 1,
                column: 19,
                endLine: 1,
                endColumn: 43
            } ]
        },
        {
            code: 'const optional = (label?: string): string => label ?? "default";',
            output: 'const optional = function (label?: string): string { return label ?? "default"; };',
            errors: [ {
                messageId: 'unnecessaryArrow',
                type: arrowFunctionNode,
                line: 1,
                column: 18,
                endLine: 1,
                endColumn: 64
            } ]
        },
        {
            code: 'const generic = <T>(value: T): T => value;',
            output: 'const generic = function <T>(value: T): T { return value; };',
            errors: [ {
                messageId: 'unnecessaryArrow',
                type: arrowFunctionNode,
                line: 1,
                column: 17,
                endLine: 1,
                endColumn: 42
            } ]
        },
        {
            code: 'const asyncGeneric = async <T>(value: T): Promise<T> => value;',
            output: 'const asyncGeneric = async function <T>(value: T): Promise<T> { return value; };',
            errors: [ {
                messageId: 'unnecessaryArrow',
                type: arrowFunctionNode,
                line: 1,
                column: 22,
                endLine: 1,
                endColumn: 62
            } ]
        },
        {
            code: 'const orNull = <T>(value: T): T | null => value;',
            output: 'const orNull = function <T>(value: T): T | null { return value; };',
            errors: [ {
                messageId: 'unnecessaryArrow',
                type: arrowFunctionNode,
                line: 1,
                column: 16,
                endLine: 1,
                endColumn: 48
            } ]
        }
    ]
});
