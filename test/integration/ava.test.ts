import assert from 'node:assert';
import { suite, test } from 'mocha';
import { avaConfig } from '../../configs/presets/ava/ava.ts';
import { baseConfig } from '../../configs/presets/base/base.ts';
import { lintFixture } from './lint-fixture.ts';

suite('AVA JavaScript configuration', function () {
    test('loads without applying JSON-only rules to JavaScript', async function () {
        const { messages } = await lintFixture([ ...baseConfig, avaConfig ], 'base-node', 'clean.js');
        assert.deepStrictEqual(messages, []);
    });
});
