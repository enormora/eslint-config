import { noSwitchStatementRestriction, noTsEnumDeclarationRestriction } from './rule-sets/restricted-syntax.js';

export const awsCdkConfig = {
    rules: {
        'no-restricted-syntax': ['error', noSwitchStatementRestriction, noTsEnumDeclarationRestriction],
        'no-new': 'off',
        'sonarjs/constructor-for-side-effects': 'off',
        'functional/no-this-expressions': 'off'
    }
};
