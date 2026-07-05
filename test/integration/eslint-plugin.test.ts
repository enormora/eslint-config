import assert from 'node:assert';
import { Linter } from 'eslint';
import { suite, test } from 'mocha';
import { createEslintPluginConfig } from '../../configs/presets/eslint-plugin/eslint-plugin.ts';

const eslintPluginConfig = createEslintPluginConfig({
    docsUrlPattern: 'https://example.com/rules/{{name}}.md',
    descriptionPattern: '^(Enforce|Require|Disallow)'
});

suite('eslint-plugin integration', function () {
    test('eslint-plugin preset resolves configured rules through ESLint', function () {
        const linter = new Linter({ configType: 'flat' });
        const reports = linter.verify('foo();', [ {
            ...eslintPluginConfig,
            rules: { 'eslint-plugin/consistent-output': 'error' }
        } ], 'foo.js');

        assert.deepStrictEqual(reports, [], 'eslint-plugin preset must resolve configured rules through ESLint');
    });
});
