import { ASTUtils, AST_NODE_TYPES, ESLintUtils, type TSESLint, type TSESTree } from '@typescript-eslint/utils';

function ruleUrl(ruleName: string): string {
    return `https://github.com/enormora/eslint-config/blob/main/configs/plugins/enormora/${ruleName}.ts`;
}

const { RuleCreator: ruleCreator } = ESLintUtils;
const buildRule = ruleCreator(ruleUrl);
const complexExpressionTokens = new Set([ '?', '{', '}', '=>', 'function', 'class' ]);

function singleBranchStatement(branch: TSESTree.Statement): TSESTree.Statement | undefined {
    if (branch.type !== AST_NODE_TYPES.BlockStatement) {
        return branch;
    }
    const statements = branch.body.filter(function isNonEmptyStatement(statement) {
        return statement.type !== AST_NODE_TYPES.EmptyStatement;
    });
    if (statements.length !== 1) {
        return undefined;
    }
    return statements[0];
}

function isSimpleExpression(expression: TSESTree.Expression, sourceCode: TSESLint.SourceCode): boolean {
    if (expression.loc.start.line !== expression.loc.end.line) {
        return false;
    }
    return sourceCode.getTokens(expression).every(function isSimpleToken(token) {
        return !complexExpressionTokens.has(token.value);
    });
}

function branchAssignment(branch: Readonly<TSESTree.Statement> | undefined): TSESTree.AssignmentExpression | undefined {
    if (branch?.type !== AST_NODE_TYPES.ExpressionStatement) {
        return undefined;
    }
    const { expression } = branch;
    if (
        expression.type !== AST_NODE_TYPES.AssignmentExpression ||
        expression.operator !== '=' ||
        expression.left.type !== AST_NODE_TYPES.Identifier
    ) {
        return undefined;
    }
    return expression;
}

function isBooleanLiteral(expression: TSESTree.Expression): boolean {
    return expression.type === AST_NODE_TYPES.Literal && typeof expression.value === 'boolean';
}

type BranchSelection = {
    readonly consequent: TSESTree.Statement | undefined;
    readonly alternate: TSESTree.Statement | undefined;
    readonly sourceCode: TSESLint.SourceCode;
};

function branchReturnValue(branch: Readonly<TSESTree.Statement> | undefined): TSESTree.Expression | undefined {
    if (branch?.type !== AST_NODE_TYPES.ReturnStatement) {
        return undefined;
    }
    return branch.argument ?? undefined;
}

function selectsReturnValue(selection: BranchSelection): boolean {
    const { consequent, alternate, sourceCode } = selection;
    const consequentValue = branchReturnValue(consequent);
    const alternateValue = branchReturnValue(alternate);
    if (consequentValue === undefined || alternateValue === undefined) {
        return false;
    }
    return !(isBooleanLiteral(consequentValue) && isBooleanLiteral(alternateValue)) &&
        isSimpleExpression(consequentValue, sourceCode) && isSimpleExpression(alternateValue, sourceCode);
}

function selectsAssignedValue(selection: BranchSelection): boolean {
    const { consequent, alternate, sourceCode } = selection;
    const consequentAssignment = branchAssignment(consequent);
    const alternateAssignment = branchAssignment(alternate);
    if (consequentAssignment === undefined || alternateAssignment === undefined) {
        return false;
    }
    return sourceCode.getText(consequentAssignment.left) === sourceCode.getText(alternateAssignment.left) &&
        isSimpleExpression(consequentAssignment.right, sourceCode) &&
        isSimpleExpression(alternateAssignment.right, sourceCode);
}

function previousStatement(statement: TSESTree.IfStatement): TSESTree.Statement | undefined {
    const { parent } = statement;
    if (parent.type !== AST_NODE_TYPES.BlockStatement && parent.type !== AST_NODE_TYPES.Program) {
        return undefined;
    }
    return parent.body[parent.body.indexOf(statement) - 1];
}

type InitializedDeclaration = {
    readonly variableName: string;
    readonly initializer: TSESTree.Expression;
    readonly declaration: TSESTree.VariableDeclarator;
};

