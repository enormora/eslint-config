# `@enormora/eslint-config-vitest`

[![npm](https://img.shields.io/npm/v/@enormora/eslint-config-vitest?label=)](https://www.npmjs.com/package/@enormora/eslint-config-vitest)

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
        ignores: [ 'dist/**/*' ]
    },
    ...baseConfig,
    {
        ...vitestConfig,
        files: [ '**/*.test.js' ]
    }
];
```

## `testSupportConfig`

This package also re-exports `testSupportConfig` for test-related files that are not themselves test files (helpers, mocks, fixtures, setup). It applies the same shared relaxations as `vitestConfig` without enabling any `@vitest/*` rules or Vitest globals.

```javascript
import { testSupportConfig, vitestConfig } from '@enormora/eslint-config-vitest';

export default [
    {
        ...vitestConfig,
        files: [ '**/*.test.js' ]
    },
    {
        ...testSupportConfig,
        files: [ '**/test/helpers/**', '**/test/fixtures/**', '**/test/mocks/**' ]
    }
];
```
