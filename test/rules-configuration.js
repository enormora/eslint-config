import test from 'ava';
import eslintCorePresets from '@eslint/js';
import { Linter } from 'eslint';
import ts from 'typescript';
import { testRuleSet } from '../configs/rule-sets/test-rules.js';

function extractShortName(pluginName) {
    const prefix = 'eslint-plugin-';
    const suffix = '/eslint-plugin';

    if (pluginName.startsWith(prefix)) {
        return pluginName.slice(prefix.length);
    }

    if (pluginName.startsWith('@') && pluginName.endsWith(suffix)) {
        const startPosition = 0;
        return pluginName.slice(startPosition, pluginName.length - suffix.length);
    }

    return pluginName;
}

function isRuleDeprecated(rule) {
    return rule.meta?.deprecated ?? false;
}

function isRuleConfigured(ruleConfigSet, ruleName) {
    const configuredRuleNames = Object.keys(ruleConfigSet);
    return configuredRuleNames.includes(ruleName);
}

export const checkAllCoreRulesConfigured = test.macro((t, testCase) => {
    const { ruleConfigSet } = testCase;
    const ruleNames = Object.keys(eslintCorePresets.configs.all.rules);

    if (ruleNames.length === 0) {
        t.fail('ESLint core rules not found');
    }

    ruleNames.forEach((ruleName) => {
        t.true(isRuleConfigured(ruleConfigSet, ruleName), `ESLint core rule "${ruleName}" not configured`);
    });
});

export const checkUnknownCoreRulesAreNotConfigured = test.macro((t, testCase) => {
    const { ruleConfigSet } = testCase;
    const allCoreRuleNames = Object.keys(eslintCorePresets.configs.all.rules);
    const configuredRuleNames = Object.keys(ruleConfigSet);
    const configuredCoreRuleNames = configuredRuleNames.filter((ruleName) => {
        return !ruleName.includes('/');
    });

    configuredCoreRuleNames.forEach((ruleName) => {
        t.true(allCoreRuleNames.includes(ruleName), `ESLint core rule "${ruleName}" configured, but doesn’t not exist`);
    });
});

export const checkAllPluginRulesConfigured = test.macro((t, testCase) => {
    const { ruleConfigSet, pluginRules, pluginName, rulesToExclude = [] } = testCase;
    const ruleNames = Object.keys(pluginRules);
    const shortPluginName = extractShortName(pluginName);

    if (ruleNames.length === 0) {
        t.fail('Plugin rules are empty');
    }

    ruleNames
        .filter((ruleName) => {
            return !rulesToExclude.includes(ruleName);
        })
        .forEach((ruleName) => {
            const rule = pluginRules[ruleName];
            const shortPluginRuleName = `${shortPluginName}/${ruleName}`;
            const isConfigured = isRuleConfigured(ruleConfigSet, shortPluginRuleName);

            if (isRuleDeprecated(rule)) {
                t.false(isConfigured, `Rule ${shortPluginRuleName} is deprecated`);
                return;
            }

            t.true(isConfigured, `Rule ${shortPluginRuleName} not configured`);
        });
});

export const checkUnknownPluginRulesAreNotConfigured = test.macro((t, testCase) => {
    const { ruleConfigSet, pluginRules, pluginName } = testCase;
    const shortPluginName = extractShortName(pluginName);
    const pluginRuleNames = Object.keys(pluginRules)
        .filter((ruleName) => {
            return !isRuleDeprecated(pluginRules[ruleName]);
        })
        .map((ruleName) => {
            return `${shortPluginName}/${ruleName}`;
        });

    if (pluginRuleNames.length === 0) {
        t.fail('Plugin rules are empty');
    }

    const configuredRuleNames = Object.keys(ruleConfigSet);
    const configuredPluginRuleNames = configuredRuleNames.filter((ruleName) => {
        return ruleName.startsWith(`${shortPluginName}/`);
    });

    configuredPluginRuleNames.forEach((ruleName) => {
        t.true(pluginRuleNames.includes(ruleName), `Rule ${ruleName} can be removed`);
    });
});

export const checkConfigToHaveNoValidationIssues = test.macro((t, config) => {
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
    const program = ts.createProgram(['/foo.js'], {}, customCompilerHost);

    try {
        linter.verify(
            'foo();',
            {
                ...config,
                languageOptions: {
                    ...config.languageOptions,
                    parserOptions: {
                        ...config.parserOptions,
                        program
                    }
                }
            },
            '/foo.js'
        );
        t.pass('Linter.verify() did not throw for the given config');
    } catch (error) {
        t.fail(`Linter.verify() failed for the given config with ${error.message}`);
    }
});

export const checkConfigLanguageOptions = test.macro((t, testCase) => {
    const { configLanguageOptions, languageOptions } = testCase;

    t.deepEqual(configLanguageOptions, languageOptions);
});

export const checkAllTestRulesConfigured = test.macro((t, testCase) => {
    const { ruleConfigSet } = testCase;

    const testRuleNames = Object.keys(testRuleSet.rules);
    const rulesFromConfigKeys = Object.keys(ruleConfigSet);

    if (rulesFromConfigKeys.length === 0) {
        t.fail('Plugin rules are empty');
    }

    const remainingRulesKeys = rulesFromConfigKeys.filter((ruleName) => {
        return testRuleNames.includes(ruleName);
    });

    const actual = remainingRulesKeys;
    const expected = testRuleNames;

    t.deepEqual(actual, expected, 'Common test rules could not be found');
});

export const checkAdditionalRulesConfigured = test.macro((t, testCase) => {
    const { ruleConfigSet, additionalRules } = testCase;

    const additionalRulesNames = Object.keys(additionalRules);
    const additionalRulesFromRuleConfigSet = Object.entries(ruleConfigSet).filter(([ruleName]) => {
        return additionalRulesNames.includes(ruleName);
    });

    if (additionalRulesFromRuleConfigSet.length === 0) {
        t.fail('Additional plugin rules are not defined');
    }

    additionalRulesFromRuleConfigSet.forEach(([ruleName, ruleSetting]) => {
        const expectedRuleSetting = additionalRules[ruleName];

        t.deepEqual(
            expectedRuleSetting,
            ruleSetting,
            `Rule ${ruleName} is not set to ${JSON.stringify(expectedRuleSetting)}`
        );
    });
});
