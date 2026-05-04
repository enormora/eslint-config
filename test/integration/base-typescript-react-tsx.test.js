import test from 'ava';
import { baseConfig } from '../../configs/base.js';
import { typescriptConfig } from '../../configs/typescript.js';
import { reactTsxConfig } from '../../configs/react-tsx.js';
import { fixFixture, lintFixture, resolveFixture, uniqueSortedRuleIds } from './lint-fixture.js';

const comboName = 'base-typescript-react-tsx';
const configs = [baseConfig, { ...typescriptConfig, files: ['**/*.tsx'] }, { ...reactTsxConfig, files: ['**/*.tsx'] }];

const expectedViolationRuleIds = [
    '@typescript-eslint/explicit-function-return-type',
    '@typescript-eslint/no-unsafe-assignment',
    '@typescript-eslint/no-unsafe-call',
    '@typescript-eslint/no-unsafe-return',
    '@typescript-eslint/no-unused-vars',
    '@typescript-eslint/no-use-before-define',
    '@typescript-eslint/strict-boolean-expressions',
    'arrow-body-style',
    'destructuring/in-params',
    'functional/prefer-immutable-types',
    'functional/type-declaration-immutability',
    'prettier/prettier',
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
    'sonarjs/prefer-read-only-props'
];

test('base+typescript+react-tsx violations fixture reports the expected rule ids', async (t) => {
    const { messages } = await lintFixture(configs, comboName, 'violations.tsx');
    t.deepEqual(uniqueSortedRuleIds(messages), expectedViolationRuleIds);
});

test('base+typescript+react-tsx clean fixture produces no reports', async (t) => {
    const { messages } = await lintFixture(configs, comboName, 'clean.tsx');
    const detail = messages.map((message) => {
        return { ruleId: message.ruleId, line: message.line, message: message.message };
    });
    t.deepEqual(detail, []);
});

test('base+typescript+react-tsx autofix is idempotent on the violations fixture', async (t) => {
    const { code, filePath } = await resolveFixture(comboName, 'violations.tsx');
    const firstPass = fixFixture(configs, code, filePath);
    const secondPass = fixFixture(configs, firstPass.output, filePath);
    t.is(secondPass.output, firstPass.output, 'second autofix pass changed the output');
    t.false(secondPass.fixed, 'second autofix pass reported further fixes');
});
