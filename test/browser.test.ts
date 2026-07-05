import assert from 'node:assert';
import { suite, test } from 'mocha';
import { browserConfig } from '../configs/presets/browser/browser.ts';
import { baseConfig } from '../configs/presets/base/base.ts';
import { assertConfigToHaveNoValidationIssues, mergeConfigRules } from './rules-configuration.ts';

const browserConfigRules = mergeConfigRules(browserConfig);
const browserUnicornRules = [
    'unicorn/better-dom-traversing',
    'unicorn/dom-node-dataset',
    'unicorn/no-blob-to-file',
    'unicorn/no-canvas-to-image',
    'unicorn/no-incorrect-query-selector',
    'unicorn/no-invalid-file-input-accept',
    'unicorn/no-late-current-target-access',
    'unicorn/no-late-event-control',
    'unicorn/no-selector-as-dom-name',
    'unicorn/no-unsafe-dom-html',
    'unicorn/prefer-add-event-listener-options',
    'unicorn/prefer-dom-node-html-methods',
    'unicorn/prefer-dom-node-replace-children',
    'unicorn/prefer-location-assign',
    'unicorn/prefer-observer-apis',
    'unicorn/prefer-path2d',
    'unicorn/prefer-scoped-selector',
    'unicorn/prefer-toggle-attribute',
    'unicorn/require-css-escape',
    'unicorn/require-passive-events'
];

suite('browser preset', function () {
    test('browser-owned unicorn rules are configured', function () {
        for (const ruleName of browserUnicornRules) {
            assert.ok(Object.hasOwn(browserConfigRules ?? {}, ruleName), `${ruleName} not configured`);
        }
    });

    test('browser preset config has no validation errors with base', function () {
        assert.deepStrictEqual(
            assertConfigToHaveNoValidationIssues([ ...baseConfig, browserConfig ]),
            [],
            'browser preset config must have no validation errors with base'
        );
    });
});
