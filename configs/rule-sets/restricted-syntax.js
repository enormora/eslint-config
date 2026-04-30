const defaultAllowedSuperClassNamePattern = '/Error$/';
const defaultClassDeclarationMessage = 'Class declarations are not allowed except for extending errors.';

export function createNoClassDeclarationRestriction({
    allowedSuperClassNamePattern = defaultAllowedSuperClassNamePattern,
    message = defaultClassDeclarationMessage
} = {}) {
    return {
        selector: `ClassDeclaration[superClass.name!=${allowedSuperClassNamePattern}]`,
        message
    };
}

export const noClassDeclarationRestriction = createNoClassDeclarationRestriction();

export const noSwitchStatementRestriction = {
    selector: 'SwitchStatement',
    message: 'Use pattern matching instead.'
};

export const noTsEnumDeclarationRestriction = {
    selector: 'TSEnumDeclaration',
    message: 'Use a string union type instead'
};
