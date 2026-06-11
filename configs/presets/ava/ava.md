# `@enormora/eslint-config-ava`

[![npm](https://img.shields.io/npm/v/@enormora/eslint-config-ava?label=)](https://www.npmjs.com/package/@enormora/eslint-config-ava)

Config preset for ava, enabling specific rules.

## Install & Setup

Install the `@enormora/eslint-config-ava` and the base preset package via npm:

```bash
npm install --save-dev @enormora/eslint-config-base @enormora/eslint-config-ava
```

Create an ESLint configuration file (e.g., `eslint.config.js`) in your project and add the base and node config to the configuration array:

```javascript
import { avaConfig } from '@enormora/eslint-config-ava';
import { baseConfig } from '@enormora/eslint-config-base';

export default [
    {
        ignores: [ 'dist/**/*' ]
    },
    ...baseConfig,
    {
        ...avaConfig,
        files: [ '**/*.test.js' ]
    }
];
```

## `testSupportConfig`

This package also re-exports `testSupportConfig` for test-related files that are not themselves test files (helpers, mocks, fixtures, setup). It applies the same shared relaxations as `avaConfig` without enabling any `ava/*` rules.

```javascript
import { avaConfig, testSupportConfig } from '@enormora/eslint-config-ava';

export default [
    {
        ...avaConfig,
        files: [ '**/*.test.js' ]
    },
    {
        ...testSupportConfig,
        files: [ '**/test/helpers/**', '**/test/fixtures/**', '**/test/mocks/**' ]
    }
];
```
