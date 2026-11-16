import assert from 'node:assert';
import path from 'node:path';
import { Linter } from 'eslint';
import { suite, test } from 'mocha';
import { baseConfig } from '../../configs/presets/base/base.ts';
import { uniqueSortedRuleIds } from './lint-fixture.ts';

const ruleId = 'unicorn/consistent-conditional-object-spread';
const filePath = path.join(process.cwd(), 'test/fixtures/base-node/conditional-object-spread.js');

function conditionalObjectSpreadReports(code: string): boolean {
    const linter = new Linter({ configType: 'flat' });
    const messages = linter.verify(code, baseConfig, filePath);
    return messages.some(function isConditionalObjectSpread(message) {
        return message.ruleId === ruleId;
    });
}

function bestPracticesReports(sourceCode: string, ruleNames: string | readonly string[]): Linter.LintMessage[] {
    const requestedRules = typeof ruleNames === 'string' ? [ ruleNames ] : ruleNames;
    const linter = new Linter({ configType: 'flat' });
    const messages = linter.verify(sourceCode, baseConfig, filePath);
    const fatalMessages = messages.filter(function isFatalMessage(message) {
        return message.fatal === true;
    });

    assert.deepStrictEqual(fatalMessages, [], 'Source must parse successfully');

    return messages.filter(function isRequestedRule(message) {
        return requestedRules.includes(message.ruleId ?? '');
    });
}

