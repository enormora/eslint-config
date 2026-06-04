import { suite, test } from 'mocha';
import { baseConfig } from '../configs/presets/base/base.js';
import { basePluginRuleSet } from './base-plugin-rule-set.js';
import {
    checkAllCoreRulesConfigured,
    checkAllPluginRulesConfigured,
    checkConfigToHaveNoValidationIssues,
    checkUnknownCoreRulesAreNotConfigured,
    checkUnknownPluginRulesAreNotConfigured,
    mergeConfigRules
} from './rules-configuration.js';

const baseConfigRules = mergeConfigRules(baseConfig);

function pluginCoverageSuite(pluginName, pluginRules) {
    suite(pluginName, function () {
        test('all rules are configured', function () {
            checkAllPluginRulesConfigured({ ruleConfigSet: baseConfigRules, pluginRules, pluginName });
        });

        test('no unknown rules are configured', function () {
            checkUnknownPluginRulesAreNotConfigured({ ruleConfigSet: baseConfigRules, pluginRules, pluginName });
        });
    });
}

suite('base preset', function () {
    test('all core rules are configured', function () {
        checkAllCoreRulesConfigured({ ruleConfigSet: baseConfigRules });
    });

    test('does not contain removed core rules', function () {
        checkUnknownCoreRulesAreNotConfigured({ ruleConfigSet: baseConfigRules });
    });

    for (const [ pluginName, pluginRules ] of Object.entries(basePluginRuleSet)) {
        pluginCoverageSuite(pluginName, pluginRules);
    }

    test('base preset config has no validation errors', function () {
        checkConfigToHaveNoValidationIssues(baseConfig);
    });
});
