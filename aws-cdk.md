# `@enormora/eslint-config-aws-cdk`

Config preset for AWS CDK projects. Disables a small set of rules that conflict with idiomatic CDK construct code.

## What it disables and why

- `no-restricted-syntax` — re-applies the switch and TS enum bans, and keeps the class-declaration ban but widens its allowlist so classes whose superclass name ends in `Error`, `Construct`, `Stack`, or `Resource` (e.g. `MyStack extends Stack`, custom errors) are permitted.
- `no-new` — `new MyStack(app, 'id', props)` is the canonical way to register stacks and constructs; the side-effecting `new` is intentional.
- `sonarjs/constructor-for-side-effects` — child constructs register themselves on their parent via `super(scope, id)` in the constructor; the returned instance is often unused.
- `functional/no-this-expressions` — construct constructors reference `this` to expose typed children to consumers.

## Install & Setup

Install the `@enormora/eslint-config-aws-cdk` package together with the base and typescript presets via npm:

```bash
npm install --save-dev @enormora/eslint-config-base @enormora/eslint-config-typescript @enormora/eslint-config-aws-cdk
```

Apply the preset to the directories that hold CDK code (typically a folder named `infrastructure/` or similar) in your `eslint.config.js`:

```javascript
import { baseConfig } from '@enormora/eslint-config-base';
import { typescriptConfig } from '@enormora/eslint-config-typescript';
import { awsCdkConfig } from '@enormora/eslint-config-aws-cdk';

export default [
    {
        ignores: ['cdk.out/**/*']
    },
    baseConfig,
    {
        ...typescriptConfig,
        files: ['**/*.ts']
    },
    {
        ...awsCdkConfig,
        files: ['**/infrastructure/**/*.ts']
    }
];
```
