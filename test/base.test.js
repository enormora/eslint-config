import test from 'ava';
import noSecretsPlugin from 'eslint-plugin-no-secrets';
import importPlugin from 'eslint-plugin-import';
import eslintCommentsPlugin from 'eslint-plugin-eslint-comments';
import { baseConfig } from '../configs/base.js';
import {
    checkAllCoreRulesConfigured,
    checkUnknownCoreRulesAreNotConfigured,
    checkAllPluginRulesConfigured,
    checkUnknownPluginRulesAreNotConfigured,
    checkConfigToHaveNoValidationIssues
} from './rules-configuration.js';

test('all core rules are configured', checkAllCoreRulesConfigured, {
    ruleConfigSet: baseConfig.rules,
    rulesToExclude: [
        'array-bracket-newline',
        'array-bracket-spacing',
        'array-element-newline',
        'arrow-parens',
        'arrow-spacing',
        'block-spacing',
        'brace-style',
        'camelcase',
        'comma-dangle',
        'comma-spacing',
        'comma-style',
        'computed-property-spacing',
        'dot-location',
        'eol-last',
        'func-call-spacing',
        'function-call-argument-newline',
        'function-paren-newline',
        'generator-star-spacing',
        'implicit-arrow-linebreak',
        'indent',
        'jsx-quotes',
        'key-spacing',
        'keyword-spacing',
        'linebreak-style',
        'lines-between-class-members',
        'lines-around-comment',
        'max-len',
        'max-statements-per-line',
        'multiline-ternary',
        'new-parens',
        'newline-per-chained-call',
        'no-confusing-arrow',
        'no-extra-parens',
        'no-extra-semi',
        'no-floating-decimal',
        'no-mixed-operators',
        'no-mixed-spaces-and-tabs',
        'no-multi-spaces',
        'no-multiple-empty-lines',
        'no-tabs',
        'no-trailing-spaces',
        'no-whitespace-before-property',
        'nonblock-statement-body-position',
        'object-curly-newline',
        'object-curly-spacing',
        'object-property-newline',
        'one-var-declaration-per-line',
        'operator-linebreak',
        'padded-blocks',
        'padding-line-between-statements',
        'quote-props',
        'quotes',
        'rest-spread-spacing',
        'semi',
        'semi-spacing',
        'semi-style',
        'space-before-blocks',
        'space-before-function-paren',
        'space-in-parens',
        'space-infix-ops',
        'space-unary-ops',
        'spaced-comment',
        'switch-colon-spacing',
        'template-curly-spacing',
        'template-tag-spacing',
        'wrap-iife',
        'wrap-regex',
        'yield-star-spacing'
    ]
});

test('does not contain removed core rules', checkUnknownCoreRulesAreNotConfigured, {
    ruleConfigSet: baseConfig.rules
});

test('all eslint-plugin-no-secrets rules are configured', checkAllPluginRulesConfigured, {
    ruleConfigSet: baseConfig.rules,
    pluginRules: noSecretsPlugin.rules,
    pluginName: 'eslint-plugin-no-secrets'
});

test('no unknown eslint-plugin-no-secrets rules are configured', checkUnknownPluginRulesAreNotConfigured, {
    ruleConfigSet: baseConfig.rules,
    pluginRules: noSecretsPlugin.rules,
    pluginName: 'eslint-plugin-no-secrets'
});

test('all eslint-plugin-import rules are configured', checkAllPluginRulesConfigured, {
    ruleConfigSet: baseConfig.rules,
    pluginRules: importPlugin.rules,
    pluginName: 'eslint-plugin-import'
});

test('no unknown eslint-plugin-import rules are configured', checkUnknownPluginRulesAreNotConfigured, {
    ruleConfigSet: baseConfig.rules,
    pluginRules: importPlugin.rules,
    pluginName: 'eslint-plugin-import'
});

test('all eslint-plugin-eslint-comments rules are configured', checkAllPluginRulesConfigured, {
    ruleConfigSet: baseConfig.rules,
    pluginRules: eslintCommentsPlugin.rules,
    pluginName: 'eslint-plugin-eslint-comments'
});

test('no unknown eslint-plugin-eslint-comments rules are configured', checkUnknownPluginRulesAreNotConfigured, {
    ruleConfigSet: baseConfig.rules,
    pluginRules: eslintCommentsPlugin.rules,
    pluginName: 'eslint-plugin-eslint-comments'
});

test('base preset config has no validation errors', checkConfigToHaveNoValidationIssues, baseConfig);
