# `@enormora/eslint-config-react-jsx`

Config preset for react and JSX, enabling specific rules and compiler settings.

## Install & Setup

Install the `@enormora/eslint-config-react-jsx` and the base preset package via npm:

```bash
npm install --save-dev @enormora/eslint-config-base @enormora/eslint-config-react-jsx
```

Create an ESLint configuration file (e.g., `eslint.config.js`) in your project and add the base and react config to the configuration array:

```javascript
import { baseConfig } from '@enormora/eslint-config-base';
import { reactJsxConfig } from '@enormora/eslint-config-react-jsx';

export default [
    {
        ignores: ['dist/**/*']
    },
    baseConfig,
    {
        ...reactJsxConfig,
        files: ['src/components/**/*.jsx']
    }
];
```
