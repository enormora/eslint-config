import {
    createNoClassDeclarationRestriction,
    noSwitchStatementRestriction,
    noTsEnumDeclarationRestriction
} from './rule-sets/restricted-syntax.js';

const cdkClassDeclarationRestriction = createNoClassDeclarationRestriction({
    allowedSuperClassNamePattern: '/(Error|Construct)$/',
    message: 'Class declarations are not allowed except for extending errors or CDK constructs.'
});

export const awsCdkConfig = {
    rules: {
        'no-restricted-syntax': [
            'error',
            cdkClassDeclarationRestriction,
            noSwitchStatementRestriction,
            noTsEnumDeclarationRestriction
        ],
        'no-new': 'off',
        'sonarjs/constructor-for-side-effects': 'off',
        'functional/no-this-expressions': 'off'
    }
};
