/// <reference path="./missing.ts" />
// @ts-ignore
// TODO: implement properly

import { readFileSync } from 'fs';
import fsDefault from 'fs';
import { readFileSync as readAgain } from 'fs';

var declaredWithVar = 1;
var laterAssigned;
laterAssigned = 2;
console.log(declaredWithVar, laterAssigned, readFileSync, fsDefault, readAgain);

const concatenated = 'hello' + ' ' + 'world';
const big = 10000000;
const inferred: number = 1;
const ternary = 1 > 0 ? true : false;
const nested = 1 > 0 ? (1 < 2 ? 'a' : 'b') : 'c';
const items: Array<string> = [];
items.push('x');
console.log(concatenated, big, inferred, ternary, nested);

interface IBadName {
    field: string;
}

type SignatureUser = {
    handler(): void;
};

const sig: SignatureUser = { handler() {} };
sig.handler();

function rawHandler(payload: any): any {
    return payload.value;
}
rawHandler({ value: 1 });

function looseCheck(value: string | undefined): string {
    if (value == null) {
        return 'null';
    }
    if (value) {
        return 'truthy';
    }
    return '';
}
looseCheck('');

function compute(n: number): number {
    let total = 0;
    total = total + n * 7;
    total = total | 0;
    total++;
    return total;
}
compute(2);

function summarize(values: number[]): number {
    let sum = 0;
    for (let index = 0; index < values.length; index = index + 1) {
        sum = sum + values[index]!;
    }
    return sum;
}
summarize([1, 2, 3]);

function tooManyArgs(alpha: number, beta: number, gamma: number, delta: number, epsilon: number): number {
    return alpha + beta + gamma + delta + epsilon;
}
tooManyArgs(1, 2, 3, 4, 5);

function defaultFirst(first = 1, second: number): number {
    return first + second;
}
defaultFirst(1, 2);

function noop(): void {}
noop();

function classify(value: string): string {
    switch (value) {
        case 'a':
            return 'A';
    }
    return '';
}
classify('a');

class Helper {
    constructor() {}
    static greet(): void {
        console.log('hi');
    }
}
Helper.greet();

class WithThis {
    method(): void {
        const self = this;
        self.method();
    }
}
new WithThis().method();

function fail(): never {
    throw 'oops';
}

function fetchSomething(): Promise<string> {
    return Promise.resolve('done');
}
fetchSomething().then((value) => {
    return console.log(value);
});

async function awaiter(): Promise<string> {
    return (await fetchSomething()).toUpperCase();
}
awaiter();

function risky(): void {
    try {
        fail();
    } catch (err) {
        throw err;
    }
}

const maybe: string | undefined = 'x';
const definite = maybe!;
console.log(definite);

debugger;

function showUser(name: string): string {
    const greeting = 'Hello ' + name + '!';
    const hasPrefix = greeting.indexOf('H') !== -1;
    const startsWithHello = greeting.substr(0, 5) === 'Hello';
    const upper = (<string>greeting).toUpperCase();
    return greeting + upper + (hasPrefix && startsWithHello ? 'yes' : 'no');
}
showUser('world');

function emptyError(): never {
    throw new Error();
}
try {
    emptyError();
} catch (err) {
    console.log(err);
}

function shadowOuter(): void {
    const value = 1;
    function inner(): void {
        const value = 2;
        console.log(value);
    }
    inner();
    console.log(value);
}
shadowOuter();

function reassignParam(input: { count: number }): void {
    input.count = input.count + 1;
}
reassignParam({ count: 0 });

function uselessRename(): void {
    const data = { foo: 'a' };
    const { foo: foo } = data;
    console.log(foo);
}
uselessRename();

function templateInString(): string {
    return 'value is ${count}';
}
templateInString();

function buildArr(): readonly number[] {
    return Array.from(new Set([1, 2, 3])).sort();
}
buildArr();

function manyStatements(): number {
    let result = 0;
    result = result + 1;
    result = result + 1;
    result = result + 1;
    result = result + 1;
    result = result + 1;
    result = result + 1;
    result = result + 1;
    result = result + 1;
    result = result + 1;
    result = result + 1;
    result = result + 1;
    return result;
}
manyStatements();

function deeplyNested(values: readonly number[]): number {
    if (values.length > 0) {
        if (values[0]! > 0) {
            if (values[0]! > 1) {
                if (values[0]! > 2) {
                    if (values[0]! > 3) {
                        if (values[0]! > 4) {
                            return values[0]!;
                        }
                    }
                }
            }
        }
    }
    return 0;
}
deeplyNested([5]);

namespace LegacyNamespace {
    export const value = 1;
}
console.log(LegacyNamespace.value);

const angleAssertion = <number>(1 as unknown);
console.log(angleAssertion);

const optionalChain: { foo?: { bar: number } } = {};
const result = optionalChain && optionalChain.foo && optionalChain.foo.bar;
console.log(result);

const nullable: number | null = null;
const fallback = nullable !== null && nullable !== undefined ? nullable : 0;
console.log(fallback);

const literalAs = 'hello' as 'hello';
console.log(literalAs);

function readEnv(): string | undefined {
    return process.env.HOME;
}
readEnv();

function pathJoin(): string {
    return __dirname + '/sub';
}
pathJoin();

function legacyBuffer(): Buffer {
    return new Buffer('hello');
}
legacyBuffer();

process.exit(0);
