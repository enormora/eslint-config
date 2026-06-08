import { RuleTester } from '@typescript-eslint/rule-tester';
import { AST_NODE_TYPES } from '@typescript-eslint/utils';
import { suite, suiteTeardown, test } from 'mocha';
import {
    preferNamedCallableTypesRule
} from '../../configs/plugins/enormora-typescript/prefer-named-callable-types.ts';

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

const typeReferenceNode = AST_NODE_TYPES.TSTypeReference;

ruleTester.run('prefer-named-callable-types', preferNamedCallableTypesRule, {
    valid: [
        // Return type has no alias — flagging would have nothing to offer.
        {
            code: 'declare function build(): { x: number };\ntype Result = ReturnType<typeof build>;'
        },
        // The local source IS the alias definition — extracting via typeof on the function still produces
        // the same alias, so we treat the alias's own home file as external for our purposes
        // (nothing better to suggest).
        {
            code: [
                'type Foo = { x: number };',
                'declare function build(): Foo;',
                'type FooAgain = Foo;'
            ]
                .join('\n')
        },
        // Function whose return type is an aliased symbol declared inside `node_modules` — external.
        {
            code: [
                'declare function buildArray(): Array<number>;',
                'type Result = ReturnType<typeof buildArray>;'
            ]
                .join('\n')
        },
        // Plain typeof outside a callable utility is allowed.
        {
            code: [
                'declare function build(): { x: number };',
                'type Built = typeof build;'
            ]
                .join('\n')
        },
        // typeof on a non-callable inside a callable utility — the utility evaluates to `never`/error
        // territory; our rule has no local alias to suggest, leave it alone.
        {
            code: [
                "declare const value: 'a' | 'b';",
                'type Result = ReturnType<typeof value>;'
            ]
                .join('\n')
        }
    ],
    invalid: [
        {
            code: [
                'type ResultShape = { readonly value: number };',
                'declare function build(): ResultShape;',
                'type Extracted = ReturnType<typeof build>;'
            ]
                .join('\n'),
            errors: [
                {
                    messageId: 'preferNamedAlias',
                    type: typeReferenceNode,
                    data: { aliasName: 'ResultShape', utilityName: 'ReturnType' },
                    line: 3,
                    column: 18,
                    endLine: 3,
                    endColumn: 42
                }
            ]
        },
        {
            code: [
                'type Options = { readonly retries: number };',
                'declare function configure(options: Options): void;',
                'type ExtractedOptions = Parameters<typeof configure>[0];'
            ]
                .join('\n'),
            errors: [
                {
                    messageId: 'preferNamedAlias',
                    type: typeReferenceNode,
                    data: { aliasName: 'Options', utilityName: 'Parameters' },
                    line: 3,
                    column: 25,
                    endLine: 3,
                    endColumn: 53
                }
            ]
        },
        {
            code: [
                'type Handler = (event: string) => void;',
                'declare class Bus { constructor(handler: Handler); }',
                'type BusArgs = ConstructorParameters<typeof Bus>;'
            ]
                .join('\n'),
            errors: [
                {
                    messageId: 'preferNamedAlias',
                    type: typeReferenceNode,
                    data: { aliasName: 'Handler', utilityName: 'ConstructorParameters' },
                    line: 3,
                    column: 16,
                    endLine: 3,
                    endColumn: 49
                }
            ]
        },
        {
            code: [
                'type Sensor = { readonly id: number };',
                'declare const SensorTag: new () => Sensor;',
                'type Instance = InstanceType<typeof SensorTag>;'
            ]
                .join('\n'),
            errors: [
                {
                    messageId: 'preferNamedAlias',
                    type: typeReferenceNode,
                    data: { aliasName: 'Sensor', utilityName: 'InstanceType' },
                    line: 3,
                    column: 17,
                    endLine: 3,
                    endColumn: 47
                }
            ]
        },
        {
            code: [
                'type Receiver = { readonly name: string };',
                'declare function greet(this: Receiver, salutation: string): void;',
                'type GreetReceiver = ThisParameterType<typeof greet>;'
            ]
                .join('\n'),
            errors: [
                {
                    messageId: 'preferNamedAlias',
                    type: typeReferenceNode,
                    data: { aliasName: 'Receiver', utilityName: 'ThisParameterType' },
                    line: 3,
                    column: 22,
                    endLine: 3,
                    endColumn: 53
                }
            ]
        },
        {
            code: [
                'type Outcome = { readonly ok: true };',
                'declare function compute(): Outcome;',
                'declare const wrapped: { inner: ReturnType<typeof compute> };'
            ]
                .join('\n'),
            errors: [
                {
                    messageId: 'preferNamedAlias',
                    type: typeReferenceNode,
                    data: { aliasName: 'Outcome', utilityName: 'ReturnType' },
                    line: 3,
                    column: 33,
                    endLine: 3,
                    endColumn: 59
                }
            ]
        }
    ]
});
