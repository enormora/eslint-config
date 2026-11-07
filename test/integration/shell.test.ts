import assert from 'node:assert';
import { suite, test } from 'mocha';
import { baseConfig } from '../../configs/presets/base/base.ts';
import { baseWithPrettierConfig } from '../../configs/presets/base-with-prettier/base-with-prettier.ts';
import { bashConfig } from '../../configs/presets/bash/bash.ts';
import { fixFixture, lintFixture, resolveFixture, uniqueSortedRuleIds } from './lint-fixture.ts';

const expectedViolationRuleIds = [
    'shell/no-backticks',
    'shell/no-expansions-in-single-quotes',
    'shell/no-ls-iteration',
    'shell/no-unquoted-expansions',
    'shell/no-unused-vars',
    'shell/no-useless-cat',
    'shell/no-useless-echo',
    'shell/no-variables-in-printf-format',
    'shell/require-cd-guard',
    'shell/require-read-r'
];

for (
    const [ name, configs ] of [
        [ 'base', baseConfig ],
        [ 'base with prettier', baseWithPrettierConfig ]
    ] as const
) {
    suite(`${name} shell integration`, function () {
        test('accepts POSIX shell without formatter or JavaScript reports', async function () {
            const { messages } = await lintFixture(configs, 'shell', 'clean.sh');
            assert.deepStrictEqual(messages, []);
        });

        test('reports the shell rule violations', async function () {
            const { messages } = await lintFixture(configs, 'shell', 'violations.sh');
            assert.deepStrictEqual(uniqueSortedRuleIds(messages), expectedViolationRuleIds);
            assert.ok(messages.every(function isRuleReport(message) {
                return message.fatal !== true;
            }));
        });

        test('rejects Bash syntax in .sh even with a Bash shebang', async function () {
            const { code, filePath } = await resolveFixture('shell', 'clean.bash');
            const { messages } = fixFixture(configs, code, `${filePath}.sh`);
            assert.ok(messages.some(function isParseError(message) {
                return message.fatal === true;
            }));
        });

        test('leaves .bash files to the Bash preset', async function () {
            const { messages } = await lintFixture(configs, 'shell', 'clean.bash');
            assert.strictEqual(messages.length, 1);
            assert.match(messages[0]?.message ?? '', /No matching configuration/u);
        });

        test('fixes shell violations idempotently', async function () {
            const { code, filePath } = await resolveFixture('shell', 'violations.sh');
            const firstPass = fixFixture(configs, code, filePath);
            assert.strictEqual(firstPass.fixed, true);
            assert.ok(firstPass.output.includes('echo "$directory"'));
            assert.ok(firstPass.output.includes('read -r answer'));
            const secondPass = fixFixture(configs, firstPass.output, filePath);
            assert.partialDeepStrictEqual(secondPass, { output: firstPass.output, fixed: false });
        });
    });
}

for (
    const [ name, configs ] of [
        [ 'standalone', [ bashConfig ] ],
        [ 'with base', [ ...baseConfig, bashConfig ] ],
        [ 'with base with prettier', [ ...baseWithPrettierConfig, bashConfig ] ]
    ] as const
) {
    suite(`Bash integration ${name}`, function () {
        test('accepts Bash syntax in .bash files', async function () {
            const { messages } = await lintFixture(configs, 'shell', 'clean.bash');
            assert.deepStrictEqual(messages, []);
        });

        test('accepts Bash syntax in .sh files', async function () {
            const { code, filePath } = await resolveFixture('shell', 'clean.bash');
            const { messages } = fixFixture(configs, code, `${filePath}.sh`);
            assert.deepStrictEqual(messages, []);
        });

        test('retains shell rules for .sh and .bash files', async function () {
            const { code, filePath } = await resolveFixture('shell', 'violations.sh');
            for (const filename of [ filePath, `${filePath}.bash` ]) {
                const { messages } = fixFixture(configs, code, filename);
                assert.ok(messages.some(function isUnusedVariableReport(message) {
                    return message.ruleId === 'shell/no-unused-vars';
                }));
                assert.ok(messages.every(function isRuleReport(message) {
                    return message.fatal !== true;
                }));
            }
        });
    });
}
