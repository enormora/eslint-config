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

type LineColumn = {
    readonly line: number;
    readonly column: number;
};

type Location = {
    readonly line: number;
    readonly column: number;
    readonly endLine: number;
    readonly endColumn: number;
};

function positionOf(code: string, characterIndex: number): LineColumn {
    const precedingText = code.slice(0, characterIndex);
    const lastNewlineIndex = precedingText.lastIndexOf('\n');
    const line = precedingText.split('\n').length;
    const column = characterIndex - lastNewlineIndex;
    return { line, column };
}

function locateArrow(code: string, marker: string): Location {
    const startIndex = code.indexOf(marker);
    if (startIndex === -1) {
        throw new Error(`Marker not found in code: ${JSON.stringify(marker)}`);
    }
    if (code.slice(startIndex + 1).includes(marker)) {
        throw new Error(`Marker is ambiguous (appears more than once): ${JSON.stringify(marker)}`);
    }
    const start = positionOf(code, startIndex);
    const end = positionOf(code, startIndex + marker.length);
    return { line: start.line, column: start.column, endLine: end.line, endColumn: end.column };
}

type ArrowErrorExpectation = Location & {
    readonly messageId: 'unnecessaryArrow';
    readonly type: typeof arrowFunctionNode;
};

function arrowError(code: string, marker: string): ArrowErrorExpectation {
    return {
        messageId: 'unnecessaryArrow',
        type: arrowFunctionNode,
        ...locateArrow(code, marker)
    };
}

const ruleTester = new RuleTester({
    languageOptions: {
        parserOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module'
        }
    }
});

const validBindingArrows = [
    'const useThis = () => { return this.value; };',
    'element.addEventListener("click", () => { this.handle(); });',
    'const useArguments = () => { return arguments[0]; };',
    'class Base { build() { return () => { return super.build(); }; } }',
    'function Factory() { return () => { return new.target; }; }',
    'const outerWithInnerArrowThis = () => { return () => { return this.x; }; };',
    'const outerWithInnerFunctionThis = () => { return function () { return this.x; }; };'
];

const validNonArrows = [
    'function double(x) { return x * 2; }',
    'const add = function (a, b) { return a + b; };',
    'items.map(function (item) { return item.id; });',
    'const obj = { run() { return 1; } };',
    'class Worker { handle() { return 1; } }'
];

const noParamsBlockCode = 'const noop = () => { return 1; };';
const parenthesizedSingleParamCode = 'const identity = (x) => x;';
const bareSingleParamCode = 'const identity = x => x;';
const concisePropertyAccessCode = 'items.map((item) => item.id);';
const multiParamBlockCode = 'const add = (a, b) => { return a + b; };';
const conciseObjectLiteralCode = 'const make = () => ({ x: 1 });';
const defaultValueParamCode = 'const init = (count = 1) => count;';
const restParamCode = 'const collect = (...values) => values;';
const destructuredParamCode = 'const pickA = ({ a }) => a;';
const emptyBlockBodyCode = 'const skip = () => {};';
const asyncParenthesizedCode = 'const fetchUser = async (id) => { return id; };';
const asyncBareCode = 'const fetchUser = async id => id;';
const asyncConciseCode = 'const fetchUser = async () => fetch();';
const iifeArrowCode = '(() => 1)();';
const nestedComposeCode = 'const compose = () => { return () => { return 1; }; };';
const commentInSignatureCode = 'const tag = /* before */ (x) /* after */ => x;';
const multiLineArrowCode = [
    'const handler = (event) => {',
    '    return event.target;',
    '};'
]
    .join('\n');

