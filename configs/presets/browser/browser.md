# `@enormora/eslint-config-browser`

Config preset for browser environments, enabling specific rules and configures global variables.

## Install & Setup

Install the `@enormora/eslint-config-browser` and the base preset package via npm:

```bash
npm install --save-dev @enormora/eslint-config-base @enormora/eslint-config-browser
```

Create an ESLint configuration file (e.g., `eslint.config.js`) in your project and add the base and browser config to the configuration array:

```javascript
import { baseConfig } from '@enormora/eslint-config-base';
import { browserConfig } from '@enormora/eslint-config-browser';

export default [
    {
        ignores: ['dist/**/*']
    },
    baseConfig,
    {
        ...browserConfig,
        files: ['src/browser/**/*.js']
    }
];
```
