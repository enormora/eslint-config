# `@enormora/eslint-config-base`

Base ESLint config preset, agnostic to any environment, framework, or library. Targets ESM-only projects.

## Install & Setup

Install the `@enormora/eslint-config-base` package via npm:

```bash
npm install --save-dev @enormora/eslint-config-base
```

Create an ESLint configuration file (e.g., `eslint.config.js`) in your project and add the base config to the configuration array:

```javascript
import { baseConfig } from '@enormora/eslint-config-base';

export default [
    {
        ignores: ['dist/**/*']
    },
    baseConfig
];
```
