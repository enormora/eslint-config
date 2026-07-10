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
const lengthCheckedArrayRuleId = 'restricted-syntax-zod/no-length-checked-array-schema';
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
                /Use z\.tuple\(\) instead of a z\.array\(\) with a length check\./u
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
});
