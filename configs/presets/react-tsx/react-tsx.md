# `@enormora/eslint-config-react-tsx`

Config preset for react and JSX per typescript, enabling specific rules and compiler settings.

## Install & Setup

Install the `@enormora/eslint-config-react-tsx`, the base preset and the typescript package via npm:

```bash
npm install --save-dev @enormora/eslint-config-base @enormora/eslint-config-typescript @enormora/eslint-config-react-tsx
```

Create an ESLint configuration file (e.g., `eslint.config.js`) in your project and add the base and react config to the configuration array:

```javascript
import { baseConfig } from '@enormora/eslint-config-base';
import { reactTsxConfig } from '@enormora/eslint-config-react-tsx';

export default [
    {
        ignores: ['dist/**/*']
    },
    baseConfig,
    {
        ...reactTsxConfig,
        files: ['src/components/**/*.tsx']
    }
];
```
