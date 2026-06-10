import { TextSourceCodeBase, VisitNodeStep } from '@eslint/plugin-kit';

type SourcePosition = { readonly line: number; readonly column: number; };
type SourceLocation = { readonly start: SourcePosition; readonly end: SourcePosition; };
type ProgramNode = {
    readonly type: 'Program';
    readonly body: readonly never[];
    readonly comments: readonly never[];
    readonly tokens: readonly never[];
    readonly range: readonly [number, number];
    readonly loc: SourceLocation;
};

type LanguageFile = { readonly body: string; };
type ParseResult = { readonly ast: ProgramNode; };
type SuccessfulParseResult = { readonly ok: true; readonly ast: ProgramNode; };

const lineEndingPattern = /\r\n|\n|\r/u;

function buildProgramNode(text: string): ProgramNode {
    const lines = text.split(lineEndingPattern);
    const lastLine = lines.at(-1) ?? '';
    return {
        type: 'Program',
        body: [],
        comments: [],
        tokens: [],
        range: [ 0, text.length ],
        loc: {
            start: { line: 1, column: 0 },
            end: { line: lines.length, column: lastLine.length }
        }
    };
}

function* traverseProgram(ast: ProgramNode): IterableIterator<VisitNodeStep> {
    yield new VisitNodeStep({ target: ast, phase: 1, args: [ ast ] });
    yield new VisitNodeStep({ target: ast, phase: 2, args: [ ast ] });
}

function createPlainTextSourceCode(file: LanguageFile, parseResult: ParseResult): TextSourceCodeBase {
    const sourceCode = new TextSourceCodeBase({ text: file.body, ast: parseResult.ast });
    Object.assign(sourceCode, {
        getLoc(node: ProgramNode): SourceLocation {
            return node.loc;
        },
        getRange(node: ProgramNode): readonly [number, number] {
            return node.range;
        },
        traverse(): IterableIterator<VisitNodeStep> {
            return traverseProgram(parseResult.ast);
        }
    });
    return sourceCode;
}

function noopValidateLanguageOptions(): void {
    return undefined;
}

function parsePlainText(file: LanguageFile): SuccessfulParseResult {
    return { ok: true, ast: buildProgramNode(file.body) };
}

const plainTextLanguage = {
    fileType: 'text',
    lineStart: 1,
    columnStart: 0,
    nodeTypeKey: 'type',
    visitorKeys: { Program: [] },
    defaultLanguageOptions: {},
    validateLanguageOptions: noopValidateLanguageOptions,
    parse: parsePlainText,
    createSourceCode: createPlainTextSourceCode
};

export const plainTextLanguagePlugin = {
    meta: { name: '@enormora/eslint-config-plain-text-language', version: '1.0.0' },
    languages: { any: plainTextLanguage }
};
