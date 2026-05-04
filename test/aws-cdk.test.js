import test from 'ava';
import { awsCdkConfig } from '../configs/presets/aws-cdk/aws-cdk.js';
import { checkConfigToHaveNoValidationIssues } from './rules-configuration.js';

test('aws-cdk preset config has no validation errors', checkConfigToHaveNoValidationIssues, awsCdkConfig);
