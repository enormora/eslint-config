import assert from 'node:assert';
import { suite, test } from 'mocha';
import avaPlugin from 'eslint-plugin-ava';
import { avaConfig, testSupportConfig as avaTestSupportConfig } from '../configs/presets/ava/ava.ts';
import { testSupportConfig } from '../configs/presets/test-base/test-base.ts';
import {
    checkAllPluginRulesConfigured,
    checkAllTestRulesConfigured,
    assertConfigToHaveNoValidationIssues,
    checkUnknownPluginRulesAreNotConfigured
} from './rules-configuration.ts';

suite('ava preset', function () {
    test('all eslint-plugin-ava rules are configured', function () {
        checkAllPluginRulesConfigured({
            ruleConfigSet: avaConfig.rules,
            pluginRules: avaPlugin.rules,
            pluginName: 'eslint-plugin-ava'
        });
    });

    test('no unknown eslint-plugin-ava rules are configured', function () {
        checkUnknownPluginRulesAreNotConfigured({
            ruleConfigSet: avaConfig.rules,
            pluginRules: avaPlugin.rules,
            pluginName: 'eslint-plugin-ava'
        });
    });

    test('all common test rules are configured', function () {
        checkAllTestRulesConfigured({
            ruleConfigSet: avaConfig.rules
        });
    });

    test('ava preset config has no validation errors', function () {
        assert.deepStrictEqual(
            assertConfigToHaveNoValidationIssues(avaConfig),
            [],
            'AVA preset config must have no validation errors'
        );
    });

    test('re-exports the canonical testSupportConfig', function () {
        assert.strictEqual(
            avaTestSupportConfig,
            testSupportConfig,
            'AVA preset must re-export the canonical testSupportConfig'
        );
    });
});
