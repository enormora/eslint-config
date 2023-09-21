import test from 'ava';
import eslintCorePresets from '@eslint/js';

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

export const checkAllCoreRulesConfigured = test.macro((t, { ruleConfigSet }) => {
    const ruleNames = Object.keys(eslintCorePresets.configs.all.rules);

    if (ruleNames.length === 0) {
        t.fail('ESLint core rules not found');
    }

    ruleNames.forEach((ruleName) => {
        t.true(isRuleConfigured(ruleConfigSet, ruleName), `ESLint core rule "${ruleName}" not configured`);
    });
});

export const checkUnknownCoreRulesAreNotConfigured = test.macro((t, { ruleConfigSet }) => {
    const allCoreRuleNames = Object.keys(eslintCorePresets.configs.all.rules);
    const configuredRuleNames = Object.keys(ruleConfigSet);
    const configuredCoreRuleNames = configuredRuleNames.filter((ruleName) => {
        return !ruleName.includes('/');
    });

    configuredCoreRuleNames.forEach((ruleName) => {
        t.true(allCoreRuleNames.includes(ruleName), `ESLint core rule "${ruleName}" configured, but doesn’t not exist`);
    });
});

export const checkAllPluginRulesConfigured = test.macro((t, { ruleConfigSet, pluginRules, pluginName }) => {
    const ruleNames = Object.keys(pluginRules);
    const shortPluginName = extractShortName(pluginName);

    if (ruleNames.length === 0) {
        t.fail('Plugin rules are empty');
    }

    ruleNames.forEach((ruleName) => {
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

export const checkUnknownPluginRulesAreNotConfigured = test.macro((t, { ruleConfigSet, pluginRules, pluginName }) => {
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
