import assert from 'node:assert';
import { suite, test } from 'mocha';
import { baseConfig } from '../../configs/presets/base/base.ts';
import { reactTsxConfig } from '../../configs/presets/react-tsx/react-tsx.ts';
import { typescriptConfig } from '../../configs/presets/typescript/typescript.ts';
import { fixFixture, lintFixture, resolveFixture, uniqueSortedRuleIds } from './lint-fixture.ts';

const comboName = 'base-typescript-react-tsx';
const configs = [ ...baseConfig, { ...typescriptConfig, files: [ '**/*.tsx' ] }, {
    ...reactTsxConfig,
    files: [ '**/*.tsx' ]
} ];

const expectedViolationRuleIds = [
    '@stylistic/array-bracket-spacing',
    '@stylistic/no-extra-parens',
    '@typescript-eslint/explicit-function-return-type',
    '@typescript-eslint/no-unsafe-assignment',
    '@typescript-eslint/no-unsafe-call',
    '@typescript-eslint/no-unsafe-return',
    '@typescript-eslint/no-unused-vars',
    '@typescript-eslint/no-use-before-define',
    '@typescript-eslint/strict-boolean-expressions',
    'arrow-body-style',
    'destructuring/in-params',
    'dprint/typescript',
    'functional/prefer-immutable-types',
    'functional/type-declaration-immutability',
    'react-hooks/exhaustive-deps',
    'react-hooks/rules-of-hooks',
    'react/button-has-type',
    'react/jsx-boolean-value',
    'react/jsx-fragments',
    'react/jsx-key',
    'react/jsx-no-leaked-render',
    'react/jsx-no-literals',
    'react/jsx-no-target-blank',
    'react/react-in-jsx-scope',
    'restricted-syntax-typescript/no-inline-signature-type-literal',
    'restricted-syntax/no-unnecessary-arrow-function',
    'sonarjs/prefer-read-only-props'
];

suite('base+typescript+react-tsx integration', function () {
    test('base+typescript+react-tsx violations fixture reports the expected rule ids', async function () {
        const { messages } = await lintFixture(configs, comboName, 'violations.tsx');
        assert.deepStrictEqual(uniqueSortedRuleIds(messages), expectedViolationRuleIds);
    });

    test('base+typescript+react-tsx clean fixture produces no reports', async function () {
        const { messages } = await lintFixture(configs, comboName, 'clean.tsx');
        const detail = messages.map(function toReportDetail(message) {
            return { ruleId: message.ruleId, line: message.line, message: message.message };
        });
        assert.deepStrictEqual(detail, []);
    });

    test('base+typescript+react-tsx autofix is idempotent on the violations fixture', async function () {
        const { code, filePath } = await resolveFixture(comboName, 'violations.tsx');
        const firstPass = fixFixture(configs, code, filePath);
        const secondPass = fixFixture(configs, firstPass.output, filePath);
        assert.strictEqual(secondPass.output, firstPass.output, 'second autofix pass changed the output');
        assert.strictEqual(secondPass.fixed, false, 'second autofix pass reported further fixes');
    });
});
