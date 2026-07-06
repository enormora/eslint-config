import assert from 'node:assert';
import eslintCorePresets from '@eslint/js';
import { Linter } from 'eslint';
import ts from 'typescript';
import type { Except } from 'type-fest';
import { testRuleSet } from '../configs/presets/test-base/test-base.ts';

type RuleConfigSet = Readonly<Record<string, unknown>> | undefined;
type PluginRules = Readonly<Record<string, unknown>> | undefined;

type RuleTestCase = {
    readonly ruleConfigSet: RuleConfigSet;
    readonly pluginRules: PluginRules;
    readonly pluginName: string;
    readonly rulesToExclude?: readonly string[];
};

type ConfigBlock = {
    readonly rules: RuleConfigSet;
    readonly languageOptions: Readonly<Record<string, unknown>>;
    readonly parserOptions: Readonly<Record<string, unknown>>;
};
type ConfigRulesBlock = Pick<ConfigBlock, 'rules'>;

type RuleWithMeta = { readonly meta?: { readonly deprecated?: unknown; }; };

type LanguageOptionsTestCase = {
    readonly configLanguageOptions: unknown;
    readonly languageOptions?: unknown;
};

type AdditionalRulesTestCase = {
    readonly ruleConfigSet: RuleConfigSet;
    readonly additionalRules: RuleConfigSet;
};

const scopedPluginShortNamePattern = /^@[^/]+\/(?:eslint-plugin-)?(?<shortName>.+)$/u;
const eslintPluginPrefix = 'eslint-plugin-';
const scopedEslintPluginSuffix = '/eslint-plugin';

function extractScopedShortName(pluginName: string): string {
    return scopedPluginShortNamePattern.exec(pluginName)?.groups?.shortName ?? pluginName;
}

function extractShortName(pluginName: string): string {
    if (pluginName.startsWith(eslintPluginPrefix)) {
        return pluginName.slice(eslintPluginPrefix.length);
    }
    if (pluginName.startsWith('@') && pluginName.endsWith(scopedEslintPluginSuffix)) {
        return pluginName.slice(0, pluginName.length - scopedEslintPluginSuffix.length);
    }
    return extractScopedShortName(pluginName);
}

function isRuleDeprecated(rule: unknown): boolean {
    const ruleWithMeta = rule as RuleWithMeta | undefined;
    return Boolean(ruleWithMeta?.meta?.deprecated);
}

function isRuleConfigured(ruleConfigSet: RuleConfigSet, ruleName: string): boolean {
    const configuredRuleNames = Object.keys(ruleConfigSet ?? {});
    return configuredRuleNames.includes(ruleName);
}

export function checkAllCoreRulesConfigured(testCase: Pick<RuleTestCase, 'ruleConfigSet'>): void {
    const { ruleConfigSet } = testCase;
    const allRules = eslintCorePresets.configs.all.rules;
    const ruleNames = Object.keys(allRules);

    assert.notStrictEqual(ruleNames.length, 0, 'ESLint core rules not found');

    ruleNames.forEach(function assertCoreRuleConfigured(ruleName) {
        assert.strictEqual(
            isRuleConfigured(ruleConfigSet, ruleName),
            true,
            `ESLint core rule "${ruleName}" not configured`
        );
    });
}

export function checkUnknownCoreRulesAreNotConfigured(testCase: Pick<RuleTestCase, 'ruleConfigSet'>): void {
    const { ruleConfigSet } = testCase;
    const allRules = eslintCorePresets.configs.all.rules;
    const allCoreRuleNames = Object.keys(allRules);
    const configuredRuleNames = Object.keys(ruleConfigSet ?? {});
    const configuredCoreRuleNames = configuredRuleNames.filter(function isCoreRuleName(ruleName) {
        return !ruleName.includes('/');
    });

    configuredCoreRuleNames.forEach(function assertCoreRuleExists(ruleName) {
        assert.strictEqual(
            allCoreRuleNames.includes(ruleName),
            true,
            `ESLint core rule "${ruleName}" configured, but doesn’t not exist`
        );
    });
}

export function checkAllPluginRulesConfigured(testCase: RuleTestCase): void {
    const { ruleConfigSet, pluginRules: maybePluginRules, pluginName, rulesToExclude = [] } = testCase;
    const pluginRules = maybePluginRules ?? {};
    const ruleNames = Object.keys(pluginRules);
    const shortPluginName = extractShortName(pluginName);

    assert.notStrictEqual(ruleNames.length, 0, 'Plugin rules are empty');

    ruleNames
        .filter(function isNotExcluded(ruleName) {
            return !rulesToExclude.includes(ruleName);
        })
        .forEach(function assertPluginRuleConfigured(ruleName) {
            const rule = pluginRules[ruleName];
            const shortPluginRuleName = `${shortPluginName}/${ruleName}`;
            const isConfigured = isRuleConfigured(ruleConfigSet, shortPluginRuleName);

            const shouldRuleBeConfigured = !isRuleDeprecated(rule);
            assert.strictEqual(
                isConfigured,
                shouldRuleBeConfigured,
                `Rule ${shortPluginRuleName} ${shouldRuleBeConfigured ? 'not configured' : 'is deprecated'}`
            );
        });
}

