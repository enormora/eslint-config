import assert from 'node:assert';
import path from 'node:path';
import { Linter } from 'eslint';
import { suite, test } from 'mocha';
import { baseConfig } from '../../configs/presets/base/base.ts';

const ruleId = 'unicorn/consistent-conditional-object-spread';
const filePath = path.join(process.cwd(), 'test/fixtures/base-node/conditional-object-spread.js');

function conditionalObjectSpreadReports(code: string): boolean {
    const linter = new Linter({ configType: 'flat' });
    const messages = linter.verify(code, baseConfig, filePath);
    return messages.some(function isConditionalObjectSpread(message) {
        return message.ruleId === ruleId;
    });
}

function bestPracticesReports(sourceCode: string, ruleName: string): Linter.LintMessage[] {
    const linter = new Linter({ configType: 'flat' });
    const messages = linter.verify(sourceCode, baseConfig, filePath);
    const fatalMessages = messages.filter(function isFatalMessage(message) {
        return message.fatal === true;
    });

    assert.deepStrictEqual(fatalMessages, [], 'Source must parse successfully');

    return messages.filter(function isRequestedRule(message) {
        return message.ruleId === ruleName;
    });
}

suite('base best practices', function () {
    test('reports the logical short-circuit form', function () {
        const logicalForm = 'const props = {};\n' +
            'export const result = { ...(props.onClick !== undefined && { onClick: props.onClick }) };\n';
        assert.strictEqual(
            conditionalObjectSpreadReports(logicalForm),
            true,
            `${ruleId} must reject the logical short-circuit form in favor of the ternary form`
        );
    });

    test('accepts the explicit ternary form', function () {
        const ternaryForm = 'const props = {};\n' +
            'export const result = { ...(props.onClick === undefined ? {} : { onClick: props.onClick }) };\n';
        assert.strictEqual(
            conditionalObjectSpreadReports(ternaryForm),
            false,
            `${ruleId} must accept the explicit ternary form`
        );
    });

    test('reports discarded array method return values under the replacement rule', function () {
        const actualReports = bestPracticesReports('[1, 2].slice(1);', 'unicorn/no-unused-builtin-method-return');
        assert.strictEqual(actualReports.length, 1);
        assert.strictEqual(actualReports[0]?.severity, 2);
    });

    test('reports discarded set method return values under the replacement rule', function () {
        const actualReports = bestPracticesReports(
            'new Set([1, 2]).has(1);',
            'unicorn/no-unused-builtin-method-return'
        );
        assert.strictEqual(actualReports.length, 1);
    });

    test('accepts consumed built-in method return values', function () {
        const actualReports = bestPracticesReports(
            'export const remaining = [1, 2].slice(1);\nexport const contains = new Set([1, 2]).has(1);',
            'unicorn/no-unused-builtin-method-return'
        );
        assert.deepStrictEqual(actualReports, []);
    });

    test('reports asynchronous callbacks passed to synchronous iterator helpers', function () {
        const actualReports = bestPracticesReports(
            '[1, 2].values().forEach(async function consume(value) { await consumeValue(value); });',
            'unicorn/no-async-iterator-callback'
        );
        assert.strictEqual(actualReports.length, 1);
    });

    test('accepts synchronous iterator callbacks', function () {
        const actualReports = bestPracticesReports(
            '[1, 2].values().forEach(function consume(value) { consumeValue(value); });',
            'unicorn/no-async-iterator-callback'
        );
        assert.deepStrictEqual(actualReports, []);
    });

    test('reports discarded lazy iterator helpers', function () {
        const actualReports = bestPracticesReports(
            '[1, 2].values().map(function double(value) { return value * 2; });',
            'unicorn/no-unused-iterator-helper'
        );
        assert.strictEqual(actualReports.length, 1);
    });

    test('accepts consumed lazy iterator helpers', function () {
        const actualReports = bestPracticesReports(
            'export const doubled = [1, 2].values().map(function double(value) { return value * 2; }).toArray();',
            'unicorn/no-unused-iterator-helper'
        );
        assert.deepStrictEqual(actualReports, []);
    });
});
