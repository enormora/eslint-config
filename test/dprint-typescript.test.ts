import assert from 'node:assert';
import path from 'node:path';
import typescriptParser from '@typescript-eslint/parser';
import { Linter } from 'eslint';
import { suite, test } from 'mocha';
import { baseConfig } from '../configs/presets/base/base.ts';

const baseCodeConfig = baseConfig[0];
const formattingConfig = {
    ...baseCodeConfig,
    languageOptions: { parser: typescriptParser },
    rules: {
        'dprint/typescript': baseCodeConfig.rules?.['dprint/typescript'],
        '@stylistic/operator-linebreak': baseCodeConfig.rules?.['@stylistic/operator-linebreak']
    }
};
const filename = path.resolve('formatting.ts');
const firstType = 'FirstVeryLongNamedTypeThatWillExceedTheConfiguredLineWidth';
const secondType = 'SecondVeryLongNamedTypeThatWillExceedTheConfiguredLineWidth';

suite('dprint TypeScript formatting', function () {
    for (const [ kind, operator ] of [ [ 'union', '|' ], [ 'intersection', '&' ] ]) {
        const expected = `export type Example =\n    ${firstType} ${operator}\n    ${secondType};\n`;
        const inputs = [
            [ 'single-line', `export type Example = ${firstType} ${operator} ${secondType};\n` ],
            [
                'leading operators',
                `export type Example =\n    ${operator} ${firstType}\n    ${operator} ${secondType};\n`
            ],
            [ 'trailing operators', expected ]
        ];

        for (const [ style, input ] of inputs) {
            test(`formats ${kind} types with ${style} using trailing operators and stable autofixes`, function () {
                const linter = new Linter();
                const firstPass = linter.verifyAndFix(input, [ formattingConfig ], { filename });
                assert.strictEqual(firstPass.output, expected, 'type operators must trail the preceding line');
                assert.deepStrictEqual(firstPass.messages, [], 'formatting and operator rules must agree');

                const secondPass = linter.verifyAndFix(firstPass.output, [ formattingConfig ], { filename });
                assert.strictEqual(secondPass.output, expected, 'second autofix pass must preserve the output');
                assert.strictEqual(secondPass.fixed, false, 'second autofix pass must not apply further fixes');
                assert.deepStrictEqual(secondPass.messages, [], 'formatted types must produce no reports');
            });
        }
    }
});
