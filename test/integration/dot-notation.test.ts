import assert from 'node:assert';
import { suite, test } from 'mocha';
import { baseConfig } from '../../configs/presets/base/base.ts';
import { typescriptConfig } from '../../configs/presets/typescript/typescript.ts';
import { lintFixture } from './lint-fixture.ts';

const configs = [ ...baseConfig, { ...typescriptConfig, files: [ '**/*.ts' ] } ];

suite('typescript dot notation integration', function () {
    test('enforces dot notation even when noPropertyAccessFromIndexSignature is enabled', async function () {
        const { messages } = await lintFixture(configs, 'base-typescript', 'dot-notation/access.ts');
        const dotNotationReports = messages.filter(function isDotNotationReport(message) {
            return message.ruleId === 'dot-notation' || message.ruleId === '@typescript-eslint/dot-notation';
        });

        assert.deepStrictEqual(
            dotNotationReports.map(function toReport(message) {
                return { ruleId: message.ruleId, line: message.line, replacement: message.fix?.text };
            }),
            [
                { ruleId: 'dot-notation', line: 5, replacement: '.name' },
                { ruleId: 'dot-notation', line: 6, replacement: 'name' }
            ]
        );
    });
});
