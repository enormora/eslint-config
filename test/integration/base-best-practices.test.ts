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

suite('base best practices conditional object spread style', function () {
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
});
