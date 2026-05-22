const lineWidth = 120;
const indentWidth = 4;

export const typescriptDprintConfig = {
    lineWidth,
    indentWidth,
    newLineKind: 'lf',
    useTabs: false,
    semiColons: 'always',
    quoteStyle: 'preferSingle',
    quoteProps: 'asNeeded',
    useBraces: 'always',
    bracePosition: 'sameLine',
    singleBodyPosition: 'nextLine',
    nextControlFlowPosition: 'sameLine',
    trailingCommas: 'never',
    operatorPosition: 'maintain',
    preferHanging: false,
    preferSingleLine: false,
    'arrowFunction.useParentheses': 'force',
    'binaryExpression.linePerExpression': false,
    'jsx.bracketPosition': 'nextLine',
    'jsx.forceNewLinesSurroundingContent': false,
    'jsx.multiLineParens': 'prefer',
    'memberExpression.linePerExpression': true,
    'typeLiteral.separatorKind': 'semiColon',
    'arrayExpression.spaceAround': true,
    'arrayPattern.spaceAround': true,
    'enumDeclaration.memberSpacing': 'newLine',
    spaceAround: false,
    spaceSurroundingProperties: true,
    'binaryExpression.spaceSurroundingBitwiseAndArithmeticOperator': true,
    'commentLine.forceSpaceAfterSlashes': true,
    'constructor.spaceBeforeParentheses': false,
    'constructorType.spaceAfterNewKeyword': true,
    'constructSignature.spaceAfterNewKeyword': true,
    'doWhileStatement.spaceAfterWhileKeyword': true,
    'exportDeclaration.spaceSurroundingNamedExports': true,
    'forInStatement.spaceAfterForKeyword': true,
    'forOfStatement.spaceAfterForKeyword': true,
    'forStatement.spaceAfterForKeyword': true,
    'forStatement.spaceAfterSemiColons': true,
    'functionDeclaration.spaceBeforeParentheses': false,
    'functionExpression.spaceBeforeParentheses': false,
    'functionExpression.spaceAfterFunctionKeyword': true,
    'getAccessor.spaceBeforeParentheses': false,
    'ifStatement.spaceAfterIfKeyword': true,
    'importDeclaration.spaceSurroundingNamedImports': true,
    'jsxSelfClosingElement.spaceBeforeSlash': true,
    'jsxExpressionContainer.spaceSurroundingExpression': false,
    'method.spaceBeforeParentheses': false,
    'setAccessor.spaceBeforeParentheses': false,
    'taggedTemplate.spaceBeforeLiteral': false,
    'typeAnnotation.spaceBeforeColon': false,
    'typeAssertion.spaceBeforeExpression': false,
    'whileStatement.spaceAfterWhileKeyword': true,
    'module.sortImportDeclarations': 'maintain',
    'module.sortExportDeclarations': 'maintain',
    'exportDeclaration.sortNamedExports': 'maintain',
    'importDeclaration.sortNamedImports': 'maintain',
    'exportDeclaration.forceSingleLine': false,
    'importDeclaration.forceSingleLine': false,
    'exportDeclaration.forceMultiLine': 'never',
    'importDeclaration.forceMultiLine': 'never'
};

export const jsonDprintConfig = {
    lineWidth,
    indentWidth,
    newLineKind: 'lf',
    useTabs: false
};

export const markdownDprintConfig = {
    lineWidth,
    newLineKind: 'lf',
    textWrap: 'maintain',
    emphasisKind: 'underscores',
    strongKind: 'asterisks'
};

export const yamlDprintConfig = {
    printWidth: lineWidth,
    indentWidth,
    lineBreak: 'lf'
};

export const tomlDprintConfig = {
    lineWidth,
    indentWidth,
    newLineKind: 'lf',
    useTabs: false
};
