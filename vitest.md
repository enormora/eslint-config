# `@enormora/eslint-config-vitest`

Config preset for `vitest`, enabling specific rules and configures global variables.

## Install & Setup

Install the `@enormora/eslint-config-vitest` and the base preset package via npm:

```bash
npm install --save-dev @enormora/eslint-config-base @enormora/eslint-config-vitest
```

Create an ESLint configuration file (e.g., `eslint.config.js`) in your project and add the base and mocha config to the configuration array:

```javascript
import { baseConfig } from '@enormora/eslint-config-base';
import { vitestConfig } from '@enormora/eslint-config-vitest';

export default [
    {
        ignores: ['dist/**/*']
    },
    baseConfig,
    {
        ...vitestConfig,
        files: ['**/*.test.js']
    }
];
```
