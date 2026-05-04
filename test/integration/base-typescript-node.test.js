import test from 'ava';
import { baseConfig } from '../../configs/presets/base/base.js';
import { nodeConfig } from '../../configs/presets/node/node.js';
import { typescriptConfig } from '../../configs/presets/typescript/typescript.js';
import { fixFixture, lintFixture, resolveFixture, uniqueSortedRuleIds } from './lint-fixture.js';

const comboName = 'base-typescript-node';
const configs = [baseConfig, nodeConfig, { ...typescriptConfig, files: ['**/*.ts'] }];

const expectedViolationRuleIds = [
    '@typescript-eslint/array-type',
    '@typescript-eslint/ban-ts-comment',
    '@typescript-eslint/consistent-type-assertions',
    '@typescript-eslint/consistent-type-definitions',
    '@typescript-eslint/default-param-last',
    '@typescript-eslint/max-params',
    '@typescript-eslint/method-signature-style',
    '@typescript-eslint/naming-convention',
    '@typescript-eslint/no-confusing-void-expression',
    '@typescript-eslint/no-explicit-any',
    '@typescript-eslint/no-extraneous-class',
    '@typescript-eslint/no-floating-promises',
    '@typescript-eslint/no-inferrable-types',
    '@typescript-eslint/no-magic-numbers',
    '@typescript-eslint/no-namespace',
    '@typescript-eslint/no-non-null-assertion',
    '@typescript-eslint/no-shadow',
    '@typescript-eslint/no-this-alias',
    '@typescript-eslint/no-unnecessary-condition',
    '@typescript-eslint/no-unnecessary-type-assertion',
    '@typescript-eslint/no-unsafe-call',
    '@typescript-eslint/no-unsafe-member-access',
    '@typescript-eslint/no-unsafe-return',
    '@typescript-eslint/no-unsafe-type-assertion',
    '@typescript-eslint/no-unused-vars',
    '@typescript-eslint/no-useless-constructor',
    '@typescript-eslint/only-throw-error',
    '@typescript-eslint/prefer-as-const',
    '@typescript-eslint/prefer-for-of',
    '@typescript-eslint/prefer-includes',
    '@typescript-eslint/prefer-nullish-coalescing',
    '@typescript-eslint/prefer-optional-chain',
    '@typescript-eslint/promise-function-async',
    '@typescript-eslint/require-array-sort-compare',
    '@typescript-eslint/strict-boolean-expressions',
    '@typescript-eslint/triple-slash-reference',
    'complexity',
    'default-case',
    'eqeqeq',
    'functional/no-this-expressions',
    'functional/prefer-immutable-types',
    'functional/type-declaration-immutability',
    'id-length',
    'import/no-duplicates',
    'init-declarations',
    'max-depth',
    'max-statements',
    'no-bitwise',
    'no-console',
    'no-constant-condition',
    'no-debugger',
    'no-duplicate-imports',
    'no-eq-null',
    'no-nested-ternary',
    'no-param-reassign',
    'no-plusplus',
    'no-template-curly-in-string',
    'no-throw-literal',
    'no-undef',
    'no-unneeded-ternary',
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
    'restricted-syntax-typescript/no-inline-signature-type-literal',
    'restricted-syntax/no-class-declaration',
    'restricted-syntax/no-empty-function-body',
    'restricted-syntax/no-switch-statement',
    'sonarjs/deprecation',
    'sonarjs/no-alphabetical-sort',
    'sonarjs/no-collapsible-if',
    'sonarjs/no-nested-conditional',
    'sonarjs/no-small-switch',
    'sonarjs/no-unused-collection',
    'sonarjs/no-useless-catch',
    'sonarjs/todo-tag',
    'unicorn/catch-error-name',
    'unicorn/error-message',
    'unicorn/no-array-sort',
    'unicorn/no-await-expression-member',
    'unicorn/no-for-loop',
    'unicorn/no-immediate-mutation',
    'unicorn/no-lonely-if',
    'unicorn/no-new-buffer',
    'unicorn/no-process-exit',
    'unicorn/no-this-assignment',
    'unicorn/numeric-separators-style',
    'unicorn/prefer-includes',
    'unicorn/prefer-math-trunc',
    'unicorn/prefer-node-protocol',
    'unicorn/prefer-string-slice'
];

test('base+typescript+node violations fixture reports the expected rule ids', async (t) => {
    const { messages } = await lintFixture(configs, comboName, 'violations.ts');
    t.deepEqual(uniqueSortedRuleIds(messages), expectedViolationRuleIds);
});

test('base+typescript+node clean fixture produces no reports', async (t) => {
    const { messages } = await lintFixture(configs, comboName, 'clean.ts');
    const detail = messages.map((message) => {
        return { ruleId: message.ruleId, line: message.line, message: message.message };
    });
    t.deepEqual(detail, []);
});

test('base+typescript+node autofix is idempotent on the violations fixture', async (t) => {
    const { code, filePath } = await resolveFixture(comboName, 'violations.ts');
    const firstPass = fixFixture(configs, code, filePath);
    const secondPass = fixFixture(configs, firstPass.output, filePath);
    t.is(secondPass.output, firstPass.output, 'second autofix pass changed the output');
    t.false(secondPass.fixed, 'second autofix pass reported further fixes');
});
