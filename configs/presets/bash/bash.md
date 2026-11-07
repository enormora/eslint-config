# `@enormora/eslint-config-bash`

[![npm](https://img.shields.io/npm/v/@enormora/eslint-config-bash?label=)](https://www.npmjs.com/package/@enormora/eslint-config-bash)

Lints `.sh` and `.bash` files as Bash using explicitly configured rules from
[`@eslint/shell`](https://github.com/eslint/shell). Apply `bashConfig` after either base preset to override its
POSIX dialect for `.sh` files. The preset also works alone for shell-only projects.

## Install & Setup

```bash
npm install --save-dev @enormora/eslint-config-base @enormora/eslint-config-bash
```

```javascript
import { baseConfig } from '@enormora/eslint-config-base';
import { bashConfig } from '@enormora/eslint-config-bash';

export default [
    ...baseConfig,
    bashConfig
];
```

For the prettier base, replace `baseConfig` with `baseWithPrettierConfig` from
`@enormora/eslint-config-base-with-prettier`.

In a project mixing POSIX and Bash scripts, narrow the Bash override to the relevant paths:

```javascript
export default [
    ...baseConfig,
    { ...bashConfig, files: [ '**/*.bash', 'scripts/bash/**/*.sh' ] }
];
```

The configured dialect controls parsing, regardless of the shebang. Extensionless scripts require an explicit
`files` pattern. Shell formatting is not included, and these rules do not replace the full ShellCheck rule set.
