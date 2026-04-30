export const noClassDeclarationRestriction = {
    selector: 'ClassDeclaration[superClass.name!=/Error$/]',
    message: 'Class declarations are not allowed except for extending errors.'
};

export const noSwitchStatementRestriction = {
    selector: 'SwitchStatement',
    message: 'Use pattern matching instead.'
};

export const noTsEnumDeclarationRestriction = {
    selector: 'TSEnumDeclaration',
    message: 'Use a string union type instead'
};
