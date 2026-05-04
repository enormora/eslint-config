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
const ternary = 1 > 0 ? true : false;
const nested = 1 > 0 ? (1 < 2 ? 'a' : 'b') : 'c';
console.log(concatenated, big, ternary, nested);

function looseCheck(value) {
    if (value == null) {
        return 'null';
    }
    if (value) {
        return 'truthy';
    }
    return '';
}
looseCheck('');

function compute(n) {
    let total = 0;
    total = total + n * 7;
    total = total | 0;
    total++;
    return total;
}
compute(2);

function summarize(values) {
    let sum = 0;
    for (let index = 0; index < values.length; index = index + 1) {
        sum = sum + values[index];
    }
    return sum;
}
summarize([1, 2, 3]);

function tooManyArgs(alpha, beta, gamma, delta, epsilon) {
    return alpha + beta + gamma + delta + epsilon;
}
tooManyArgs(1, 2, 3, 4, 5);

function defaultFirst(first = 1, second) {
    return first + second;
}
defaultFirst(1, 2);

function noop() {}
noop();

function classify(value) {
    switch (value) {
        case 'a':
            return 'A';
    }
    return '';
}
classify('a');

function fail() {
    throw 'oops';
}

function fetchSomething() {
    return Promise.resolve('done');
}
fetchSomething().then(function (value) {
    return console.log(value);
});

async function awaiter() {
    return (await fetchSomething()).toUpperCase();
}
awaiter();

function risky() {
    try {
        fail();
    } catch (err) {
        throw err;
    }
}

debugger;

function showUser(name) {
    const greeting = 'Hello ' + name + '!';
    const hasPrefix = greeting.indexOf('H') !== -1;
    const startsWithHello = greeting.substr(0, 5) === 'Hello';
    return greeting + (hasPrefix && startsWithHello ? 'yes' : 'no');
}
showUser('world');

function emptyError() {
    throw new Error();
}
try {
    emptyError();
} catch (err) {
    console.log(err);
}

function shadowOuter() {
    const value = 1;
    function inner() {
        const value = 2;
        console.log(value);
    }
    inner();
    console.log(value);
}
shadowOuter();

function reassignParam(input) {
    input.count = input.count + 1;
}
reassignParam({ count: 0 });

function uselessRename() {
    const data = { foo: 'a' };
    const { foo: foo } = data;
    console.log(foo);
}
uselessRename();

function templateInString() {
    return 'value is ${count}';
}
templateInString();

function buildArr() {
    return Array.from(new Set([1, 2, 3])).sort();
}
buildArr();

function manyStatements() {
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
    return result;
}
manyStatements();

function deeplyNested(values) {
    if (values.length > 0) {
        if (values[0] > 0) {
            if (values[0] > 1) {
                if (values[0] > 2) {
                    if (values[0] > 3) {
                        if (values[0] > 4) {
                            return values[0];
                        }
                    }
                }
            }
        }
    }
    return 0;
}
deeplyNested([5]);

function readEnv() {
    return process.env.HOME;
}
readEnv();

function pathJoin() {
    return __dirname + '/sub';
}
pathJoin();

function callbackHandler(err, data) {
    console.log(data);
    return err;
}
callbackHandler(null, 'x');

function legacyBuffer() {
    return new Buffer('hello');
}
legacyBuffer();

process.exit(0);
