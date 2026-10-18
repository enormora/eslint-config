import assert from 'node:assert';
import { type ESLint, Linter } from 'eslint';
import zodCorePlugin from 'eslint-plugin-zod-core';
import zodMiniPlugin from 'eslint-plugin-zod-mini';
import { suite, test } from 'mocha';
import { enormoraZodPlugin } from '../configs/plugins/enormora-zod/enormora-zod-plugin.ts';
import { zodConfig } from '../configs/presets/zod/zod.ts';
import {
    checkAllPluginRulesConfigured,
    assertConfigToHaveNoValidationIssues,
    checkUnknownPluginRulesAreNotConfigured
} from './rules-configuration.ts';

const regularZodImportRuleId = 'restricted-imports/no-regular-zod-import';
const enumSchemaRuleId = 'restricted-syntax-zod/no-enum-schema';
const nativeEnumSchemaRuleId = 'restricted-syntax-zod/no-native-enum-schema';
const lengthCheckedArrayRuleId = 'zod-mini/prefer-tuple-over-array-length';
const preferValidateMiniRuleId = 'zod-mini/prefer-validate';
const preferValidateCoreRuleId = 'zod-core/prefer-validate';
const zodMiniPluginRules = (zodMiniPlugin as ESLint.Plugin).rules;
const zodCorePluginRules = (zodCorePlugin as ESLint.Plugin).rules;

function lintModuleSource(source: string): Linter.LintMessage[] {
    const linter = new Linter({ configType: 'flat' });
    const config = [
        {
            ...zodConfig,
            files: [ '**/*.js' ],
            languageOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module'
            }
        }
    ] as unknown as Linter.Config[];

    return linter.verify(source, config, 'schema.js');
}

function collectRuleMessages(source: string, ruleId: string): Linter.LintMessage[] {
    return lintModuleSource(source).filter(function belongsToRule(message) {
        return message.ruleId === ruleId;
    });
}

