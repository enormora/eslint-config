# `@enormora/eslint-config-astro`

Config preset for Astro with JavaScript, enabling Astro parser support and explicit Astro rules.

## Install & Setup

Install the Astro preset and the base preset via npm:

```bash
npm install --save-dev @enormora/eslint-config-base @enormora/eslint-config-astro
```

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
