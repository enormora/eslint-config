# `@enormora/eslint-config-base-with-prettier`

Drop-in alternative to [`@enormora/eslint-config-base`](../base/base.md) that formats with
[prettier](https://prettier.io/) instead of dprint.

This preset is itself a base preset — pick this one **or** `@enormora/eslint-config-base`, never both. It contains the
same set of lint rules as the regular base preset; the only difference is the formatter integration.

## Install & Setup

Install the `@enormora/eslint-config-base-with-prettier` package together with prettier itself via npm:

```bash
npm install --save-dev @enormora/eslint-config-base-with-prettier prettier
```

Provide a `prettier.config.js` at your project root with the formatting options you want (see the
[prettier configuration reference](https://prettier.io/docs/en/options.html)):

```javascript
export default {
  printWidth: 120,
  tabWidth: 4,
  singleQuote: true,
  trailingComma: "none",
  arrowParens: "always",
};
```

Create an ESLint configuration file (e.g., `eslint.config.js`) in your project and add the preset to the configuration
array:

```javascript
import { baseWithPrettierConfig } from "@enormora/eslint-config-base-with-prettier";

export default [
  {
    ignores: ["dist/**/*"],
  },
  baseWithPrettierConfig,
];
```
