# `@enormora/eslint-config-mocha`

Config preset for `mocha`, enabling specific rules and configures global variables.

## Install & Setup

Install the `@enormora/eslint-config-mocha` and the base preset package via npm:

```bash
npm install --save-dev @enormora/eslint-config-base @enormora/eslint-config-mocha
```

Create an ESLint configuration file (e.g., `eslint.config.js`) in your project and add the base and mocha config to the configuration array:

```javascript
import { baseConfig } from '@enormora/eslint-config-base';
import { mochaConfig } from '@enormora/eslint-config-mocha';

export default [
    {
        ignores: ['dist/**/*']
    },
    baseConfig,
    {
        ...mochaConfig,
        files: ['**/*.test.js']
    }
];
```
