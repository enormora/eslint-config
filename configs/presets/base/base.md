# `@enormora/eslint-config-base`

[![npm](https://img.shields.io/npm/v/@enormora/eslint-config-base?label=)](https://www.npmjs.com/package/@enormora/eslint-config-base)

Base ESLint config preset, agnostic to any environment, framework, or library. Targets ESM-only projects.

Code formatting is handled by [dprint](https://dprint.dev/), wired into ESLint via the
[`@ben_12/eslint-plugin-dprint`](https://www.npmjs.com/package/@ben_12/eslint-plugin-dprint) plugin. TypeScript/JavaScript
files are formatted via the `dprint/typescript` rule, and JSON, Markdown, YAML, and TOML files are formatted via
their respective `dprint/*` rules — so a single `eslint --fix` covers everything and there is no need for a separate
formatter step. The dprint configuration ships inline with this preset, so no `dprint.json` is required at the consumer
project root. If you'd rather use prettier, use [`@enormora/eslint-config-base-with-prettier`](../base-with-prettier/base-with-prettier.md)
instead — it is an alternative base preset and is not meant to be combined with this one.

Markdown files additionally get semantic linting through three language-aware plugins, all riding on
[`@eslint/markdown`](https://github.com/eslint/markdown)'s `language: "markdown/commonmark"`:

- **`@eslint/markdown`** (`markdown/*`) — heading order, missing alt text, broken link fragments, fenced-code
  language, duplicate definitions, etc. (the official ESLint markdown plugin).
- **[`eslint-plugin-markdown-links`](https://github.com/ota-meshi/eslint-plugin-markdown-links)** (`markdown-links/*`)
  — checks local file paths in markdown links/images exist on disk, that same-file `#fragment` targets exist, and
  flags self-destination links. The network-based `no-dead-urls` is off by default to keep CI deterministic; flip it
  on locally if you want it.
- **[`eslint-plugin-markdown-preferences`](https://github.com/ota-meshi/eslint-plugin-markdown-preferences)**
  (`markdown-preferences/*`) — only the 8 rules from this plugin's `recommended` config are on (blockquote alignment,
  hard-linebreak style, no-laziness blockquotes, prefer-autolinks, prefer-fenced-code-blocks, etc.). The other 45 are
  off because they overlap with dprint formatting; flip on individually if a stricter style fits your project.

`@eslint/markdown` declares `language: "markdown/commonmark"` for `.md` files, so the AST root becomes an mdast
`root` node rather than an ESTree `Program`; a small in-repo adapter wraps `dprint/markdown` so it fires on the mdast
`root` selector and runs in the same pass as the linters. The published rule is `dprint-markdown/markdown` — same
behavior, same config, just adapted to the markdown language.

(Why commonmark and not gfm? `@eslint/markdown@8.0.2`'s `MarkdownSourceCode` does not implement `getLoc()` for
GFM-specific nodes such as autolinks and table cells; under `language: "markdown/gfm"`, rules like `markdown/no-bare-urls`
and `markdown/table-column-count` crash ESLint 10's reporter. This is pinned to `commonmark` until upstream ships a
fix.)

Because `language: "markdown/commonmark"` overrides parsing for `.md` files, any later config block that targets all
files with JS-only rules (e.g. `eslint-plugin-n`) will try to run on `.md` and crash. When layering additional presets,
scope them to JS/TS files explicitly:

```javascript
import { baseConfig } from "@enormora/eslint-config-base";
import { nodeConfig } from "@enormora/eslint-config-node";

export default [
  ...baseConfig,
  { ...nodeConfig, files: ["**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}"] },
];
```

## Install & Setup

Install the `@enormora/eslint-config-base` package via npm:

```bash
npm install --save-dev @enormora/eslint-config-base
```

Create an ESLint configuration file (e.g., `eslint.config.js`) in your project and spread the base config into the
configuration array:

```javascript
import { baseConfig } from "@enormora/eslint-config-base";

export default [
  {
    ignores: ["dist/**/*"],
  },
  ...baseConfig,
];
```

`baseConfig` is an array of flat config blocks. The first block targets `**/*.{js,mjs,cjs}` and carries the lint rules.
The remaining blocks each enable one formatter or linter scoped to a default file glob:

| Block         | Files                                      | Rule(s)                                                                                |
| :------------ | :----------------------------------------- | :------------------------------------------------------------------------------------- |
| JavaScript/TS | `**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx,vue}` | `dprint/typescript`                                                                    |
| JSON          | `**/*.json`                                | `dprint/json`                                                                          |
| Markdown      | `**/*.md`                                  | `dprint-markdown/markdown`, `markdown/*`, `markdown-links/*`, `markdown-preferences/*` |
| YAML          | `**/*.{yml,yaml}`                          | `dprint/yaml`                                                                          |
| TOML          | `**/*.toml`                                | `dprint/toml`                                                                          |

### Linting hidden directories

ESLint's CLI walker skips dot-directories such as `.github/` when you run `eslint .`. Because the dprint formatter
blocks above match against file paths, they will silently _not_ run on files inside `.github/` (CI workflows, issue
templates, dependabot/renovate configs) unless you pass that path to ESLint explicitly. The recommended lint script is
therefore:

```json
{
  "scripts": {
    "lint": "eslint . .github"
  }
}
```

### Customizing or disabling a formatter

Because the formatter blocks are plain flat config, you override them the same way as any other ESLint config — by
adding a later block whose `files` glob overlaps the one you want to change. Later blocks win.

Disable a formatter entirely:

```javascript
export default [
  ...baseConfig,
  { files: ["**/*.json"], rules: { "dprint/json": "off" } },
];
```

Scope a formatter to a different path (turn the default off, then re-enable on your paths):

```javascript
export default [
  ...baseConfig,
  { files: ["**/*.json"], rules: { "dprint/json": "off" } },
  { files: ["src/**/*.json"], rules: { "dprint/json": "error" } },
];
```

Ignore specific paths from formatting:

```javascript
export default [
  ...baseConfig,
  { ignores: ["vendor/**/*.json", "fixtures/**/*.md"] },
];
```

### Tweaking markdown lint rules

To override any markdown rule (from `@eslint/markdown`, `markdown-links`, or `markdown-preferences`), add a later
block — the same pattern as for any other ESLint rule:

```javascript
export default [
  ...baseConfig,
  {
    files: ["**/*.md"],
    rules: {
      "markdown/no-html": "off",
      "markdown/fenced-code-language": ["error", { required: ["js", "ts"] }],
      // Turn the opt-in network-based dead-link check on locally:
      "markdown-links/no-dead-urls": "error",
      // Opt into a stricter formatting rule from markdown-preferences:
      "markdown-preferences/heading-casing": ["error", { style: "Sentence case" }],
    },
  },
];
```

### Tweaking dprint options

To override an individual dprint option (e.g. line width, quote style), add a later block that re-configures the rule
with your own `config`:

```javascript
import { baseConfig, typescriptDprintConfig } from "@enormora/eslint-config-base";

export default [
  ...baseConfig,
  {
    files: ["**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx,vue}"],
    rules: {
      "dprint/typescript": ["error", { config: { ...typescriptDprintConfig, lineWidth: 100 } }],
    },
  },
];
```
