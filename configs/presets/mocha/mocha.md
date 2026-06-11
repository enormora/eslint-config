# `@enormora/eslint-config-mocha`

[![npm](https://img.shields.io/npm/v/@enormora/eslint-config-mocha?label=)](https://www.npmjs.com/package/@enormora/eslint-config-mocha)

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
        ignores: [ 'dist/**/*' ]
    },
    ...baseConfig,
    {
        ...mochaConfig,
        files: [ '**/*.test.js' ]
    }
];
```

## `testSupportConfig`

This package also re-exports `testSupportConfig` for test-related files that are not themselves test files (helpers, mocks, fixtures, setup). It applies the same shared relaxations as `mochaConfig` without enabling any `mocha/*` rules.

```javascript
import { mochaConfig, testSupportConfig } from '@enormora/eslint-config-mocha';

export default [
    {
        ...mochaConfig,
        files: [ '**/*.test.js' ]
    },
    {
        ...testSupportConfig,
        files: [ '**/test/helpers/**', '**/test/fixtures/**', '**/test/mocks/**' ]
    }
];
```