export function checkUnknownPluginRulesAreNotConfigured(
    testCase: Except<RuleTestCase, 'rulesToExclude'>
): void {
    const { ruleConfigSet, pluginRules: maybePluginRules, pluginName } = testCase;
    const pluginRules = maybePluginRules ?? {};
    const shortPluginName = extractShortName(pluginName);
    const pluginRuleNames = Object
        .keys(pluginRules)
        .filter(function isNotDeprecated(ruleName) {
            return !isRuleDeprecated(pluginRules[ruleName]);
        })
        .map(function prefixWithPluginName(ruleName) {
            return `${shortPluginName}/${ruleName}`;
        });

    assert.notStrictEqual(pluginRuleNames.length, 0, 'Plugin rules are empty');

    const configuredRuleNames = Object.keys(ruleConfigSet ?? {});
    const configuredPluginRuleNames = configuredRuleNames.filter(function belongsToPlugin(ruleName) {
        return ruleName.startsWith(`${shortPluginName}/`);
    });

    configuredPluginRuleNames.forEach(function assertPluginRuleStillExists(ruleName) {
        assert.strictEqual(pluginRuleNames.includes(ruleName), true, `Rule ${ruleName} can be removed`);
    });
}

export function mergeConfigRules(config: unknown): RuleConfigSet {
    const blocks = Array.isArray(config) ? config : [ config ];
    return blocks.reduce<RuleConfigSet>(function collectBlockRules(merged: RuleConfigSet, block: unknown) {
        const blockRules = (block as Partial<ConfigRulesBlock> | undefined)?.rules ?? {};
        return { ...merged, ...blockRules };
    }, {});
}

export function findMissingConfiguredRuleNames(
    expectedRules: RuleConfigSet,
    configuredRules: RuleConfigSet
): string[] {
    return Object.keys(expectedRules ?? {}).filter(function isMissingRuleName(ruleName) {
        return !Object.hasOwn(configuredRules ?? {}, ruleName);
    });
}

export function assertConfigToHaveNoValidationIssues(config: unknown): Linter.LintMessage[] {
    const linter = new Linter({ configType: 'flat' });

    const sourceFile = ts.createSourceFile('/foo.js', 'foo();', ts.ScriptTarget.Latest);
    const defaultCompilerHost = ts.createCompilerHost({});
    const customCompilerHost = {
        ...defaultCompilerHost,
        getSourceFile(name: string, languageVersion: ts.ScriptTarget): ts.SourceFile | undefined {
            if (name === '/foo.js') {
                return sourceFile;
            }
            return defaultCompilerHost.getSourceFile(name, languageVersion);
        }
    };
    const program = ts.createProgram([ '/foo.js' ], {}, customCompilerHost);

    function injectProgram(block: unknown): Partial<ConfigBlock> {
        const typed = (block ?? {}) as Partial<ConfigBlock>;
        const languageOptions = typed.languageOptions ?? {};
        const parserOptions = typed.parserOptions ?? {};
        return {
            ...typed,
            languageOptions: {
                ...languageOptions,
                parserOptions: {
                    ...parserOptions,
                    program
                }
            }
        };
    }

    const verifiableConfig = Array.isArray(config) ? config.map(injectProgram) : injectProgram(config);

    return linter
        .verify('foo();', verifiableConfig as unknown as Linter.Config[], '/foo.js')
        .filter(function isValidationError(message) {
            return message.severity === 2;
        });
}

export function checkConfigLanguageOptions(testCase: LanguageOptionsTestCase): void {
    const { configLanguageOptions, languageOptions } = testCase;

    assert.deepStrictEqual(configLanguageOptions, languageOptions, 'Config language options do not match');
}

export function checkAllTestRulesConfigured(testCase: Pick<RuleTestCase, 'ruleConfigSet'>): void {
    const { ruleConfigSet } = testCase;

    const testRuleNames = Object.keys(testRuleSet.rules);
    const rulesFromConfigKeys = Object.keys(ruleConfigSet ?? {});

    assert.notStrictEqual(rulesFromConfigKeys.length, 0, 'Plugin rules are empty');

    const remainingRulesKeys = rulesFromConfigKeys.filter(function isTestRuleName(ruleName) {
        return testRuleNames.includes(ruleName);
    });

    const actual = remainingRulesKeys;
    const expected = testRuleNames;

    assert.deepStrictEqual(actual, expected, 'Common test rules could not be found');
}

export function checkAdditionalRulesConfigured(testCase: AdditionalRulesTestCase): void {
    const { ruleConfigSet, additionalRules } = testCase;

    const safeAdditionalRules = additionalRules ?? {};
    const additionalRulesNames = Object.keys(safeAdditionalRules);
    const additionalRulesFromRuleConfigSet = Object.entries(ruleConfigSet ?? {}).filter(
        function isAdditionalRule([ ruleName ]) {
            return additionalRulesNames.includes(ruleName);
        }
    );

    assert.notStrictEqual(additionalRulesFromRuleConfigSet.length, 0, 'Additional plugin rules are not defined');

    additionalRulesFromRuleConfigSet.forEach(function assertAdditionalRuleSetting([ ruleName, ruleSetting ]) {
        const expectedRuleSetting = safeAdditionalRules[ruleName];

        assert.deepStrictEqual(
            expectedRuleSetting,
            ruleSetting,
            `Rule ${ruleName} is not set to ${JSON.stringify(expectedRuleSetting)}`
        );
    });
}
