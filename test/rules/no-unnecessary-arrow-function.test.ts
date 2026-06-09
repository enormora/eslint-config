import { RuleTester } from '@typescript-eslint/rule-tester';
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
        'const handler = () => { return this.value; };',
        'element.addEventListener("click", () => { this.handle(); });',
        'const first = () => { return arguments[0]; };',
        'class Base { build() { return () => { return super.build(); }; } }',
        'function Factory() { return () => { return new.target; }; }',
        'function double(x) { return x * 2; }',
        'const add = function (a, b) { return a + b; };',
        'items.map(function (item) { return item.id; });'
    ],
    invalid: [
        {
            code: 'const noop = () => { return 1; };',
            output: 'const noop = function () { return 1; };',
            errors: [ { messageId: 'unnecessaryArrow' } ]
        },
        {
            code: 'const identity = (x) => x;',
            output: 'const identity = function (x) { return x; };',
            errors: [ { messageId: 'unnecessaryArrow' } ]
        },
        {
            code: 'const identity = x => x;',
            output: 'const identity = function (x) { return x; };',
            errors: [ { messageId: 'unnecessaryArrow' } ]
        },
        {
            code: 'items.map((item) => item.id);',
            output: 'items.map(function (item) { return item.id; });',
            errors: [ { messageId: 'unnecessaryArrow' } ]
        },
        {
            code: 'const add = (a, b) => { return a + b; };',
            output: 'const add = function (a, b) { return a + b; };',
            errors: [ { messageId: 'unnecessaryArrow' } ]
        },
        {
            code: 'const make = () => ({ x: 1 });',
            output: 'const make = function () { return { x: 1 }; };',
            errors: [ { messageId: 'unnecessaryArrow' } ]
        },
        {
            code: 'const fetchUser = async (id) => { return id; };',
            output: 'const fetchUser = async function (id) { return id; };',
            errors: [ { messageId: 'unnecessaryArrow' } ]
        },
        {
            code: 'const fetchUser = async id => id;',
            output: 'const fetchUser = async function (id) { return id; };',
            errors: [ { messageId: 'unnecessaryArrow' } ]
        },
        {
            code: 'const compose = () => { return () => { return 1; }; };',
            output: [
                'const compose = function () { return () => { return 1; }; };',
                'const compose = function () { return function () { return 1; }; };'
            ],
            errors: [
                { messageId: 'unnecessaryArrow' },
                { messageId: 'unnecessaryArrow' }
            ]
        }
    ]
});

const typescriptRuleTester = new RuleTester({
    languageOptions: {
        parserOptions: {
            projectService: {
                allowDefaultProject: [ '*.ts*' ]
            },
            tsconfigRootDir: process.cwd()
        }
    }
});

typescriptRuleTester.run('no-unnecessary-arrow-function (typescript)', noUnnecessaryArrowFunctionRule, {
    valid: [
        'const handler = (): void => { this.value; };'
    ],
    invalid: [
        {
            code: 'const annotated = (x: number): number => x;',
            output: 'const annotated = function (x: number): number { return x; };',
            errors: [ { messageId: 'unnecessaryArrow' } ]
        },
        {
            code: 'const generic = <T>(value: T): T => value;',
            output: 'const generic = function <T>(value: T): T { return value; };',
            errors: [ { messageId: 'unnecessaryArrow' } ]
        },
        {
            code: 'const asyncGeneric = async <T>(value: T): Promise<T> => value;',
            output: 'const asyncGeneric = async function <T>(value: T): Promise<T> { return value; };',
            errors: [ { messageId: 'unnecessaryArrow' } ]
        }
    ]
});
