# `@enormora/eslint-config-vitest-node-assert`

[![npm](https://img.shields.io/npm/v/@enormora/eslint-config-vitest-node-assert?label=)](https://www.npmjs.com/package/@enormora/eslint-config-vitest-node-assert)

Config preset for projects that use Vitest together with Node.js `node:assert`.

## Install & Setup

Install the `@enormora/eslint-config-vitest-node-assert` and the base preset package via npm:

```bash
npm install --save-dev @enormora/eslint-config-base @enormora/eslint-config-vitest-node-assert
```

Create an ESLint configuration file (e.g., `eslint.config.js`) in your project and add the base and Vitest node assert config to the configuration array:

```javascript
import { baseConfig } from '@enormora/eslint-config-base';
import { vitestNodeAssertConfig } from '@enormora/eslint-config-vitest-node-assert';

export default [
    {
        ignores: [ 'dist/**/*' ]
    },
    ...baseConfig,
    {
        ...vitestNodeAssertConfig,
        files: [ '**/*.test.js' ]
    }
];
```

## `testSupportConfig`

This package also exports `testSupportConfig` for test-related files that are not themselves test files (helpers, mocks, fixtures, setup). It applies the shared test relaxations and Node.js `node:assert` rules without enabling any `@vitest/*` rules or Vitest globals.

```javascript
import { testSupportConfig, vitestNodeAssertConfig } from '@enormora/eslint-config-vitest-node-assert';

export default [
    {
        ...vitestNodeAssertConfig,
        files: [ '**/*.test.js' ]
    },
    {
        ...testSupportConfig,
        files: [ '**/test/helpers/**', '**/test/fixtures/**', '**/test/mocks/**' ]
    }
];
```
