import assert from 'node:assert';
import path from 'node:path';
import type { Linter } from 'eslint';
import { suite, test } from 'mocha';
import { baseConfig } from '../../configs/presets/base/base.ts';
import { browserConfig } from '../../configs/presets/browser/browser.ts';
import { lintSource } from './lint-fixture.ts';

function modernDomReports(sourceCode: string, configs: readonly unknown[]): Linter.LintMessage[] {
    const filePath = path.join(process.cwd(), 'test/fixtures/base-node/clean.js');
    const messages = lintSource(configs, sourceCode, filePath);
    const fatalMessages = messages.filter(function isFatal(message) {
        return message.fatal === true;
    });
    assert.deepStrictEqual(fatalMessages, [], 'DOM source must parse successfully');

    return messages.filter(function isModernDomReport(message) {
        return message.ruleId === 'unicorn/prefer-modern-dom-apis';
    });
}

suite('browser DOM methods', function () {
    test('reports legacy DOM methods in the browser preset', function () {
        const reports = modernDomReports('parent.replaceChild(replacement, previous);', [
            ...baseConfig,
            browserConfig
        ]);
        assert.strictEqual(reports.length, 1);
        assert.strictEqual(reports[0]?.severity, 2);
    });

    test('accepts modern DOM methods in the browser preset', function () {
        const reports = modernDomReports('previous.replaceWith(replacement);', [ ...baseConfig, browserConfig ]);
        assert.deepStrictEqual(reports, []);
    });

    test('leaves DOM modernization to environment presets', function () {
        const reports = modernDomReports('parent.replaceChild(replacement, previous);', baseConfig);
        assert.deepStrictEqual(reports, []);
    });
});
