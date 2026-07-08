import assert from 'node:assert';
import { suite, test } from 'mocha';
import { baseConfig } from '../../configs/presets/base/base.ts';
import { nodeConfig } from '../../configs/presets/node/node.ts';
import { fixFixture, lintFixture, resolveFixture, uniqueSortedRuleIds } from './lint-fixture.ts';

const comboName = 'base-node';
const configs = [ ...baseConfig, nodeConfig ];

const expectedViolationRuleIds = [
    '@stylistic/array-bracket-spacing',
    '@stylistic/no-extra-parens',
    'complexity',
    'default-case',
    'default-param-last',
    'dprint/typescript',
    'eqeqeq',
    'for-direction',
    'grouped-accessor-pairs',
    'id-length',
    'import/no-duplicates',
    'init-declarations',
    'max-depth',
    'max-params',
    'max-statements',
    'no-bitwise',
    'no-console',
    'no-constant-condition',
    'no-debugger',
    'no-duplicate-imports',
    'no-eq-null',
    'no-loss-of-precision',
    'no-magic-numbers',
    'no-nested-ternary',
    'no-param-reassign',
    'no-plusplus',
    'no-shadow',
    'no-template-curly-in-string',
    'no-throw-literal',
    'no-undef',
    'no-unneeded-ternary',
    'no-unused-vars',
    'no-useless-catch',
    'no-useless-concat',
    'no-useless-rename',
    'no-var',
    'no-warning-comments',
    'node/no-deprecated-api',
    'node/no-process-env',
    'node/no-process-exit',
    'node/no-sync',
    'operator-assignment',
    'prefer-template',
    'promise/catch-or-return',
    'restricted-syntax/no-empty-function-body',
    'restricted-syntax/no-switch-statement',
    'sonarjs/for-loop-increment-sign',
    'sonarjs/no-collapsible-if',
    'sonarjs/no-small-switch',
    'unicorn/catch-error-name',
    'unicorn/custom-error-definition',
    'unicorn/error-message',
    'unicorn/no-array-sort',
    'unicorn/no-await-expression-member',
    'unicorn/no-for-loop',
    'unicorn/no-lonely-if',
    'unicorn/no-new-buffer',
    'unicorn/no-process-exit',
    'unicorn/no-top-level-assignment-in-function',
    'unicorn/no-unused-properties',
    'unicorn/no-useless-concat',
    'unicorn/numeric-separators-style',
    'unicorn/prefer-includes',
    'unicorn/prefer-math-trunc',
    'unicorn/prefer-node-protocol',
    'unicorn/prefer-string-slice',
    'unicorn/require-array-sort-compare'
];

suite('base+node integration', function () {
    test('base+node violations fixture reports the expected rule ids', async function () {
        const { messages } = await lintFixture(configs, comboName, 'violations.js');
        assert.deepStrictEqual(
            uniqueSortedRuleIds(messages),
            expectedViolationRuleIds,
            'base+node violations fixture must report the expected rule ids'
        );
    });

    test('base+node clean fixture produces no reports', async function () {
        const { messages } = await lintFixture(configs, comboName, 'clean.js');
        const detail = messages.map(function toReportDetail(message) {
            return { ruleId: message.ruleId, line: message.line, message: message.message };
        });
        assert.deepStrictEqual(detail, [], 'base+node clean fixture must produce no reports');
    });

    test('base+node autofix is idempotent on the violations fixture', async function () {
        const { code, filePath } = await resolveFixture(comboName, 'violations.js');
        const firstPass = fixFixture(configs, code, filePath);
        const secondPass = fixFixture(configs, firstPass.output, filePath);
        assert.strictEqual(secondPass.output, firstPass.output, 'second autofix pass changed the output');
        assert.strictEqual(secondPass.fixed, false, 'second autofix pass reported further fixes');
    });

    test('base+node flags global number constants and rewrites them to Number properties', async function () {
        const { messages, code, filePath } = await lintFixture(configs, comboName, 'number-constants-global.js');
        assert.deepStrictEqual(
            uniqueSortedRuleIds(messages),
            [ 'unicorn/prefer-number-properties' ],
            'global NaN/Infinity must be flagged only by unicorn/prefer-number-properties'
        );
        const { output } = fixFixture(configs, code, filePath);
        assert.strictEqual(
            output,
            [
                'export const notANumber = Number.NaN;',
                'export const positiveInfinity = Number.POSITIVE_INFINITY;',
                'export const negativeInfinity = Number.NEGATIVE_INFINITY;',
                ''
            ]
                .join('\n'),
            'autofix must rewrite global number constants to Number properties'
        );
    });

    test('base+node does not flag Number property constants', async function () {
        const { messages } = await lintFixture(configs, comboName, 'number-constants-namespaced.js');
        const detail = messages.map(function toReportDetail(message) {
            return { ruleId: message.ruleId, line: message.line, message: message.message };
        });
        assert.deepStrictEqual(detail, [], 'Number.NaN/Number.POSITIVE_INFINITY must not be flagged');
    });
});
