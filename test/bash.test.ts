import shellPlugin from '@eslint/shell';
import { suite, test } from 'mocha';
import { baseConfig } from '../configs/presets/base/base.ts';
import { baseWithPrettierConfig } from '../configs/presets/base-with-prettier/base-with-prettier.ts';
import { bashConfig } from '../configs/presets/bash/bash.ts';
import {
    checkAllPluginRulesConfigured,
    checkUnknownPluginRulesAreNotConfigured,
    mergeConfigRules
} from './rules-configuration.ts';

for (
    const [ name, configs ] of [
        [ 'base', baseConfig ],
        [ 'base with prettier', baseWithPrettierConfig ],
        [ 'bash', [ bashConfig ] ]
    ] as const
) {
    const rules = mergeConfigRules(configs);

    suite(`${name} preset shell rules`, function () {
        test('all shell rules are configured', function () {
            checkAllPluginRulesConfigured({
                ruleConfigSet: rules,
                pluginRules: shellPlugin.rules,
                pluginName: 'shell'
            });
        });

        test('no unknown shell rules are configured', function () {
            checkUnknownPluginRulesAreNotConfigured({
                ruleConfigSet: rules,
                pluginRules: shellPlugin.rules,
                pluginName: 'shell'
            });
        });
    });
}
