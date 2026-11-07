import prettierPlugin from 'eslint-plugin-prettier';
import { basePluginRuleSet } from './base-plugin-rule-set.ts';

export const baseWithPrettierPluginRuleSet = {
    ...basePluginRuleSet,
    'eslint-plugin-prettier': prettierPlugin.rules
};
