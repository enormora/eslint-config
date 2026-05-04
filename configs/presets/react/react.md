# `@enormora/eslint-config-react`

Config preset for react, enabling specific rules.

## Install & Setup

Install the `@enormora/eslint-config-react` and the base preset package via npm:

```bash
npm install --save-dev @enormora/eslint-config-base @enormora/eslint-config-react
```

Create an ESLint configuration file (e.g., `eslint.config.js`) in your project and add the base and react config to the configuration array:

```javascript
import { baseConfig } from '@enormora/eslint-config-base';
import { reactConfig } from '@enormora/eslint-config-react';

export default [
    {
        ignores: ['dist/**/*']
    },
    baseConfig,
    {
        ...reactConfig,
        files: ['src/components/**/*.js']
    }
];
```
