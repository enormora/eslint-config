# `@enormora/eslint-config-ava-node-assert`

[![npm](https://img.shields.io/npm/v/@enormora/eslint-config-ava-node-assert?label=)](https://www.npmjs.com/package/@enormora/eslint-config-ava-node-assert)

Config preset for projects that use AVA together with Node.js `node:assert`.

## Install & Setup

Install the `@enormora/eslint-config-ava-node-assert` and the base preset package via npm:

```bash
npm install --save-dev @enormora/eslint-config-base @enormora/eslint-config-ava-node-assert
```

Create an ESLint configuration file (e.g., `eslint.config.js`) in your project and add the base and AVA node assert config to the configuration array:

```javascript
import { avaNodeAssertConfig } from '@enormora/eslint-config-ava-node-assert';
import { baseConfig } from '@enormora/eslint-config-base';

export default [
    {
        ignores: [ 'dist/**/*' ]
    },
    ...baseConfig,
    {
        ...avaNodeAssertConfig,
        files: [ '**/*.test.js' ]
    }
];
```

## `testSupportConfig`

This package also exports `testSupportConfig` for test-related files that are not themselves test files (helpers, mocks, fixtures, setup). It applies the shared test relaxations and Node.js `node:assert` rules without enabling any `ava/*` rules.

```javascript
import { avaNodeAssertConfig, testSupportConfig } from '@enormora/eslint-config-ava-node-assert';

export default [
    {
        ...avaNodeAssertConfig,
        files: [ '**/*.test.js' ]
    },
    {
        ...testSupportConfig,
        files: [ '**/test/helpers/**', '**/test/fixtures/**', '**/test/mocks/**' ]
    }
];
```
