import assert from 'node:assert';
import path from 'node:path';
import { Linter } from 'eslint';
import { suite, test } from 'mocha';
import { baseConfig } from '../../configs/presets/base/base.ts';
import { fixFixture, lintFixture, resolveFixture, uniqueSortedRuleIds } from './lint-fixture.ts';

const comboName = 'base-markdown';
const configs = baseConfig;

// Rules NOT in this list are still configured (in base.js); they simply don't fire on the fixture:
//   - markdown/no-bare-urls and markdown/table-column-count require GFM (we pin to commonmark
//     because @eslint/markdown@8.0.2's gfm language crashes on rule reporting)
//   - markdown/no-invalid-label-refs needs a specific shorthand-label syntax not covered by the fixture
//   - markdown/fenced-code-meta is off in the base preset (would require every fenced block to carry meta)
//   - markdown-links/no-dead-urls is off (network check; would make CI flaky)
//   - markdown-preferences/* rules other than the listed two are off (they overlap with dprint/markdown formatting)
const expectedViolationRuleIds = [
    'dprint-markdown/markdown',
    'markdown-links/no-missing-fragments',
    'markdown-links/no-missing-path',
    'markdown-links/no-self-destination',
    'markdown-preferences/no-laziness-blockquotes',
    'markdown-preferences/prefer-fenced-code-blocks',
    'markdown/fenced-code-language',
    'markdown/heading-increment',
    'markdown/no-duplicate-definitions',
    'markdown/no-duplicate-headings',
    'markdown/no-empty-images',
    'markdown/no-empty-links',
    'markdown/no-html',
    'markdown/no-missing-atx-heading-space',
    'markdown/no-missing-label-refs',
    'markdown/no-missing-link-fragments',
    'markdown/no-multiple-h1',
    'markdown/no-reference-like-urls',
    'markdown/no-reversed-media-syntax',
    'markdown/no-space-in-emphasis',
    'markdown/no-unused-definitions',
    'markdown/require-alt-text'
];

suite('base markdown integration', function () {
    test('base markdown violations fixture reports the expected rule ids', async function () {
        const { messages } = await lintFixture(configs, comboName, 'violations.md');
        assert.deepStrictEqual(uniqueSortedRuleIds(messages), expectedViolationRuleIds);
    });

    test('base markdown clean fixture produces no reports', async function () {
        const { messages } = await lintFixture(configs, comboName, 'clean.md');
        const detail = messages.map(function toReportDetail(message) {
            return { ruleId: message.ruleId, line: message.line, message: message.message };
        });
        assert.deepStrictEqual(detail, []);
    });

    test('base markdown autofix is idempotent on the violations fixture', async function () {
        const { code, filePath } = await resolveFixture(comboName, 'violations.md');
        const firstPass = fixFixture(configs, code, filePath);
        const secondPass = fixFixture(configs, firstPass.output, filePath);
        assert.strictEqual(secondPass.output, firstPass.output, 'second autofix pass changed the output');
        assert.strictEqual(secondPass.fixed, false, 'second autofix pass reported further fixes');
    });

    test('autofix does not rewrite [text](text) markdown links to <text> autolinks', function () {
        const filePath = path.join(process.cwd(), 'test/fixtures/base-markdown/regression-prefer-autolinks.md');
        const source = '# regression\n\n[foo.md](foo.md)\n';
        const linter = new Linter({ configType: 'flat' });
        const messages = linter.verify(source, configs, filePath);
        const preferAutolinkMessages = messages.filter(function isPreferAutolinkMessage(message) {
            return message.ruleId === 'markdown-preferences/prefer-autolinks';
        });
        assert.deepStrictEqual(
            preferAutolinkMessages,
            [],
            'markdown-preferences/prefer-autolinks must stay disabled in the base preset'
        );
        const fixResult = linter.verifyAndFix(source, configs, { filename: filePath });
        assert.ok(
            !fixResult.output.includes('<foo.md>'),
            'autofix must not rewrite [foo.md](foo.md) to the invalid CommonMark autolink <foo.md>'
        );
    });
});
