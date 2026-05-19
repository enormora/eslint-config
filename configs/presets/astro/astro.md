# `@enormora/eslint-config-astro`

[![npm](https://img.shields.io/npm/v/@enormora/eslint-config-astro?label=)](https://www.npmjs.com/package/@enormora/eslint-config-astro)

Config preset for Astro with JavaScript, enabling Astro parser support and explicit Astro rules.

## Install & Setup

Install the Astro preset and the base preset via npm:

```bash
npm install --save-dev @enormora/eslint-config-base @enormora/eslint-config-astro
```

The preset package includes the `eslint-plugin-jsx-a11y` dependency required by Astro accessibility rules.

Create an ESLint configuration file (e.g., `eslint.config.js`) in your project and add the base and Astro config to the configuration array:

```javascript
import { astroConfig } from "@enormora/eslint-config-astro";
import { baseConfig } from "@enormora/eslint-config-base";

export default [
  {
    ignores: ["dist/**/*"],
  },
  ...baseConfig,
  ...astroConfig,
];
```
