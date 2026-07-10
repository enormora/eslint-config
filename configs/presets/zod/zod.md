# `@enormora/eslint-config-zod`

[![npm](https://img.shields.io/npm/v/@enormora/eslint-config-zod?label=)](https://www.npmjs.com/package/@enormora/eslint-config-zod)

Config preset for [Zod](https://zod.dev). It enforces the usage of [Zod Mini](https://zod.dev/packages/mini) (`zod/mini`) together with [Zod core](https://zod.dev/packages/core) (`zod/v4/core`), and reports the regular Zod API as a problem.

Wraps [`eslint-plugin-zod-mini`](https://github.com/marcalexiei/eslint-plugin-zod) and [`eslint-plugin-zod-core`](https://github.com/marcalexiei/eslint-plugin-zod).

## Install & Setup

Install `@enormora/eslint-config-zod` and the base preset package via npm:

```bash
npm install --save-dev @enormora/eslint-config-base @enormora/eslint-config-zod
```

Create an ESLint configuration file (e.g., `eslint.config.js`) in your project and add the base and Zod config to the configuration array:

```javascript
import { baseConfig } from '@enormora/eslint-config-base';
import { zodConfig } from '@enormora/eslint-config-zod';

export default [
    {
        ignores: [ 'dist/**/*' ]
    },
    ...baseConfig,
    zodConfig
];
```

## Enforcing Zod Mini

Importing from the regular `zod` entry points is reported, while `zod/mini` and `zod/v4/core` are allowed:

```javascript
import { z } from 'zod'; // error: Use zod/mini or zod/v4/core instead.
import { z } from 'zod/mini'; // ok
import { $ZodType } from 'zod/v4/core'; // ok
```

## Banned schemas

`z.enum()` and `z.nativeEnum()` are reported; use a union of `z.literal()` instead:

```javascript
z.enum([ 'a', 'b' ]); // error
z.nativeEnum(Color); // error
z.union([ z.literal('a'), z.literal('b') ]); // ok
```

A `z.array()` carrying a length check (`z.length()`, `z.minLength()`, `z.maxLength()`) is reported; a length-constrained array has a precise `z.tuple()` form:

```javascript
z.array(z.string()).check(z.length(2)); // error
z.array(z.string()).check(z.minLength(1)); // error
z.tuple([ z.string(), z.string() ]); // ok
z.tuple([ z.string() ], z.string()); // ok: [string, ...string[]]
z.array(z.string()); // ok: unbounded array
```

## Readonly schemas

Mutable schemas (`z.object`, `z.strictObject`, `z.looseObject`, `z.array`, `z.tuple`, `z.record`, `z.map`, `z.set`) must be wrapped in `z.readonly()` so the inferred type is readonly, matching the readonly-everywhere TypeScript stance. The check is autofixable, and applying it at every level composes into a deeply readonly type (`z.readonly()` is shallow):

```javascript
z.object({ a: z.string() }); // error
z.readonly(z.object({ a: z.string() })); // ok
z.readonly(z.object({ items: z.readonly(z.array(z.string())) })); // ok: deep
```

Conversely, `z.readonly()` on an already-immutable schema (a primitive such as `z.string()`/`z.literal()`, or a doubled `z.readonly()`) is reported and removed by autofix, since it has no effect on the inferred type:

```javascript
z.readonly(z.string()); // error → z.string()
z.string(); // ok
```
