# `@enormora/eslint-config-eslint-plugin`

[![npm](https://img.shields.io/npm/v/@enormora/eslint-config-eslint-plugin?label=)](https://www.npmjs.com/package/@enormora/eslint-config-eslint-plugin)

Config preset for projects that author ESLint plugins or rules. Wraps
[`eslint-plugin-eslint-plugin`](https://github.com/eslint-community/eslint-plugin-eslint-plugin) and applies the
overrides that follow from a base preset that otherwise forbids default exports.

The preset enables every rule from `eslint-plugin-eslint-plugin` that does not require TypeScript type information
(`no-property-in-node` is off by default; opt in when wiring the plugin into a TypeScript preset).
`import/no-default-export` is turned off because rule definition files conventionally `export default { meta, create }`.

## Install & Setup

Install the `@enormora/eslint-config-eslint-plugin` and the base preset package via npm:

```bash
npm install --save-dev @enormora/eslint-config-base @enormora/eslint-config-eslint-plugin
```

Apply the preset over the file glob that holds your plugin / rule source — for example a `lib/**/*.js` layout:

```javascript
import { baseConfig } from '@enormora/eslint-config-base';
import { eslintPluginConfig } from '@enormora/eslint-config-eslint-plugin';

export default [
    {
        ignores: [ 'dist/**/*' ]
    },
    ...baseConfig,
    {
        ...eslintPluginConfig,
        files: [ 'lib/**/*.js' ]
    }
];
```

When your plugin source is in TypeScript and the consumer wires it into a TS-aware preset, opt the type-checked
rule in:

```javascript
{
    ...eslintPluginConfig,
    files: [ 'lib/**/*.ts' ],
    rules: {
        ...eslintPluginConfig.rules,
        'eslint-plugin/no-property-in-node': 'error'
    }
}
```
