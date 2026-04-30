import test from 'ava';
import { awsCdkConfig } from '../configs/aws-cdk.js';
import { checkConfigToHaveNoValidationIssues } from './rules-configuration.js';

test('aws-cdk preset config has no validation errors', checkConfigToHaveNoValidationIssues, awsCdkConfig);
