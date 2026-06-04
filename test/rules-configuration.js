import assert from 'node:assert';
import eslintCorePresets from '@eslint/js';
import { Linter } from 'eslint';
import ts from 'typescript';
import { testRuleSet } from '../configs/presets/test-base/test-base.js';

const scopedPluginShortNamePattern = /^@[^/]+\/(?:eslint-plugin-)?(?<shortName>.+)$/u;

function extractShortName(pluginName) {
    if (pluginName.startsWith('eslint-plugin-')) {
        return pluginName.slice('eslint-plugin-'.length);
    }
    if (pluginName.startsWith('@') && pluginName.endsWith('/eslint-plugin')) {
        return pluginName.slice(0, pluginName.length - '/eslint-plugin'.length);
    }
    return scopedPluginShortNamePattern.exec(pluginName)?.groups.shortName ?? pluginName;
}

function isRuleDeprecated(rule) {
    return rule.meta?.deprecated ?? false;
}

function isRuleConfigured(ruleConfigSet, ruleName) {
    const configuredRuleNames = Object.keys(ruleConfigSet);
    return configuredRuleNames.includes(ruleName);
}

export function checkAllCoreRulesConfigured(testCase) {
    const { ruleConfigSet } = testCase;
    const ruleNames = Object.keys(eslintCorePresets.configs.all.rules);

    assert.notStrictEqual(ruleNames.length, 0, 'ESLint core rules not found');

    ruleNames.forEach(function assertCoreRuleConfigured(ruleName) {
        assert.strictEqual(
            isRuleConfigured(ruleConfigSet, ruleName),
            true,
            `ESLint core rule "${ruleName}" not configured`
        );
    });
}

export function checkUnknownCoreRulesAreNotConfigured(testCase) {
    const { ruleConfigSet } = testCase;
    const allCoreRuleNames = Object.keys(eslintCorePresets.configs.all.rules);
    const configuredRuleNames = Object.keys(ruleConfigSet);
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

export function checkAllPluginRulesConfigured(testCase) {
    const { ruleConfigSet, pluginRules, pluginName, rulesToExclude = [] } = testCase;
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

export function checkUnknownPluginRulesAreNotConfigured(testCase) {
    const { ruleConfigSet, pluginRules, pluginName } = testCase;
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

    const configuredRuleNames = Object.keys(ruleConfigSet);
    const configuredPluginRuleNames = configuredRuleNames.filter(function belongsToPlugin(ruleName) {
        return ruleName.startsWith(`${shortPluginName}/`);
    });

    configuredPluginRuleNames.forEach(function assertPluginRuleStillExists(ruleName) {
        assert.strictEqual(pluginRuleNames.includes(ruleName), true, `Rule ${ruleName} can be removed`);
    });
}

export function mergeConfigRules(config) {
    if (Array.isArray(config)) {
        return config.reduce(function collectBlockRules(merged, block) {
            return { ...merged, ...block.rules };
        }, {});
    }
    return config.rules ?? {};
}

export function checkConfigToHaveNoValidationIssues(config) {
    const linter = new Linter({ configType: 'flat' });

    const sourceFile = ts.createSourceFile('/foo.js', 'foo();', ts.ScriptTarget.Latest);
    const defaultCompilerHost = ts.createCompilerHost({});
    const customCompilerHost = {
        ...defaultCompilerHost,
        getSourceFile(name, languageVersion) {
            if (name === '/foo.js') {
                return sourceFile;
            }
            return defaultCompilerHost.getSourceFile(name, languageVersion);
        }
    };
    const program = ts.createProgram([ '/foo.js' ], {}, customCompilerHost);

    function injectProgram(block) {
        return {
            ...block,
            languageOptions: {
                ...block.languageOptions,
                parserOptions: {
                    ...block.parserOptions,
                    program
                }
            }
        };
    }

    const verifiableConfig = Array.isArray(config) ? config.map(injectProgram) : injectProgram(config);

    assert.doesNotThrow(function verifyConfig() {
        linter.verify('foo();', verifiableConfig, '/foo.js');
    }, 'Linter.verify() failed for the given config');
}

export function checkConfigLanguageOptions(testCase) {
    const { configLanguageOptions, languageOptions } = testCase;

    assert.deepStrictEqual(configLanguageOptions, languageOptions);
}

export function checkAllTestRulesConfigured(testCase) {
    const { ruleConfigSet } = testCase;

    const testRuleNames = Object.keys(testRuleSet.rules);
    const rulesFromConfigKeys = Object.keys(ruleConfigSet);

    assert.notStrictEqual(rulesFromConfigKeys.length, 0, 'Plugin rules are empty');

    const remainingRulesKeys = rulesFromConfigKeys.filter(function isTestRuleName(ruleName) {
        return testRuleNames.includes(ruleName);
    });

    const actual = remainingRulesKeys;
    const expected = testRuleNames;

    assert.deepStrictEqual(actual, expected, 'Common test rules could not be found');
}

export function checkAdditionalRulesConfigured(testCase) {
    const { ruleConfigSet, additionalRules } = testCase;

    const additionalRulesNames = Object.keys(additionalRules);
    const additionalRulesFromRuleConfigSet = Object.entries(ruleConfigSet).filter(
        function isAdditionalRule([ ruleName ]) {
            return additionalRulesNames.includes(ruleName);
        }
    );

    assert.notStrictEqual(additionalRulesFromRuleConfigSet.length, 0, 'Additional plugin rules are not defined');

    additionalRulesFromRuleConfigSet.forEach(function assertAdditionalRuleSetting([ ruleName, ruleSetting ]) {
        const expectedRuleSetting = additionalRules[ruleName];

        assert.deepStrictEqual(
            expectedRuleSetting,
            ruleSetting,
            `Rule ${ruleName} is not set to ${JSON.stringify(expectedRuleSetting)}`
        );
    });
}
