import { suite, test } from 'mocha';
import {
    enormoraTypescriptPlugin
} from '../configs/plugins/enormora-typescript/enormora-typescript-plugin.ts';
import { typescriptConfig } from '../configs/presets/typescript/typescript.ts';
import { checkAllPluginRulesConfigured, checkUnknownPluginRulesAreNotConfigured } from './rules-configuration.ts';

suite('enormora-typescript plugin', function () {
    test('all enormora-typescript rules are configured', function () {
        checkAllPluginRulesConfigured({
            ruleConfigSet: typescriptConfig.rules,
            pluginRules: enormoraTypescriptPlugin.rules,
            pluginName: 'enormora-typescript'
        });
    });

    test('no unknown enormora-typescript rules are configured', function () {
        checkUnknownPluginRulesAreNotConfigured({
            ruleConfigSet: typescriptConfig.rules,
            pluginRules: enormoraTypescriptPlugin.rules,
            pluginName: 'enormora-typescript'
        });
    });
});
