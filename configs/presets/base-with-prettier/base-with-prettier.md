# `@enormora/eslint-config-base-with-prettier`

[![npm](https://img.shields.io/npm/v/@enormora/eslint-config-base-with-prettier?label=)](https://www.npmjs.com/package/@enormora/eslint-config-base-with-prettier)

Drop-in alternative to [`@enormora/eslint-config-base`](../base/base.md) that formats with
[prettier](https://prettier.io/) instead of dprint.

This preset is itself a base preset — pick this one **or** `@enormora/eslint-config-base`, never both. It contains the
same set of lint rules as the regular base preset, including the semantic markdown linting stack
(`@eslint/markdown`, `eslint-plugin-markdown-links`, `eslint-plugin-markdown-preferences`) and the dedicated
`package.json` linting stack (`eslint-plugin-package-json`, `eslint-plugin-json-schema-validator`). The only
differences are the formatter integration and that TOML is not covered (prettier has no native TOML support; see
[Limitations](#limitations) below).

## Install & Setup

Install the `@enormora/eslint-config-base-with-prettier` package together with prettier itself via npm:

```bash
npm install --save-dev @enormora/eslint-config-base-with-prettier prettier
```

Provide a `prettier.config.js` at your project root with the formatting options you want (see the
[prettier configuration reference](https://prettier.io/docs/en/options.html)):

```javascript
export default {
    printWidth: 120,
    tabWidth: 4,
    singleQuote: true,
    trailingComma: 'none',
    arrowParens: 'always'
};
```

Create an ESLint configuration file (e.g., `eslint.config.js`) in your project and spread the preset into the
configuration array:

```javascript
import { baseWithPrettierConfig } from '@enormora/eslint-config-base-with-prettier';

export default [
    {
        ignores: [ 'dist/**/*' ]
    },
    ...baseWithPrettierConfig
];
```

`baseWithPrettierConfig` is an array of flat config blocks. The first block targets the JS/TS/Vue file set and carries
the lint rules; the remaining blocks each scope `prettier/prettier` to one file family, with the markdown block
additionally enabling the semantic markdown linters.

| Block         | Files                                      | Rule(s)                                                                         |
| :------------ | :----------------------------------------- | :------------------------------------------------------------------------------ |
| JavaScript/TS | `**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx,vue}` | base lint rules + `prettier/prettier`                                           |
| JSON          | `**/*.json`                                | `prettier/prettier`                                                             |
| package.json  | `**/package.json`                          | `package-json/*`, `json-schema-validator/no-invalid`                            |
| Markdown      | `**/*.md`                                  | `prettier/prettier`, `markdown/*`, `markdown-links/*`, `markdown-preferences/*` |
| YAML          | `**/*.{yml,yaml}`                          | `prettier/prettier`                                                             |

### Linting hidden directories

ESLint's CLI walker skips dot-directories such as `.github/` when you run `eslint .`. Because the formatter blocks
above match against file paths, they will silently _not_ run on files inside `.github/` unless you pass that path to
ESLint explicitly. The recommended lint script is therefore:

```json
{
    "scripts": {
        "lint": "eslint . .github"
    }
}
```

### Customizing or disabling the formatter on a file family

Because the blocks are plain flat config, override them the same way as any other ESLint config — add a later block
whose `files` glob overlaps the one you want to change. Later blocks win.

Disable prettier formatting for JSON entirely:

```javascript
export default [
    ...baseWithPrettierConfig,
    { files: [ '**/*.json' ], rules: { 'prettier/prettier': 'off' } }
];
```

Ignore specific paths from formatting:

```javascript
export default [
    ...baseWithPrettierConfig,
    { ignores: [ 'vendor/**/*.json', 'fixtures/**/*.md' ] }
];
```

### Tweaking markdown lint rules

To override any markdown rule (from `@eslint/markdown`, `markdown-links`, or `markdown-preferences`), add a later
block — the same pattern as for any other ESLint rule:

```javascript
export default [
    ...baseWithPrettierConfig,
    {
        files: [ '**/*.md' ],
        rules: {
            'markdown/no-html': 'off',
            'markdown/fenced-code-language': [ 'error', { required: [ 'js', 'ts' ] } ],
            'markdown-links/no-dead-urls': 'error',
            'markdown-preferences/heading-casing': [ 'error', { style: 'Sentence case' } ]
        }
    }
];
```

## Limitations

- **No TOML coverage.** Prettier does not natively format `.toml` files. If you need TOML formatting, either use
  [`@enormora/eslint-config-base`](../base/base.md) (which formats TOML via dprint) or wire your own prettier plugin
  for TOML.
