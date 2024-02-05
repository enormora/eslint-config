# `@enormora/eslint-config-typescript`

Config preset for typescript, enabling specific rules and compiler settings.

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
        ignores: ['dist/**/*']
    },
    baseConfig,
    {
        ...typescriptConfig,
        files: ['**/*.ts']
    }
];
```
