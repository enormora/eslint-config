import shellPlugin from '@eslint/shell';
import { suite, test } from 'mocha';
import { bashConfig } from '../configs/presets/bash/bash.ts';
import {
    checkAllPluginRulesConfigured,
    checkUnknownPluginRulesAreNotConfigured
} from './rules-configuration.ts';

suite('bash preset', function () {
    test('all shell rules are configured', function () {
        checkAllPluginRulesConfigured({
            ruleConfigSet: bashConfig.rules,
            pluginRules: shellPlugin.rules,
            pluginName: 'shell'
        });
    });

    test('no unknown shell rules are configured', function () {
        checkUnknownPluginRulesAreNotConfigured({
            ruleConfigSet: bashConfig.rules,
            pluginRules: shellPlugin.rules,
            pluginName: 'shell'
        });
    });
});
