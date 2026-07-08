import sonarjsPlugin from 'eslint-plugin-sonarjs';
import { createNoClassDeclarationRestriction } from '../../rule-sets/restricted-syntax.ts';

const cdkClassDeclarationRestriction = createNoClassDeclarationRestriction({
    allowedSuperClassNamePattern: '/(Error|Construct|Stack|Stage|App|Resource)$/',
    message: 'Class declarations are not allowed except for extending errors or CDK constructs.'
});

export const awsCdkConfig = {
    plugins: {
        sonarjs: sonarjsPlugin
    },
    rules: {
        'restricted-syntax/no-class-declaration': [ 'error', cdkClassDeclarationRestriction ],
        'no-new': 'off',
        'sonarjs/constructor-for-side-effects': 'off',

        'sonarjs/aws-apigateway-public-api': 'error',
        'sonarjs/aws-ec2-rds-dms-public': 'error',
        'sonarjs/aws-ec2-unencrypted-ebs-volume': 'error',
        'sonarjs/aws-efs-unencrypted': 'error',
        'sonarjs/aws-iam-all-privileges': 'error',
        'sonarjs/aws-iam-privilege-escalation': 'error',
        'sonarjs/aws-iam-public-access': 'error',
        'sonarjs/aws-opensearchservice-domain': 'error',
        'sonarjs/aws-rds-unencrypted-databases': 'error',
        'sonarjs/aws-restricted-ip-admin-access': 'error',
        'sonarjs/aws-s3-bucket-granted-access': 'error',
        'sonarjs/aws-s3-bucket-insecure-http': 'error',
        'sonarjs/aws-s3-bucket-public-access': 'error',
        'sonarjs/aws-s3-bucket-versioning': 'error',
        'sonarjs/aws-sagemaker-unencrypted-notebook': 'error',
        'sonarjs/aws-sns-unencrypted-topics': 'error',
        'sonarjs/aws-sqs-unencrypted-queue': 'error'
    }
};
