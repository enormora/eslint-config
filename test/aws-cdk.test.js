import { suite, test } from 'mocha';
import { awsCdkConfig } from '../configs/presets/aws-cdk/aws-cdk.js';
import { checkAdditionalRulesConfigured, checkConfigToHaveNoValidationIssues } from './rules-configuration.js';

suite('aws-cdk preset', function () {
    test('aws-cdk preset config has no validation errors', function () {
        checkConfigToHaveNoValidationIssues(awsCdkConfig);
    });

    test('aws-cdk preset config disables the immutability rules that CDK constructs cannot satisfy', function () {
        checkAdditionalRulesConfigured({
            ruleConfigSet: awsCdkConfig.rules,
            additionalRules: {
                'functional/prefer-immutable-types': 'off',
                'functional/type-declaration-immutability': 'off'
            }
        });
    });
});
