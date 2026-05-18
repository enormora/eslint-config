# `@enormora/eslint-config-base`

[![npm](https://img.shields.io/npm/v/@enormora/eslint-config-base?label=)](https://www.npmjs.com/package/@enormora/eslint-config-base)

Base ESLint config preset, agnostic to any environment, framework, or library. Targets ESM-only projects.

Code formatting is handled by [dprint](https://dprint.dev/), wired into ESLint via the
[`@ben_12/eslint-plugin-dprint`](https://www.npmjs.com/package/@ben_12/eslint-plugin-dprint) plugin. TypeScript/JavaScript
files are formatted via the `dprint/typescript` rule, and JSON, Markdown, YAML, and TOML files are formatted via
their respective `dprint/*` rules — so a single `eslint --fix` covers everything and there is no need for a separate
formatter step. The dprint configuration ships inline with this preset, so no `dprint.json` is required at the consumer
project root. If you'd rather use prettier, use [`@enormora/eslint-config-base-with-prettier`](../base-with-prettier/base-with-prettier.md)
instead — it is an alternative base preset and is not meant to be combined with this one.

## Install & Setup

Install the `@enormora/eslint-config-base` package via npm:

```bash
npm install --save-dev @enormora/eslint-config-base
```

Create an ESLint configuration file (e.g., `eslint.config.js`) in your project and spread the base config into the
configuration array:

```javascript
import { baseConfig } from "@enormora/eslint-config-base";

export default [
  {
    ignores: ["dist/**/*"],
  },
  ...baseConfig,
];
```

`baseConfig` is an array of flat config blocks. The first block targets `**/*.{js,mjs,cjs}` and carries the lint rules.
The remaining blocks each enable one dprint formatter scoped to a default file glob:

| Block         | Files                                      | Rule                |
| :------------ | :----------------------------------------- | :------------------ |
| JavaScript/TS | `**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx,vue}` | `dprint/typescript` |
| JSON          | `**/*.json`                                | `dprint/json`       |
| Markdown      | `**/*.md`                                  | `dprint/markdown`   |
| YAML          | `**/*.{yml,yaml}`                          | `dprint/yaml`       |
| TOML          | `**/*.toml`                                | `dprint/toml`       |

### Customizing or disabling a formatter

Because the formatter blocks are plain flat config, you override them the same way as any other ESLint config — by
adding a later block whose `files` glob overlaps the one you want to change. Later blocks win.

Disable a formatter entirely:

```javascript
export default [
  ...baseConfig,
  { files: ["**/*.json"], rules: { "dprint/json": "off" } },
];
```

Scope a formatter to a different path (turn the default off, then re-enable on your paths):

```javascript
export default [
  ...baseConfig,
  { files: ["**/*.json"], rules: { "dprint/json": "off" } },
  { files: ["src/**/*.json"], rules: { "dprint/json": "error" } },
];
```

Ignore specific paths from formatting:

```javascript
export default [
  ...baseConfig,
  { ignores: ["vendor/**/*.json", "fixtures/**/*.md"] },
];
```

### Tweaking dprint options

To override an individual dprint option (e.g. line width, quote style), add a later block that re-configures the rule
with your own `config`:

```javascript
import { baseConfig, typescriptDprintConfig } from "@enormora/eslint-config-base";

export default [
  ...baseConfig,
  {
    files: ["**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx,vue}"],
    rules: {
      "dprint/typescript": ["error", { config: { ...typescriptDprintConfig, lineWidth: 100 } }],
    },
  },
];
```
