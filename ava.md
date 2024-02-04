# `@enormora/eslint-config-ava`

Config preset for ava, enabling specific rules.

## Install & Setup

Install the `@enormora/eslint-config-ava` and the base preset package via npm:

```bash
npm install --save-dev @enormora/eslint-config-base @enormora/eslint-config-ava
```

Create an ESLint configuration file (e.g., `eslint.config.js`) in your project and add the base and node config to the configuration array:

```javascript
import { baseConfig } from '@enormora/eslint-config-base';
import { avaConfig } from '@enormora/eslint-config-ava';

export default [
    {
        ignores: ['dist/**/*']
    },
    baseConfig,
    {
        ...avaConfig,
        files: ['**/*.test.js']
    }
];
```
