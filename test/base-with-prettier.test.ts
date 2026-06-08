import { suite, test } from 'mocha';
import { baseWithPrettierConfig } from '../configs/presets/base-with-prettier/base-with-prettier.ts';
import { baseWithPrettierPluginRuleSet } from './base-with-prettier-plugin-rule-set.ts';
import {
    checkAllCoreRulesConfigured,
    checkAllPluginRulesConfigured,
    checkConfigToHaveNoValidationIssues,
    checkUnknownCoreRulesAreNotConfigured,
    checkUnknownPluginRulesAreNotConfigured,
    mergeConfigRules
} from './rules-configuration.ts';

const baseWithPrettierConfigRules = mergeConfigRules(baseWithPrettierConfig);

function pluginCoverageSuite(pluginName: string, pluginRules: Record<string, unknown> | undefined): void {
    suite(pluginName, function () {
        test('all rules are configured', function () {
            checkAllPluginRulesConfigured({
                ruleConfigSet: baseWithPrettierConfigRules,
                pluginRules,
                pluginName
            });
        });

        test('no unknown rules are configured', function () {
            checkUnknownPluginRulesAreNotConfigured({
                ruleConfigSet: baseWithPrettierConfigRules,
                pluginRules,
                pluginName
            });
        });
    });
}

suite('base-with-prettier preset', function () {
    test('all core rules are configured', function () {
        checkAllCoreRulesConfigured({ ruleConfigSet: baseWithPrettierConfigRules });
    });

    test('does not contain removed core rules', function () {
        checkUnknownCoreRulesAreNotConfigured({ ruleConfigSet: baseWithPrettierConfigRules });
    });

    for (const [ pluginName, pluginRules ] of Object.entries(baseWithPrettierPluginRuleSet)) {
        pluginCoverageSuite(pluginName, pluginRules);
    }

    test('base-with-prettier preset config has no validation errors', function () {
        checkConfigToHaveNoValidationIssues(baseWithPrettierConfig);
    });
});
