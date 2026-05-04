import { createNoClassDeclarationRestriction } from './rule-sets/restricted-syntax.js';

const cdkClassDeclarationRestriction = createNoClassDeclarationRestriction({
    allowedSuperClassNamePattern: '/(Error|Construct|Stack|Resource)$/',
    message: 'Class declarations are not allowed except for extending errors or CDK constructs.'
});

export const awsCdkConfig = {
    rules: {
        'restricted-syntax/no-class-declaration': ['error', cdkClassDeclarationRestriction],
        'no-new': 'off',
        'sonarjs/constructor-for-side-effects': 'off',
        'functional/no-this-expressions': 'off'
    }
};