ruleTester.run('no-unnecessary-arrow-function', noUnnecessaryArrowFunctionRule, {
    valid: [ ...validBindingArrows, ...validNonArrows ],
    invalid: [
        {
            code: noParamsBlockCode,
            output: 'const noop = function () { return 1; };',
            errors: [ arrowError(noParamsBlockCode, '() => { return 1; }') ]
        },
        {
            code: parenthesizedSingleParamCode,
            output: 'const identity = function (x) { return x; };',
            errors: [ arrowError(parenthesizedSingleParamCode, '(x) => x') ]
        },
        {
            code: bareSingleParamCode,
            output: 'const identity = function (x) { return x; };',
            errors: [ arrowError(bareSingleParamCode, 'x => x') ]
        },
        {
            code: concisePropertyAccessCode,
            output: 'items.map(function (item) { return item.id; });',
            errors: [ arrowError(concisePropertyAccessCode, '(item) => item.id') ]
        },
        {
            code: multiParamBlockCode,
            output: 'const add = function (a, b) { return a + b; };',
            errors: [ arrowError(multiParamBlockCode, '(a, b) => { return a + b; }') ]
        },
        {
            code: conciseObjectLiteralCode,
            output: 'const make = function () { return { x: 1 }; };',
            errors: [ arrowError(conciseObjectLiteralCode, '() => ({ x: 1 })') ]
        },
        {
            code: defaultValueParamCode,
            output: 'const init = function (count = 1) { return count; };',
            errors: [ arrowError(defaultValueParamCode, '(count = 1) => count') ]
        },
        {
            code: restParamCode,
            output: 'const collect = function (...values) { return values; };',
            errors: [ arrowError(restParamCode, '(...values) => values') ]
        },
        {
            code: destructuredParamCode,
            output: 'const pickA = function ({ a }) { return a; };',
            errors: [ arrowError(destructuredParamCode, '({ a }) => a') ]
        },
        {
            code: emptyBlockBodyCode,
            output: 'const skip = function () {};',
            errors: [ arrowError(emptyBlockBodyCode, '() => {}') ]
        },
        {
            code: asyncParenthesizedCode,
            output: 'const fetchUser = async function (id) { return id; };',
            errors: [ arrowError(asyncParenthesizedCode, 'async (id) => { return id; }') ]
        },
        {
            code: asyncBareCode,
            output: 'const fetchUser = async function (id) { return id; };',
            errors: [ arrowError(asyncBareCode, 'async id => id') ]
        },
        {
            code: asyncConciseCode,
            output: 'const fetchUser = async function () { return fetch(); };',
            errors: [ arrowError(asyncConciseCode, 'async () => fetch()') ]
        },
        {
            code: iifeArrowCode,
            output: '(function () { return 1; })();',
            errors: [ arrowError(iifeArrowCode, '() => 1') ]
        },
        {
            code: nestedComposeCode,
            output: [
                'const compose = function () { return () => { return 1; }; };',
                'const compose = function () { return function () { return 1; }; };'
            ],
            errors: [
                arrowError(nestedComposeCode, '() => { return () => { return 1; }; }'),
                arrowError(nestedComposeCode, '() => { return 1; }')
            ]
        },
        {
            code: commentInSignatureCode,
            output: 'const tag = /* before */ function (x) /* after */ { return x; };',
            errors: [ arrowError(commentInSignatureCode, '(x) /* after */ => x') ]
        },
        {
            code: multiLineArrowCode,
            output: [
                'const handler = function (event) {',
                '    return event.target;',
                '};'
            ]
                .join('\n'),
            errors: [
                arrowError(multiLineArrowCode, '(event) => {\n    return event.target;\n}')
            ]
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

const annotatedParamCode = 'const annotated = (x: number): number => x;';
const optionalParamCode = 'const optional = (label?: string): string => label ?? "default";';
const genericCode = 'const generic = <T>(value: T): T => value;';
const asyncGenericCode = 'const asyncGeneric = async <T>(value: T): Promise<T> => value;';
const unionReturnTypeCode = 'const orNull = <T>(value: T): T | null => value;';

typescriptRuleTester.run('no-unnecessary-arrow-function (typescript)', noUnnecessaryArrowFunctionRule, {
    valid: [
        'const lexicalThis = (): unknown => { return this; };',
        'const lexicalSuper = class extends Base { build(): unknown { return (): unknown => super.build(); } };'
    ],
    invalid: [
        {
            code: annotatedParamCode,
            output: 'const annotated = function (x: number): number { return x; };',
            errors: [ arrowError(annotatedParamCode, '(x: number): number => x') ]
        },
        {
            code: optionalParamCode,
            output: 'const optional = function (label?: string): string { return label ?? "default"; };',
            errors: [ arrowError(optionalParamCode, '(label?: string): string => label ?? "default"') ]
        },
        {
            code: genericCode,
            output: 'const generic = function <T>(value: T): T { return value; };',
            errors: [ arrowError(genericCode, '<T>(value: T): T => value') ]
        },
        {
            code: asyncGenericCode,
            output: 'const asyncGeneric = async function <T>(value: T): Promise<T> { return value; };',
            errors: [ arrowError(asyncGenericCode, 'async <T>(value: T): Promise<T> => value') ]
        },
        {
            code: unionReturnTypeCode,
            output: 'const orNull = function <T>(value: T): T | null { return value; };',
            errors: [ arrowError(unionReturnTypeCode, '<T>(value: T): T | null => value') ]
        }
    ]
});