suite('base best practices', function () {
    suite('function placement', function () {
        suite('nested calls', function () {
            test('reports function and constructor calls nested four levels deep', function () {
                const actualReports = bestPracticesReports(
                    'export const saved = save(format(normalize(load()))); export const container = new Outer(new Middle(new Inner(create())));',
                    'unicorn/max-nested-calls'
                );
                assert.strictEqual(actualReports.length, 2);
                assert.strictEqual(actualReports[0]?.severity, 2);
            });

            test('accepts function and constructor calls nested three levels deep', function () {
                const actualReports = bestPracticesReports(
                    'export const saved = save(format(load())); export const container = new Outer(new Inner(create()));',
                    'unicorn/max-nested-calls'
                );
                assert.deepStrictEqual(actualReports, []);
            });
        });

        suite('guard clauses', function () {
            test('reports independent declarations that run before an early exit', function () {
                const actualReports = bestPracticesReports(
                    "export function describe(enabled) { const labels = ['ready']; if (!enabled) { return null; } return labels.join(','); }",
                    'unicorn/no-declarations-before-early-exit'
                );
                assert.strictEqual(actualReports.length, 1);
                assert.strictEqual(actualReports[0]?.severity, 2);
            });

            test('accepts independent declarations after the guard', function () {
                const actualReports = bestPracticesReports(
                    "export function describe(enabled) { if (!enabled) { return null; } const labels = ['ready']; return labels.join(','); }",
                    'unicorn/no-declarations-before-early-exit'
                );
                assert.deepStrictEqual(actualReports, []);
            });
        });

        suite('module initialization', function () {
            test('reports async initialization wrappers called at module scope', function () {
                const actualReports = bestPracticesReports(
                    'async function initialize() { await load(); } initialize();',
                    'unicorn/prefer-top-level-await'
                );
                assert.strictEqual(actualReports.length, 1);
                assert.strictEqual(actualReports[0]?.severity, 2);
            });

            test('accepts top-level await for module initialization', function () {
                const actualReports = bestPracticesReports('await load();', 'unicorn/prefer-top-level-await');
                assert.deepStrictEqual(actualReports, []);
            });
        });

        suite('function scoping', function () {
            test('reports nested functions that do not use the enclosing scope', function () {
                const actualReports = bestPracticesReports(
                    'export function createFormatter() { function format(value) { return String(value); } return format; }',
                    'unicorn/consistent-function-scoping'
                );
                assert.strictEqual(actualReports.length, 1);
                assert.strictEqual(actualReports[0]?.severity, 2);
            });

            test('accepts nested functions that capture an enclosing value', function () {
                const actualReports = bestPracticesReports(
                    'export function createFormatter(prefix) { function format(value) { return prefix + value; } return format; }',
                    'unicorn/consistent-function-scoping'
                );
                assert.deepStrictEqual(actualReports, []);
            });
        });
    });

    suite('value expressions', function () {
        suite('module imports and exports', function () {
            test('reports namespace imports', function () {
                const reports = bestPracticesReports(
                    "import * as paths from 'node:path'; export const result = paths.join('one', 'two');",
                    'sonarjs/no-wildcard-import'
                );
                assert.strictEqual(reports.length, 1);
                assert.strictEqual(reports[0]?.severity, 2);
            });

            test('reports wildcard and namespace re-exports', function () {
                const reports = bestPracticesReports(
                    "export * from 'node:path'; export * as files from 'node:fs';",
                    'sonarjs/no-wildcard-import'
                );
                assert.strictEqual(reports.length, 2);
            });

            test('accepts named imports and exports', function () {
                const reports = bestPracticesReports(
                    "import { join } from 'node:path'; export const result = join('one', 'two');",
                    'sonarjs/no-wildcard-import'
                );
                assert.deepStrictEqual(reports, []);
            });
        });

        suite('Unicode regular expressions', function () {
            test('reports missing Unicode mode once for literals and constructors', function () {
                const actualReports = bestPracticesReports(
                    "export const literal = /ready/; export const constructed = new RegExp('ready');",
                    [ 'require-unicode-regexp', 'regexp/require-unicode-regexp', 'sonarjs/unicode-aware-regex' ]
                );
                assert.strictEqual(actualReports.length, 2);
                assert.deepStrictEqual(uniqueSortedRuleIds(actualReports), [ 'require-unicode-regexp' ]);
                assert.strictEqual(actualReports[0]?.severity, 2);
            });

            test('accepts Unicode mode for literals and constructors', function () {
                const actualReports = bestPracticesReports(
                    "export const literal = /ready/u; export const constructed = new RegExp('ready', 'u');",
                    'require-unicode-regexp'
                );
                assert.deepStrictEqual(actualReports, []);
            });

            test('accepts Unicode sets mode for literals and constructors', function () {
                const actualReports = bestPracticesReports(
                    "export const literal = /ready/v; export const constructed = new RegExp('ready', 'v');",
                    'require-unicode-regexp'
                );
                assert.deepStrictEqual(actualReports, []);
            });
        });

        suite('prototype method references', function () {
            test('reports temporary literals used to borrow prototype methods', function () {
                const actualReports = bestPracticesReports(
                    'export function copyValues(values) { return [].slice.call(values); }',
                    'unicorn/prefer-prototype-methods'
                );
                assert.strictEqual(actualReports.length, 1);
                assert.strictEqual(actualReports[0]?.severity, 2);
            });

            test('accepts direct prototype method references', function () {
                const actualReports = bestPracticesReports(
                    'export function copyValues(values) { return Array.prototype.slice.call(values); }',
                    'unicorn/prefer-prototype-methods'
                );
                assert.deepStrictEqual(actualReports, []);
            });
        });

        suite('boolean returns', function () {
            test('reports redundant boolean branches once through the SonarJS rule', function () {
                const actualReports = bestPracticesReports(
                    'export function positive(value) { if (value > 0) { return true; } return false; }',
                    [ 'unicorn/prefer-boolean-return', 'sonarjs/prefer-single-boolean-return' ]
                );
                assert.strictEqual(actualReports.length, 1);
                assert.deepStrictEqual(uniqueSortedRuleIds(actualReports), [ 'sonarjs/prefer-single-boolean-return' ]);
            });
        });

        suite('default arguments', function () {
            test('requires explicit separators and precision for built-in methods', function () {
                const sourceCode = 'export const joined = [1, 2].join(); export const rounded = (1.5).toFixed();';
                const defaultReports = bestPracticesReports(sourceCode, [
                    'unicorn/require-array-join-separator',
                    'unicorn/require-number-to-fixed-digits-argument'
                ]);
                assert.strictEqual(defaultReports.length, 2);
                assert.deepStrictEqual(
                    uniqueSortedRuleIds(defaultReports),
                    [ 'unicorn/require-array-join-separator', 'unicorn/require-number-to-fixed-digits-argument' ]
                );
            });

            test('accepts explicit built-in defaults without contradictory reports', function () {
                const sourceCode = "export const joined = [1, 2].join(','); export const rounded = (1.5).toFixed(0);";
                const defaultReports = bestPracticesReports(sourceCode, [
                    'unicorn/require-array-join-separator',
                    'unicorn/require-number-to-fixed-digits-argument',
                    'unicorn/no-unnecessary-default-arguments'
                ]);
                assert.deepStrictEqual(defaultReports, []);
            });

            test('reports arguments matching a local function default', function () {
                const actualReports = bestPracticesReports(
                    'function double(value = 1) { return value * 2; } export const result = double(1);',
                    'unicorn/no-unnecessary-default-arguments'
                );
                assert.strictEqual(actualReports.length, 1);
                assert.strictEqual(actualReports[0]?.severity, 2);
            });

            test('accepts arguments differing from a local function default', function () {
                const actualReports = bestPracticesReports(
                    'function double(value = 1) { return value * 2; } export const result = double(2);',
                    'unicorn/no-unnecessary-default-arguments'
                );
                assert.deepStrictEqual(actualReports, []);
            });
        });

        suite('iterable conversion', function () {
            test('preserves the existing Array.from preference', function () {
                const reports = bestPracticesReports('export const copy = [...values];', [
                    'unicorn/prefer-spread',
                    'array-func/prefer-array-from'
                ]);
                assert.strictEqual(reports.length, 1);
                assert.strictEqual(reports[0]?.ruleId, 'array-func/prefer-array-from');
                assert.strictEqual(reports[0]?.severity, 2);
            });

            test('accepts Array.from without conflicting diagnostics', function () {
                const conversionReports = bestPracticesReports('export const copy = Array.from(values);', [
                    'unicorn/prefer-spread',
                    'array-func/prefer-array-from'
                ]);
                assert.deepStrictEqual(conversionReports, []);
            });
        });

        suite('destructuring', function () {
            test('reports property access when the matching binding is already destructured', function () {
                const actualReports = bestPracticesReports(
                    'export function doubleValue(input) { const { value } = input; return value + input.value; }',
                    'unicorn/consistent-destructuring'
                );
                assert.strictEqual(actualReports.length, 1);
                assert.strictEqual(actualReports[0]?.severity, 2);
            });

            test('accepts consistent use of the destructured binding', function () {
                const actualReports = bestPracticesReports(
                    'export function doubleValue(input) { const { value } = input; return value + value; }',
                    'unicorn/consistent-destructuring'
                );
                assert.deepStrictEqual(actualReports, []);
            });
        });

        suite('string literals', function () {
            test('reports escaped backslashes that can use raw strings', function () {
                const sourceCode = String.raw`export const path = 'C:\\temp\\file';`;
                const actualReports = bestPracticesReports(sourceCode, 'unicorn/prefer-string-raw');
                assert.strictEqual(actualReports.length, 1);
                assert.strictEqual(actualReports[0]?.severity, 2);
            });

            test('accepts ordinary strings without escaped backslashes', function () {
                const actualReports = bestPracticesReports(
                    'export const message = "ready";',
                    'unicorn/prefer-string-raw'
                );
                assert.deepStrictEqual(actualReports, []);
            });
        });
    });

    suite('variable initialization', function () {
        test('preserves the existing prohibition on undefined initializers', function () {
            const sourceCode = 'export let value = undefined;';
            const linter = new Linter({ configType: 'flat' });
            const messages = linter.verify(sourceCode, baseConfig, filePath);
            const initializationReports = messages.filter(function isInitializationReport(message) {
                return [ 'init-declarations', 'no-undef-init', 'unicorn/no-useless-undefined' ]
                    .includes(message.ruleId ?? '');
            });

            assert.strictEqual(initializationReports.length, 1);
            assert.strictEqual(initializationReports[0]?.ruleId, 'no-undef-init');
            assert.strictEqual(initializationReports[0]?.severity, 2);
        });

        test('requires an initializer when a variable is declared', function () {
            const actualReports = bestPracticesReports('export let value;', 'init-declarations');
            assert.strictEqual(actualReports.length, 1);
        });
    });

    suite('local value selection', function () {
        test('accepts explicit return branches without converting them to ternaries', function () {
            const sourceCode =
                "export function describeValue(value) { if (value === undefined) { return 'missing'; } return 'present'; }";
            const actualReports = bestPracticesReports(sourceCode, 'enormora/prefer-ternary-for-value-selection');
            assert.deepStrictEqual(actualReports, []);

            const linter = new Linter({ configType: 'flat' });
            const actualFixedSource = linter.verifyAndFix(sourceCode, baseConfig, filePath).output;
            assert.strictEqual(actualFixedSource.includes('?'), false);
            assert.strictEqual(actualFixedSource.includes('if (value === undefined)'), true);
        });

        test('reports simple value selection under the local rule', function () {
            const actualReports = bestPracticesReports(
                "export function choose(condition) { if (condition) { return 'first'; } else { return 'second'; } }",
                'enormora/prefer-ternary-for-value-selection'
            );
            assert.strictEqual(actualReports.length, 1);
            assert.strictEqual(actualReports[0]?.severity, 2);
        });
    });

    test('reports the logical short-circuit form', function () {
        const logicalForm = 'const props = {};\n' +
            'export const result = { ...(props.onClick !== undefined && { onClick: props.onClick }) };\n';
        assert.strictEqual(
            conditionalObjectSpreadReports(logicalForm),
            true,
            `${ruleId} must reject the logical short-circuit form in favor of the ternary form`
        );
    });

    test('accepts the explicit ternary form', function () {
        const ternaryForm = 'const props = {};\n' +
            'export const result = { ...(props.onClick === undefined ? {} : { onClick: props.onClick }) };\n';
        assert.strictEqual(
            conditionalObjectSpreadReports(ternaryForm),
            false,
            `${ruleId} must accept the explicit ternary form`
        );
    });

    suite('built-in method return values', function () {
        test('reports discarded array method return values under the replacement rule', function () {
            const actualReports = bestPracticesReports('[1, 2].slice(1);', 'unicorn/no-unused-builtin-method-return');
            assert.strictEqual(actualReports.length, 1);
            assert.strictEqual(actualReports[0]?.severity, 2);
        });

        test('reports discarded set method return values under the replacement rule', function () {
            const actualReports = bestPracticesReports(
                'new Set([1, 2]).has(1);',
                'unicorn/no-unused-builtin-method-return'
            );
            assert.strictEqual(actualReports.length, 1);
        });

        test('accepts consumed built-in method return values', function () {
            const actualReports = bestPracticesReports(
                'export const remaining = [1, 2].slice(1);\nexport const contains = new Set([1, 2]).has(1);',
                'unicorn/no-unused-builtin-method-return'
            );
            assert.deepStrictEqual(actualReports, []);
        });
    });

    suite('iterator helpers', function () {
        test('reports asynchronous callbacks passed to synchronous iterator helpers', function () {
            const actualReports = bestPracticesReports(
                '[1, 2].values().forEach(async function consume(value) { await consumeValue(value); });',
                'unicorn/no-async-iterator-callback'
            );
            assert.strictEqual(actualReports.length, 1);
        });

        test('accepts synchronous iterator callbacks', function () {
            const actualReports = bestPracticesReports(
                '[1, 2].values().forEach(function consume(value) { consumeValue(value); });',
                'unicorn/no-async-iterator-callback'
            );
            assert.deepStrictEqual(actualReports, []);
        });

        test('reports discarded lazy iterator helpers', function () {
            const actualReports = bestPracticesReports(
                '[1, 2].values().map(function double(value) { return value * 2; });',
                'unicorn/no-unused-iterator-helper'
            );
            assert.strictEqual(actualReports.length, 1);
        });

        test('accepts consumed lazy iterator helpers', function () {
            const actualReports = bestPracticesReports(
                'export const doubled = [1, 2].values().map(function double(value) { return value * 2; }).toArray();',
                'unicorn/no-unused-iterator-helper'
            );
            assert.deepStrictEqual(actualReports, []);
        });
    });

    suite('JSON serialization', function () {
        test('reports values that JSON serialization cannot represent', function () {
            const actualReports = bestPracticesReports(
                "JSON.stringify({ permissions: new Set(['read']) });",
                'unicorn/no-unsafe-json-serialization'
            );
            assert.strictEqual(actualReports.length, 1);
        });

        test('accepts JSON-representable values', function () {
            const actualReports = bestPracticesReports(
                "export const serialized = JSON.stringify({ permissions: ['read'] });",
                'unicorn/no-unsafe-json-serialization'
            );
            assert.deepStrictEqual(actualReports, []);
        });
    });

    suite('unnecessary parameters', function () {
        test('reports parameters that receive the same argument at every call', function () {
            const actualReports = bestPracticesReports(
                "function log(message, level) { console.log(level, message); }\nlog('start', 'info');\nlog('done', 'info');",
                'unicorn/no-unnecessary-parameters'
            );
            assert.strictEqual(actualReports.length, 1);
        });

        test('accepts parameters that receive different arguments', function () {
            const actualReports = bestPracticesReports(
                "function log(message, level) { console.log(level, message); }\nlog('start', 'info');\nlog('done', 'warn');",
                'unicorn/no-unnecessary-parameters'
            );
            assert.deepStrictEqual(actualReports, []);
        });
    });
});
