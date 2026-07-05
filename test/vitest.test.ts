import assert from 'node:assert';
import vitestPlugin from '@vitest/eslint-plugin';
import { suite, test } from 'mocha';
import { testSupportConfig as vitestTestSupportConfig, vitestConfig } from '../configs/presets/vitest/vitest.ts';
import { testSupportConfig } from '../configs/presets/test-base/test-base.ts';
import {
    checkAllPluginRulesConfigured,
    checkAllTestRulesConfigured,
    assertConfigToHaveNoValidationIssues,
    checkUnknownPluginRulesAreNotConfigured
} from './rules-configuration.ts';

suite('vitest preset', function () {
    test('all @vitest/eslint-plugin rules are configured', function () {
        checkAllPluginRulesConfigured({
            ruleConfigSet: vitestConfig.rules,
            pluginRules: vitestPlugin.rules,
            pluginName: '@vitest/eslint-plugin'
        });
    });

    test('no unknown @vitest/eslint-plugin rules are configured', function () {
        checkUnknownPluginRulesAreNotConfigured({
            ruleConfigSet: vitestConfig.rules,
            pluginRules: vitestPlugin.rules,
            pluginName: '@vitest/eslint-plugin'
        });
    });

    test('all common test rules are configured', function () {
        checkAllTestRulesConfigured({
            ruleConfigSet: vitestConfig.rules
        });
    });

    test('vitest preset config has no validation errors', function () {
        assert.deepStrictEqual(
            assertConfigToHaveNoValidationIssues(vitestConfig),
            [],
            'Vitest preset config must have no validation errors'
        );
    });

    test('re-exports the canonical testSupportConfig', function () {
        assert.strictEqual(
            vitestTestSupportConfig,
            testSupportConfig,
            'Vitest preset must re-export the canonical testSupportConfig'
        );
    });
});
