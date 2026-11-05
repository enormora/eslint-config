# `@enormora/eslint-config-typescript`

[![npm](https://img.shields.io/npm/v/@enormora/eslint-config-typescript?label=)](https://www.npmjs.com/package/@enormora/eslint-config-typescript)

Config preset for typescript, enabling specific rules and compiler settings.

## Comparison checks

[`eslint-plugin-no-object-comparison`](https://github.com/vekexasia/eslint-plugin-no-object-comparison)
adds type-aware checks for relational comparisons of objects without primitive coercion, numeric-looking
string comparisons, and fresh object references passed to array searches or Map/Set lookups. It also
reports equality comparisons containing decimal arithmetic. These checks run with the preset's existing
`projectService` configuration. The preset requires TypeScript `>=5.0.0 <6.1.0` to satisfy the plugin's
peer dependency.

Array and collection lookups use `indirectReferences: 'none'`, so existing object references remain valid.
Object identity comparisons, object keys, and JSON string comparisons remain allowed. Date comparisons
are accepted because dates support numeric coercion.

The plugin's NaN, self-comparison, symbol, boxed-primitive, and switch-case checks are disabled in favor
of existing core, TypeScript, and syntax rules. Its blanket checks for object equality, comparisons with
`any`/`unknown`, and object collection keys are also disabled.

## Install & Setup

Install the `@enormora/eslint-config-typescript` and the base preset package via npm:

```bash
npm install --save-dev @enormora/eslint-config-base @enormora/eslint-config-typescript
```

Create an ESLint configuration file (e.g., `eslint.config.js`) in your project and add the base and node config to the configuration array:

```javascript
import { baseConfig } from '@enormora/eslint-config-base';
import { typescriptConfig } from '@enormora/eslint-config-typescript';

export default [
    {
        ignores: [ 'dist/**/*' ]
    },
    ...baseConfig,
    {
        ...typescriptConfig,
        files: [ '**/*.ts' ]
    }
];
```

## First-party rules

This preset ships a first-party plugin under the namespace `enormora-typescript`:

- `enormora-typescript/no-impure-satisfies` — flags every `satisfies` expression. Constraints that contain literal types (e.g. `{ kind: 'a' }`, `1`, `readonly [1, 2]`) are reported as `typeChangingSatisfies` because they pin the inferred type to specific literals. Constraints that are purely structural (e.g. `{ kind: string }`, `Handler`) are reported as `trivialSatisfies` because they impose no narrowing beyond what TypeScript already infers. The preset enables the rule with type-aware parsing (`parserOptions.projectService`).
- `enormora-typescript/prefer-named-callable-types` — flags `typeof <callable>` inside `ReturnType`, `Parameters`, `ConstructorParameters`, `InstanceType`, and `ThisParameterType` whenever the extracted type already has a named alias declared in the local sources (outside `node_modules`). The fix is to import (or, if needed, `export` first) the existing alias instead of reconstructing it through the utility type.
