import assert from 'node:assert';
import path from 'node:path';
import type { Linter } from 'eslint';
import { suite, test } from 'mocha';
import { baseConfig } from '../../configs/presets/base/base.ts';
import { reactJsxConfig } from '../../configs/presets/react-jsx/react-jsx.ts';
import { lintSource } from './lint-fixture.ts';

function jsxEntityReports(sourceCode: string): Linter.LintMessage[] {
    const filePath = path.join(process.cwd(), 'test/fixtures/base-node/clean.js');
    const messages = lintSource([ ...baseConfig, reactJsxConfig ], sourceCode, filePath);
    const fatalMessages = messages.filter(function isFatal(message) {
        return message.fatal === true;
    });
    assert.deepStrictEqual(fatalMessages, [], 'JSX source must parse successfully');

    return messages.filter(function isEntityReport(message) {
        return message.ruleId === 'react/no-unescaped-entities';
    });
}

suite('React JSX text', function () {
    test('reports unescaped apostrophes in JSX text', function () {
        const reports = jsxEntityReports("export const message = <p>Don't forget</p>;");
        assert.strictEqual(reports.length, 1);
        assert.strictEqual(reports[0]?.severity, 2);
    });

    test('accepts escaped apostrophes in JSX text', function () {
        const reports = jsxEntityReports('export const message = <p>Don&#39;t forget</p>;');
        assert.deepStrictEqual(reports, []);
    });
});
