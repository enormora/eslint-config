# `@enormora/eslint-config-vue-ts`

Config preset for Vue with TypeScript, enabling specific rules and compiler settings.

## Install & Setup

Install the `@enormora/eslint-config-vue-ts`, the base preset and the TypeScript package via npm:

```bash
npm install --save-dev @enormora/eslint-config-base @enormora/eslint-config-typescript @enormora/eslint-config-vue-ts
```

Create an ESLint configuration file (e.g., `eslint.config.js`) in your project and add the base and react config to the configuration array:

```javascript
import { baseConfig } from '@enormora/eslint-config-base';
import { vueConfig } from '@enormora/eslint-config-vue-ts';

export default [
    {
        ignores: ['dist/**/*']
    },
    baseConfig,
    {
        ...vueConfig,
        files: ['src/**/*.vue']
    }
];
```
