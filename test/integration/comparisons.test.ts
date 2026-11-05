import assert from 'node:assert';
import { suite, test } from 'mocha';
import { baseConfig } from '../../configs/presets/base/base.ts';
import { typescriptConfig } from '../../configs/presets/typescript/typescript.ts';
import { lintFixture } from './lint-fixture.ts';

suite('comparison integration', function () {
    test('reports unsafe comparisons and fresh reference lookups while allowing identity and date comparisons', async function () {
        const configs = [ ...baseConfig, { ...typescriptConfig, files: [ '**/*.ts' ] } ];
        const { messages } = await lintFixture(configs, 'base-typescript', 'comparisons.ts');
        assert.deepStrictEqual(
            messages.filter(function isFatal(message) {
                return message.fatal === true;
            }),
            []
        );
        const reports = messages
            .filter(function isComparisonRule(message) {
                return message.ruleId?.startsWith('no-object-comparison/') === true || [
                    'use-isnan',
                    'no-self-compare'
                ]
                    .includes(message.ruleId ?? '');
            })
            .map(function toRuleLocation(message) {
                return [ message.line, message.ruleId ];
            });
        assert.deepStrictEqual(reports, [
            [ 3, 'no-object-comparison/object-relational' ],
            [ 4, 'no-object-comparison/floating-point-equality' ],
            [ 5, 'no-object-comparison/string-number-relational' ],
            [ 6, 'no-self-compare' ],
            [ 7, 'no-object-comparison/array-includes-object' ],
            [ 8, 'no-object-comparison/collection-reference-lookup' ],
            [ 9, 'use-isnan' ],
            [ 10, 'no-self-compare' ]
        ]);
    });
});
