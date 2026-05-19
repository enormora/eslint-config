import assert from 'node:assert';
import { suite, test } from 'mocha';
import { baseConfig } from '../../configs/presets/base/base.js';
import { nodeConfig } from '../../configs/presets/node/node.js';
import { fixFixture, lintFixture, resolveFixture, uniqueSortedRuleIds } from './lint-fixture.js';

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
    'prefer-arrow-callback',
    'prefer-template',
    'promise/catch-or-return',
    'restricted-syntax/no-empty-function-body',
    'restricted-syntax/no-switch-statement',
    'sonarjs/no-collapsible-if',
    'sonarjs/no-nested-conditional',
    'sonarjs/no-small-switch',
    'sonarjs/no-useless-catch',
    'sonarjs/todo-tag',
    'unicorn/catch-error-name',
    'unicorn/error-message',
    'unicorn/no-array-sort',
    'unicorn/no-await-expression-member',
    'unicorn/no-for-loop',
    'unicorn/no-lonely-if',
    'unicorn/no-new-buffer',
    'unicorn/no-process-exit',
    'unicorn/numeric-separators-style',
    'unicorn/prefer-includes',
    'unicorn/prefer-math-trunc',
    'unicorn/prefer-node-protocol',
    'unicorn/prefer-string-slice'
];

suite('base+node integration', function () {
    test('base+node violations fixture reports the expected rule ids', async function () {
        const { messages } = await lintFixture(configs, comboName, 'violations.js');
        assert.deepStrictEqual(uniqueSortedRuleIds(messages), expectedViolationRuleIds);
    });

    test('base+node clean fixture produces no reports', async function () {
        const { messages } = await lintFixture(configs, comboName, 'clean.js');
        const detail = messages.map((message) => {
            return { ruleId: message.ruleId, line: message.line, message: message.message };
        });
        assert.deepStrictEqual(detail, []);
    });

    test('base+node autofix is idempotent on the violations fixture', async function () {
        const { code, filePath } = await resolveFixture(comboName, 'violations.js');
        const firstPass = fixFixture(configs, code, filePath);
        const secondPass = fixFixture(configs, firstPass.output, filePath);
        assert.strictEqual(secondPass.output, firstPass.output, 'second autofix pass changed the output');
        assert.strictEqual(secondPass.fixed, false, 'second autofix pass reported further fixes');
    });
});
