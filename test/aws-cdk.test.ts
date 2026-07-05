import { suite, test } from 'mocha';
import { awsCdkConfig } from '../configs/presets/aws-cdk/aws-cdk.ts';
import { assertConfigToHaveNoValidationIssues } from './rules-configuration.ts';

suite('aws-cdk preset', function () {
    test('aws-cdk preset config has no validation errors', function () {
        assertConfigToHaveNoValidationIssues(awsCdkConfig);
    });
});
