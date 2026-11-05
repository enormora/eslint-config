import assert from 'node:assert';
import { suite, test } from 'mocha';
import { baseConfig } from '../../configs/presets/base/base.ts';
import { baseWithPrettierConfig } from '../../configs/presets/base-with-prettier/base-with-prettier.ts';
import { lintFixture } from './lint-fixture.ts';

suite('math integration', function () {
    for (const basePreset of [ baseConfig, baseWithPrettierConfig ]) {
        test('adds math checks while keeping existing rules responsible for overlapping rewrites', async function () {
            const { messages } = await lintFixture(basePreset, 'base-node', 'math.js');
            assert.deepStrictEqual(
                messages.filter(function isFatal(message) {
                    return message.fatal === true;
                }),
                []
            );
            const reports = messages
                .filter(function isNumericRule(message) {
                    return message.ruleId?.startsWith('math/') === true || [
                        'unicorn/prefer-math-trunc',
                        'unicorn/prefer-modern-math-apis',
                        'unicorn/prefer-number-is-safe-integer'
                    ]
                        .includes(message.ruleId ?? '');
                })
                .map(function toRuleLocation(message) {
                    return [ message.line, message.ruleId ];
                });
            assert.deepStrictEqual(reports, [
                [ 1, 'math/no-static-infinity-calculations' ],
                [ 2, 'math/no-static-nan-calculations' ],
                [ 3, 'math/prefer-math-cbrt' ],
                [ 4, 'math/prefer-math-sqrt' ],
                [ 5, 'math/prefer-number-epsilon' ],
                [ 6, 'math/prefer-number-max-safe-integer' ],
                [ 7, 'math/prefer-number-max-safe-integer' ],
                [ 8, 'math/prefer-number-max-value' ],
                [ 9, 'math/prefer-number-min-value' ],
                [ 10, 'unicorn/prefer-math-trunc' ],
                [ 11, 'unicorn/prefer-modern-math-apis' ],
                [ 12, 'unicorn/prefer-number-is-safe-integer' ]
            ]);
        });
    }
});
