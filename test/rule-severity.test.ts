import assert from 'node:assert';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { suite, test } from 'mocha';
import ts from 'typescript';

suite('disabled rule reasons', function () {
    test('requires an explicit nonempty reason and rejects runtime arguments', function () {
        const filename = path.join(process.cwd(), 'test/rule-severity-typecheck.ts');
        const source = [
            "import { disable } from '../configs/rule-severity.ts';",
            "export const valid = disable<'Covered by another rule'>();",
            'export const missing = disable();',
            "export const empty = disable<''>();",
            'export const broad = disable<string>();',
            "export const runtime = disable<'Covered by another rule'>('reason');"
        ]
            .join('\n');
        const options = {
            target: ts.ScriptTarget.ES2023,
            module: ts.ModuleKind.NodeNext,
            moduleResolution: ts.ModuleResolutionKind.NodeNext,
            strict: true,
            noEmit: true,
            allowImportingTsExtensions: true,
            skipLibCheck: true,
            types: []
        };
        const host = ts.createCompilerHost(options);
        const program = ts.createProgram([ filename ], options, {
            ...host,
            getSourceFile(name, languageVersion) {
                if (name === filename) {
                    return ts.createSourceFile(name, source, languageVersion);
                }
                return host.getSourceFile(name, languageVersion);
            }
        });
        const diagnostics = ts.getPreEmitDiagnostics(program).map(function toDiagnosticLocation(diagnostic) {
            return {
                file: diagnostic.file?.fileName,
                line: diagnostic.file?.getLineAndCharacterOfPosition(diagnostic.start ?? 0).line,
                code: diagnostic.code
            };
        });
        assert.deepStrictEqual(diagnostics, [
            { file: filename, line: 2, code: 2554 },
            { file: filename, line: 3, code: 2554 },
            { file: filename, line: 4, code: 2554 },
            { file: filename, line: 5, code: 2554 }
        ]);
    });

    test('erases explanations and emits a function without runtime parameters', async function () {
        const filename = path.join(process.cwd(), 'configs/rule-severity.ts');
        const source = await readFile(filename, 'utf8');
        const emitted = ts
            .transpileModule(source, {
                compilerOptions: { target: ts.ScriptTarget.ES2023, module: ts.ModuleKind.ESNext }
            })
            .outputText;
        assert.strictEqual(emitted, "export function disable() {\n    return 'off';\n}\n");

        const explanation = 'This explanation must disappear from emitted JavaScript';
        const call = `export const severity = disable<'${explanation}'>();`;
        const emittedCall = ts
            .transpileModule(call, {
                compilerOptions: { target: ts.ScriptTarget.ES2023, module: ts.ModuleKind.ESNext }
            })
            .outputText;
        assert.strictEqual(emittedCall, 'export const severity = disable();\n');
    });
});