function namedInitializer(
    declaration: Readonly<TSESTree.VariableDeclarator> | undefined
): InitializedDeclaration | undefined {
    if (declaration?.id.type !== AST_NODE_TYPES.Identifier || declaration.init === null) {
        return undefined;
    }
    return { variableName: declaration.id.name, initializer: declaration.init, declaration };
}

function initializedDeclaration(statement: TSESTree.IfStatement): InitializedDeclaration | undefined {
    const previous = previousStatement(statement);
    if (
        previous?.type !== AST_NODE_TYPES.VariableDeclaration || previous.kind !== 'let' ||
        previous.declarations.length !== 1
    ) {
        return undefined;
    }
    return namedInitializer(previous.declarations[0]);
}

type InitializedSelection = {
    readonly initialized: InitializedDeclaration;
    readonly assignment: TSESTree.AssignmentExpression;
    readonly statement: TSESTree.IfStatement;
    readonly sourceCode: TSESLint.SourceCode;
};

function hasSelectionSideEffects(selection: InitializedSelection): boolean {
    const { initialized, statement, sourceCode } = selection;
    const sideEffectOptions = { considerGetters: true, considerImplicitTypeConversion: true };
    return ASTUtils.hasSideEffect(initialized.initializer, sourceCode, sideEffectOptions) ||
        ASTUtils.hasSideEffect(statement.test, sourceCode, sideEffectOptions);
}

function readsSelectedVariable(selection: InitializedSelection): boolean {
    const { initialized, statement, sourceCode } = selection;
    const variable = ASTUtils.findVariable(sourceCode.getScope(statement), initialized.variableName);
    if (variable === null) {
        return true;
    }
    return variable.references.some(function readsBeforeAssignment(reference) {
        const referenceStart = reference.identifier.range[0];
        return reference.isRead() && referenceStart >= statement.range[0] && referenceStart < statement.range[1];
    });
}

function isSimpleInitializedSelection(selection: InitializedSelection): boolean {
    const { initialized, assignment, statement, sourceCode } = selection;
    return sourceCode.getCommentsInside(initialized.declaration.parent).length === 0 &&
        sourceCode.getCommentsBefore(statement).length === 0 &&
        isSimpleExpression(initialized.initializer, sourceCode) && isSimpleExpression(assignment.right, sourceCode);
}

function selectsInitializedValue(statement: TSESTree.IfStatement, sourceCode: TSESLint.SourceCode): boolean {
    const initialized = initializedDeclaration(statement);
    const assignment = branchAssignment(singleBranchStatement(statement.consequent));
    if (
        initialized === undefined || assignment === undefined ||
        initialized.variableName !== sourceCode.getText(assignment.left)
    ) {
        return false;
    }
    const selection = { initialized, assignment, statement, sourceCode };
    return isSimpleInitializedSelection(selection) && !hasSelectionSideEffects(selection) &&
        !readsSelectedVariable(selection);
}

function selectsConditionalValue(statement: TSESTree.IfStatement, sourceCode: TSESLint.SourceCode): boolean {
    if (statement.alternate === null) {
        return selectsInitializedValue(statement, sourceCode);
    }
    const selection = {
        consequent: singleBranchStatement(statement.consequent),
        alternate: singleBranchStatement(statement.alternate),
        sourceCode
    };
    return selectsReturnValue(selection) || selectsAssignedValue(selection);
}

export const preferTernaryForValueSelectionRule = buildRule({
    name: 'prefer-ternary-for-value-selection',
    meta: {
        type: 'suggestion',
        docs: { description: 'Prefer ternaries for simple value selection while preserving guard returns.' },
        messages: { preferTernary: 'Use a ternary expression to select this value.' },
        schema: []
    },
    defaultOptions: [],
    create(context) {
        const { sourceCode } = context;
        return {
            IfStatement(statement: TSESTree.IfStatement) {
                if (
                    statement.parent.type === AST_NODE_TYPES.IfStatement && statement.parent.alternate === statement ||
                    sourceCode.getCommentsInside(statement).length > 0 ||
                    !isSimpleExpression(statement.test, sourceCode)
                ) {
                    return;
                }
                if (selectsConditionalValue(statement, sourceCode)) {
                    context.report({ node: statement, messageId: 'preferTernary' });
                }
            }
        };
    }
});