suite('zod preset', function () {
    suite('rule configuration', function () {
        test('all eslint-plugin-zod-mini rules are configured', function () {
            checkAllPluginRulesConfigured({
                ruleConfigSet: zodConfig.rules,
                pluginRules: zodMiniPluginRules,
                pluginName: 'eslint-plugin-zod-mini'
            });
        });

        test('no unknown eslint-plugin-zod-mini rules are configured', function () {
            checkUnknownPluginRulesAreNotConfigured({
                ruleConfigSet: zodConfig.rules,
                pluginRules: zodMiniPluginRules,
                pluginName: 'eslint-plugin-zod-mini'
            });
        });

        test('all eslint-plugin-zod-core rules are configured', function () {
            checkAllPluginRulesConfigured({
                ruleConfigSet: zodConfig.rules,
                pluginRules: zodCorePluginRules,
                pluginName: 'eslint-plugin-zod-core'
            });
        });

        test('no unknown eslint-plugin-zod-core rules are configured', function () {
            checkUnknownPluginRulesAreNotConfigured({
                ruleConfigSet: zodConfig.rules,
                pluginRules: zodCorePluginRules,
                pluginName: 'eslint-plugin-zod-core'
            });
        });

        test('all enormora-zod rules are configured', function () {
            checkAllPluginRulesConfigured({
                ruleConfigSet: zodConfig.rules,
                pluginRules: enormoraZodPlugin.rules,
                pluginName: 'enormora-zod'
            });
        });

        test('no unknown enormora-zod rules are configured', function () {
            checkUnknownPluginRulesAreNotConfigured({
                ruleConfigSet: zodConfig.rules,
                pluginRules: enormoraZodPlugin.rules,
                pluginName: 'enormora-zod'
            });
        });

        test('zod preset config has no validation errors', function () {
            assert.deepStrictEqual(
                assertConfigToHaveNoValidationIssues(zodConfig),
                [],
                'Zod preset config must have no validation errors'
            );
        });
    });

    suite('import and schema restrictions', function () {
        test('reports imports from the regular zod entry points', function () {
            const messages = collectRuleMessages("import { z } from 'zod';", regularZodImportRuleId);

            assert.strictEqual(messages.length, 1, 'Importing from zod must be reported');
            assert.match(
                messages[0]?.message ?? '',
                /Use zod\/mini or zod\/v4\/core instead\./u
            );
        });

        test('allows imports from zod/mini', function () {
            const messages = collectRuleMessages("import { z } from 'zod/mini';", regularZodImportRuleId);

            assert.deepStrictEqual(messages, [], 'Importing from zod/mini must not be reported');
        });

        test('allows imports from zod/core', function () {
            const messages = collectRuleMessages("import { $ZodType } from 'zod/v4/core';", regularZodImportRuleId);

            assert.deepStrictEqual(messages, [], 'Importing from zod/core must not be reported');
        });

        test('reports z.enum() schemas', function () {
            const source = "import { z } from 'zod/mini';\nconst colorSchema = z.enum(['a', 'b']);";
            const messages = collectRuleMessages(source, enumSchemaRuleId);

            assert.strictEqual(messages.length, 1, 'z.enum() must be reported');
            assert.match(
                messages[0]?.message ?? '',
                /Use a union of z\.literal\(\) schemas instead of z\.enum\(\)\./u
            );
        });

        test('reports z.nativeEnum() schemas', function () {
            const source = "import { z } from 'zod/mini';\nconst colorSchema = z.nativeEnum(Color);";
            const messages = collectRuleMessages(source, nativeEnumSchemaRuleId);

            assert.strictEqual(messages.length, 1, 'z.nativeEnum() must be reported');
            assert.match(
                messages[0]?.message ?? '',
                /Use a union of z\.literal\(\) schemas instead of z\.nativeEnum\(\)\./u
            );
        });

        test('allows a union of z.literal() schemas', function () {
            const source =
                "import { z } from 'zod/mini';\nconst colorSchema = z.union([z.literal('a'), z.literal('b')]);";
            const enumMessages = collectRuleMessages(source, enumSchemaRuleId);
            const nativeEnumMessages = collectRuleMessages(source, nativeEnumSchemaRuleId);

            assert.deepStrictEqual(
                [ ...enumMessages, ...nativeEnumMessages ],
                [],
                'A union of z.literal() schemas must not be reported'
            );
        });

        test('reports z.array() schemas with a length check', function () {
            const source = "import { z } from 'zod/mini';\nconst pairSchema = z.array(z.string()).check(z.length(2));";
            const messages = collectRuleMessages(source, lengthCheckedArrayRuleId);

            assert.strictEqual(messages.length, 1, 'A length-checked z.array() must be reported');
            assert.match(
                messages[0]?.message ?? '',
                /Prefer `z\.tuple\(\)` over a length-constrained `z\.array\(\)`/u
            );
        });

        test('allows a plain z.array() without a length check', function () {
            const source = "import { z } from 'zod/mini';\nconst listSchema = z.array(z.string());";
            const messages = collectRuleMessages(source, lengthCheckedArrayRuleId);

            assert.deepStrictEqual(messages, [], 'A plain z.array() must not be reported');
        });

        test('does not report string length checks', function () {
            const source = "import { z } from 'zod/mini';\nconst nameSchema = z.string().check(z.minLength(3));";
            const messages = collectRuleMessages(source, lengthCheckedArrayRuleId);

            assert.deepStrictEqual(messages, [], 'A string length check must not be reported');
        });
    });

    suite('core import syntax', function () {
        test('allows namespace imports from zod/v4/core', function () {
            const messages = collectRuleMessages(
                "import * as core from 'zod/v4/core';",
                'zod-core/consistent-import'
            );

            assert.deepStrictEqual(messages, [], 'Zod core namespace imports must not be reported');
        });

        test('rewrites named Zod core imports and their references to namespace imports', function () {
            const source = "import { safeParse } from 'zod/v4/core';\n" +
                'export const result = safeParse(nameSchema, input);';
            const messages = collectRuleMessages(source, 'zod-core/consistent-import');
            const linter = new Linter({ configType: 'flat' });
            const result = linter.verifyAndFix(source, [ zodConfig ] as unknown as Linter.Config[], 'schema.js');

            assert.deepStrictEqual(
                messages.map(function getMessageId(message) {
                    return message.messageId;
                }),
                [ 'changeImportSyntax', 'convertUsage' ],
                'The named Zod core import and its reference must both be reported'
            );
            assert.strictEqual(result.fixed, true, 'Named Zod core imports must be fixed');
            assert.strictEqual(
                result.output,
                "import * as z from 'zod/v4/core';\nexport const result = z.safeParse(nameSchema, input);",
                'The namespace import and its references must use the same binding'
            );
            assert.deepStrictEqual(result.messages, [], 'The fixed Zod core import must have no reports');
        });
    });

    suite('boolean validation', function () {
        test('reports a safeParse() result that is only read for success', function () {
            const source = "import { z } from 'zod/mini';\nconst nameSchema = z.string();\n" +
                'export const isValid = nameSchema.safeParse(input).success;';
            const messages = collectRuleMessages(source, preferValidateMiniRuleId);

            assert.strictEqual(messages.length, 1, 'Reading only success from safeParse() must be reported');
        });

        test('allows z.validate()', function () {
            const source = "import { z } from 'zod/mini';\nconst nameSchema = z.string();\n" +
                'export const isValid = z.validate(nameSchema, input);';
            const messages = collectRuleMessages(source, preferValidateMiniRuleId);

            assert.deepStrictEqual(messages, [], 'z.validate() must not be reported');
        });

        test('allows a safeParse() result whose data is used', function () {
            const source = "import { z } from 'zod/mini';\nconst nameSchema = z.string();\n" +
                'const result = nameSchema.safeParse(input);\nexport const name = result.success ? result.data : null;';
            const messages = collectRuleMessages(source, preferValidateMiniRuleId);

            assert.deepStrictEqual(messages, [], 'Using the parsed data must not be reported');
        });

        test('reports a core safeParse() result that is only read for success', function () {
            const source = "import * as core from 'zod/v4/core';\n" +
                'export const isValid = core.safeParse(nameSchema, input).success;';
            const messages = collectRuleMessages(source, preferValidateCoreRuleId);

            assert.strictEqual(messages.length, 1, 'Reading only success from core.safeParse() must be reported');
        });
    });
});
