# `@enormora/eslint-config-eslint-plugin`

[![npm](https://img.shields.io/npm/v/@enormora/eslint-config-eslint-plugin?label=)](https://www.npmjs.com/package/@enormora/eslint-config-eslint-plugin)

Config preset for projects that author ESLint plugins or rules. Wraps
[`eslint-plugin-eslint-plugin`](https://github.com/eslint-community/eslint-plugin-eslint-plugin) and enables every
non-type-checked rule. `no-property-in-node` is off by default; opt it in once you wire the preset into a TypeScript
layer.

Exported as a factory rather than a static config so the two pattern-driven rules
(`require-meta-docs-url`, `require-meta-docs-description`) get useful values instead of silent presence checks.

## Install & Setup

Install the `@enormora/eslint-config-eslint-plugin` and the base preset package via npm:

```bash
npm install --save-dev @enormora/eslint-config-base @enormora/eslint-config-eslint-plugin
```

Apply the factory over the file glob that holds your plugin / rule source — for example a `source/rules/**/*.ts`
layout:

```javascript
import { baseConfig } from '@enormora/eslint-config-base';
import { createEslintPluginConfig } from '@enormora/eslint-config-eslint-plugin';

const eslintPluginConfig = createEslintPluginConfig({
    docsUrlPattern: 'https://github.com/my-org/my-eslint-plugin/blob/main/documentation/rules/{{name}}.md',
    descriptionPattern: '^(Enforce|Require|Disallow|Prefer|Forbid)'
});

export default [
    {
        ignores: [ 'dist/**/*' ]
    },
    ...baseConfig,
    {
        ...eslintPluginConfig,
        files: [ 'source/rules/**/*.ts' ]
    }
];
```

The factory enforces both arguments:

- `docsUrlPattern` — full URL template applied to `require-meta-docs-url`. Must include the literal `{{name}}`
  placeholder; the factory throws if it does not.
- `descriptionPattern` — regular expression source applied to `require-meta-docs-description`. Pick whichever verb
  prefix matches your plugin's docs style.

When your plugin source is in TypeScript and the consumer wires it into a TS-aware preset, opt the type-checked rule
in:

```javascript
{
    ...eslintPluginConfig,
    files: [ 'source/rules/**/*.ts' ],
    rules: {
        ...eslintPluginConfig.rules,
        'eslint-plugin/no-property-in-node': 'error'
    }
}
```

## Migrating from a handrolled `eslint-plugin-eslint-plugin` config

If your project currently spreads `flat/rules-recommended` and `flat/tests-recommended` directly, the preset is a
strictly stricter superset — it turns on every rule those configs enable plus the rest of the plugin's catalog
(`consistent-output`, `meta-property-ordering`, `report-message-format`, `require-test-case-name`,
`test-case-property-ordering`, and so on). Expect to layer a small number of project-specific overrides on top:

- Turn `eslint-plugin/prefer-output-null` off on your test file glob if your existing tests rely on omitting
  `output: null`.
- Override `import/no-default-export` on the plugin's entry file (the one that does `export default { meta, rules }`)
  to allow the default export — the preset itself does not weaken this rule.
- Adjust any of the always-on rules with a `'off'` override if a particular one does not match your plugin's style.
