import assert from 'node:assert';
import { suite, test } from 'mocha';
import { testRuleSet, testSupportConfig } from '../configs/presets/test-base/test-base.ts';
import { assertConfigToHaveNoValidationIssues } from './rules-configuration.ts';

suite('testSupportConfig', function () {
    test('exposes exactly the rules from testRuleSet', function () {
        assert.deepStrictEqual(
            Object.keys(testSupportConfig.rules ?? {}),
            Object.keys(testRuleSet.rules),
            'testSupportConfig rules must match testRuleSet rules'
        );
    });

    test('does not expose plugins', function () {
        assert.deepStrictEqual(
            testSupportConfig.plugins,
            undefined,
            'testSupportConfig must not expose framework-specific or assertion-specific plugins'
        );
    });

    test('has no rules outside testRuleSet', function () {
        const supportRuleNames = Object.keys(testSupportConfig.rules ?? {});
        const testRuleNames = Object.keys(testRuleSet.rules);
        const extraneous = supportRuleNames.filter(function isUnexpected(ruleName) {
            return !testRuleNames.includes(ruleName);
        });

        assert.deepStrictEqual(extraneous, [], 'testSupportConfig must not expose rules outside testRuleSet');
    });

    test('config has no validation errors', function () {
        assert.deepStrictEqual(
            assertConfigToHaveNoValidationIssues(testSupportConfig),
            [],
            'testSupportConfig must have no validation errors'
        );
    });
});
