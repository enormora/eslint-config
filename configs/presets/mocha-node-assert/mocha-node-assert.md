# `@enormora/eslint-config-mocha-node-assert`

[![npm](https://img.shields.io/npm/v/@enormora/eslint-config-mocha-node-assert?label=)](https://www.npmjs.com/package/@enormora/eslint-config-mocha-node-assert)

Config preset for projects that use Mocha together with Node.js `node:assert`.

## Install & Setup

Install the `@enormora/eslint-config-mocha-node-assert` and the base preset package via npm:

```bash
npm install --save-dev @enormora/eslint-config-base @enormora/eslint-config-mocha-node-assert
```

Create an ESLint configuration file (e.g., `eslint.config.js`) in your project and add the base and Mocha node assert config to the configuration array:

```javascript
import { baseConfig } from '@enormora/eslint-config-base';
import { mochaNodeAssertConfig } from '@enormora/eslint-config-mocha-node-assert';

export default [
    {
        ignores: [ 'dist/**/*' ]
    },
    ...baseConfig,
    {
        ...mochaNodeAssertConfig,
        files: [ '**/*.test.js' ]
    }
];
```

## `testSupportConfig`

This package also exports `testSupportConfig` for test-related files that are not themselves test files (helpers, mocks, fixtures, setup). It applies the shared test relaxations and Node.js `node:assert` rules without enabling any `mocha/*` rules.

```javascript
import { mochaNodeAssertConfig, testSupportConfig } from '@enormora/eslint-config-mocha-node-assert';

export default [
    {
        ...mochaNodeAssertConfig,
        files: [ '**/*.test.js' ]
    },
    {
        ...testSupportConfig,
        files: [ '**/test/helpers/**', '**/test/fixtures/**', '**/test/mocks/**' ]
    }
];
```
