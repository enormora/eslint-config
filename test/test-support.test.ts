import assert from 'node:assert';
import { suite, test } from 'mocha';
import { testRuleSet, testSupportConfig } from '../configs/presets/test-base/test-base.ts';
import { checkConfigToHaveNoValidationIssues } from './rules-configuration.ts';

suite('testSupportConfig', function () {
    test('exposes exactly the rules from testRuleSet', function () {
        assert.deepStrictEqual(Object.keys(testSupportConfig.rules ?? {}), Object.keys(testRuleSet.rules));
    });

    test('has no rules outside testRuleSet', function () {
        const supportRuleNames = Object.keys(testSupportConfig.rules ?? {});
        const testRuleNames = Object.keys(testRuleSet.rules);
        const extraneous = supportRuleNames.filter(function isUnexpected(ruleName) {
            return !testRuleNames.includes(ruleName);
        });

        assert.deepStrictEqual(extraneous, []);
    });

    test('config has no validation errors', function () {
        checkConfigToHaveNoValidationIssues(testSupportConfig);
    });
});
