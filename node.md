# `@enormora/eslint-config-node`

Config preset for node.js, enabling specific rules and configures global variables.

## Install & Setup

Install the `@enormora/eslint-config-node` and the base preset package via npm:

```bash
npm install --save-dev @enormora/eslint-config-base @enormora/eslint-config-node
```

Create an ESLint configuration file (e.g., `eslint.config.js`) in your project and add the base and node config to the configuration array:

```javascript
import { baseConfig } from '@enormora/eslint-config-base';
import { nodeConfig } from '@enormora/eslint-config-node';

export default [
    {
        ignores: ['dist/**/*']
    },
    baseConfig,
    {
        ...nodeConfig,
        files: ['src/server/**/*.js']
    }
];
```

**Additional presets for specific scenarios:**

-   `nodeConfigFileConfig`: settings for config files
-   `nodeEntryPointFileConfig`: settings for entry point files, which allows e.g. the usage of environment variables
