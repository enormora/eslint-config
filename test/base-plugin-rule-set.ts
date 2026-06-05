import { rules as eslintCommentsPluginRules } from '@eslint-community/eslint-plugin-eslint-comments';
import markdownPlugin from '@eslint/markdown';
import { rules as importPluginRules } from 'eslint-plugin-import-x';
import { rules as jsonSchemaValidatorPluginRules } from 'eslint-plugin-json-schema-validator';
import { rules as markdownLinksPluginRules } from 'eslint-plugin-markdown-links';
import { rules as markdownPreferencesPluginRules } from 'eslint-plugin-markdown-preferences';
import { rules as noSecretsPluginRules } from 'eslint-plugin-no-secrets';
import { rules as packageJsonPluginRules } from 'eslint-plugin-package-json';
import { rules as regexpPluginRules } from 'eslint-plugin-regexp';

export const basePluginRuleSet = {
    'eslint-plugin-no-secrets': noSecretsPluginRules,
    'eslint-plugin-import': importPluginRules,
    'eslint-plugin-eslint-comments': eslintCommentsPluginRules,
    '@eslint/markdown': markdownPlugin.rules,
    'eslint-plugin-markdown-links': markdownLinksPluginRules,
    'eslint-plugin-markdown-preferences': markdownPreferencesPluginRules,
    'eslint-plugin-regexp': regexpPluginRules,
    'eslint-plugin-package-json': packageJsonPluginRules,
    'eslint-plugin-json-schema-validator': jsonSchemaValidatorPluginRules
};
