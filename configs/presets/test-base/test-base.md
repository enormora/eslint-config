# `@enormora/eslint-config-test-base`

[![npm](https://img.shields.io/npm/v/@enormora/eslint-config-test-base?label=)](https://www.npmjs.com/package/@enormora/eslint-config-test-base)

Shared relaxations for test code. The framework presets (`@enormora/eslint-config-ava`, `@enormora/eslint-config-mocha`, `@enormora/eslint-config-vitest`) consume this package transitively and apply these relaxations on top of their framework-specific rules.

This package also exposes `testSupportConfig` for direct use on test-related files that are not themselves test files, e.g. test helpers, mocks, fixtures, or setup files. It applies the same relaxations as the framework presets without enabling any framework-specific rules.

## Usage

```javascript
import { baseConfig } from '@enormora/eslint-config-base';
import { testSupportConfig } from '@enormora/eslint-config-test-base';

export default [
    ...baseConfig,
    {
        ...testSupportConfig,
        files: [ '**/test/helpers/**', '**/test/fixtures/**', '**/test/mocks/**' ]
    }
];
```

The same `testSupportConfig` is re-exported from each framework preset, so projects that already depend on `@enormora/eslint-config-mocha`, `@enormora/eslint-config-ava`, or `@enormora/eslint-config-vitest` can import it from there without adding a direct dependency on this package.
