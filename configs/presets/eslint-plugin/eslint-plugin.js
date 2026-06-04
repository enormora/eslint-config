import * as eslintPluginPlugin from 'eslint-plugin-eslint-plugin';

export function createEslintPluginConfig(options) {
    const { docsUrlPattern, descriptionPattern } = options;

    if (typeof docsUrlPattern !== 'string' || !docsUrlPattern.includes('{{name}}')) {
        throw new TypeError(
            'createEslintPluginConfig: `docsUrlPattern` must be a string that contains the `{{name}}` placeholder'
        );
    }
    if (typeof descriptionPattern !== 'string') {
        throw new TypeError(
            'createEslintPluginConfig: `descriptionPattern` must be a string regular expression'
        );
    }

    return {
        plugins: {
            'eslint-plugin': eslintPluginPlugin
        },
        rules: {
            'eslint-plugin/consistent-output': 'error',
            'eslint-plugin/fixer-return': 'error',
            'eslint-plugin/meta-property-ordering': 'error',
            'eslint-plugin/no-deprecated-context-methods': 'error',
            'eslint-plugin/no-deprecated-report-api': 'error',
            'eslint-plugin/no-identical-tests': 'error',
            'eslint-plugin/no-matching-violation-suggest-message-ids': 'error',
            'eslint-plugin/no-meta-replaced-by': 'error',
            'eslint-plugin/no-meta-schema-default': 'error',
            'eslint-plugin/no-missing-message-ids': 'error',
            'eslint-plugin/no-missing-placeholders': 'error',
            'eslint-plugin/no-only-tests': 'error',
            'eslint-plugin/no-unused-message-ids': 'error',
            'eslint-plugin/no-unused-placeholders': 'error',
            'eslint-plugin/no-useless-token-range': 'error',
            'eslint-plugin/prefer-message-ids': 'error',
            'eslint-plugin/prefer-object-rule': 'error',
            'eslint-plugin/prefer-output-null': 'error',
            'eslint-plugin/prefer-placeholders': 'error',
            'eslint-plugin/prefer-replace-text': 'error',
            'eslint-plugin/report-message-format': 'error',
            'eslint-plugin/require-meta-default-options': 'error',
            'eslint-plugin/require-meta-docs-description': [ 'error', { pattern: descriptionPattern } ],
            'eslint-plugin/require-meta-docs-recommended': 'error',
            'eslint-plugin/require-meta-docs-url': [ 'error', { pattern: docsUrlPattern } ],
            'eslint-plugin/require-meta-fixable': 'error',
            'eslint-plugin/require-meta-has-suggestions': 'error',
            'eslint-plugin/require-meta-schema': 'error',
            'eslint-plugin/require-meta-schema-description': 'error',
            'eslint-plugin/require-meta-type': 'error',
            'eslint-plugin/require-test-case-name': 'error',
            'eslint-plugin/require-test-error-positions': 'error',
            'eslint-plugin/test-case-property-ordering': 'error',
            'eslint-plugin/test-case-shorthand-strings': 'error',
            'eslint-plugin/unique-test-case-names': 'error',

            // Type-checked rule that requires the `@typescript-eslint` parser and a TS-aware program.
            // Off by default so the preset works on plain JS plugins; opt in from a TS preset layer.
            'eslint-plugin/no-property-in-node': 'off'
        }
    };
}
