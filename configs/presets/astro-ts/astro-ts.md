# `@enormora/eslint-config-astro-ts`

[![npm](https://img.shields.io/npm/v/@enormora/eslint-config-astro-ts?label=)](https://www.npmjs.com/package/@enormora/eslint-config-astro-ts)

Config preset for Astro with TypeScript, enabling Astro parser support and explicit Astro rules.

## Install & Setup

Install the Astro preset, the base preset and the TypeScript package via npm:

```bash
npm install --save-dev @enormora/eslint-config-base @enormora/eslint-config-typescript @enormora/eslint-config-astro-ts
```

Create an ESLint configuration file (e.g., `eslint.config.js`) in your project and add the base, TypeScript and Astro config to the configuration array:

```javascript
import { astroConfig } from "@enormora/eslint-config-astro-ts";
import { baseConfig } from "@enormora/eslint-config-base";
import { typescriptConfig } from "@enormora/eslint-config-typescript";

export default [
  {
    ignores: ["dist/**/*"],
  },
  ...baseConfig,
  {
    ...typescriptConfig,
    files: ["**/*.ts"],
  },
  ...astroConfig,
];
```
