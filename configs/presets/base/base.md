# `@enormora/eslint-config-base`

Base ESLint config preset, agnostic to any environment, framework, or library. Targets ESM-only projects.

Code formatting is handled by [dprint](https://dprint.dev/), wired into ESLint via the
[`@ben_12/eslint-plugin-dprint`](https://www.npmjs.com/package/@ben_12/eslint-plugin-dprint) plugin and the
`dprint/typescript` rule. The rule reads its options from a `dprint.json` file at your project root, which you must
provide. If you'd rather use prettier, use [`@enormora/eslint-config-base-with-prettier`](../base-with-prettier/base-with-prettier.md)
instead — it is an alternative base preset and is not meant to be combined with this one.

## Install & Setup

Install the `@enormora/eslint-config-base` package via npm:

```bash
npm install --save-dev @enormora/eslint-config-base
```

Add a `dprint.json` to your project root pointing at the typescript plugin (see the
[dprint configuration reference](https://dprint.dev/config/) for the full option list):

```json
{
    "lineWidth": 120,
    "indentWidth": 4,
    "useTabs": false,
    "typescript": {
        "quoteStyle": "preferSingle",
        "trailingCommas": "never"
    },
    "excludes": ["**/node_modules"],
    "plugins": ["./node_modules/@dprint/typescript/plugin.wasm"]
}
```

Create an ESLint configuration file (e.g., `eslint.config.js`) in your project and add the base config to the configuration array:

```javascript
import { baseConfig } from '@enormora/eslint-config-base';

export default [
    {
        ignores: ['dist/**/*']
    },
    baseConfig
];
```
