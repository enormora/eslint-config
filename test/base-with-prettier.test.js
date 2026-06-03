import { rules as eslintCommentsPluginRules } from '@eslint-community/eslint-plugin-eslint-comments';
import markdownPlugin from '@eslint/markdown';
import { suite, test } from 'mocha';
import { rules as importPluginRules } from 'eslint-plugin-import-x';
import { rules as markdownLinksPluginRules } from 'eslint-plugin-markdown-links';
import { rules as markdownPreferencesPluginRules } from 'eslint-plugin-markdown-preferences';
import { rules as noSecretsPluginRules } from 'eslint-plugin-no-secrets';
import prettierPlugin from 'eslint-plugin-prettier';
import { baseWithPrettierConfig } from '../configs/presets/base-with-prettier/base-with-prettier.js';
import {
    checkAllCoreRulesConfigured,
    checkAllPluginRulesConfigured,
    checkConfigToHaveNoValidationIssues,
    checkUnknownCoreRulesAreNotConfigured,
    checkUnknownPluginRulesAreNotConfigured,
    mergeConfigRules
} from './rules-configuration.js';

const baseWithPrettierConfigRules = mergeConfigRules(baseWithPrettierConfig);

function pluginCoverageSuite(pluginName, pluginRules) {
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

    pluginCoverageSuite('eslint-plugin-no-secrets', noSecretsPluginRules);
    pluginCoverageSuite('eslint-plugin-import', importPluginRules);
    pluginCoverageSuite('eslint-plugin-eslint-comments', eslintCommentsPluginRules);
    pluginCoverageSuite('eslint-plugin-prettier', prettierPlugin.rules);
    pluginCoverageSuite('@eslint/markdown', markdownPlugin.rules);
    pluginCoverageSuite('eslint-plugin-markdown-links', markdownLinksPluginRules);
    pluginCoverageSuite('eslint-plugin-markdown-preferences', markdownPreferencesPluginRules);

    test('base-with-prettier preset config has no validation errors', function () {
        checkConfigToHaveNoValidationIssues(baseWithPrettierConfig);
    });
});
