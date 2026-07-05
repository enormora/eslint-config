# `@enormora/eslint-config-node-assert`

[![npm](https://img.shields.io/npm/v/@enormora/eslint-config-node-assert?label=)](https://www.npmjs.com/package/@enormora/eslint-config-node-assert)

ESLint rules for Node.js `node:assert` usage.

The preset keeps imports on `node:assert` and requires explicit strict assertion methods at call sites.

## Usage

```javascript
import { nodeAssertConfig } from '@enormora/eslint-config-node-assert';

export default [
    {
        ...nodeAssertConfig,
        files: [ '**/*.test.{js,ts}' ]
    }
];
```
