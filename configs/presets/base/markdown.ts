import dprintPlugin from '@ben_12/eslint-plugin-dprint';
import type { Linter, Rule } from 'eslint';
import {
    jsonDprintConfig,
    markdownDprintConfig,
    tomlDprintConfig,
    typescriptDprintConfig,
    yamlDprintConfig
} from './dprint-config.ts';
import { dprintSettings } from './dprint-formatters.ts';
import { markdownLintPlugins, markdownLintRules } from './markdown-lint-rules.ts';

// `@eslint/markdown` declares `language: 'markdown/commonmark'` for .md files, which makes ESLint
// parse them into an mdast tree (root node `type: 'root'`). The stock `dprint/markdown` rule listens
// on the ESTree selector `Program` and therefore never fires under that language, silently turning
// dprint formatting off. The adapter below wraps the original `dprint/markdown` rule and re-keys its
// visitor under the mdast `root` selector so the formatter runs in the same pass as the linters.
const originalDprintMarkdownRule = dprintPlugin.rules.markdown;
if (originalDprintMarkdownRule === undefined) {
    throw new Error('Expected dprint plugin to expose a `markdown` rule');
}
const dprintMarkdownLanguageAdapter = {
    rules: {
        markdown: {
            meta: originalDprintMarkdownRule.meta,
            create(context: Rule.RuleContext) {
                const inner = originalDprintMarkdownRule.create(context);
                return { root: inner.Program };
            }
        }
    }
};

export const markdownConfig = {
    files: [ '**/*.md' ],
    plugins: {
        ...markdownLintPlugins,
        'dprint-markdown': dprintMarkdownLanguageAdapter
    },
    // Pinned to commonmark because @eslint/markdown@9.0.0's gfm language splits autolink literals
    // into text nodes without position info. Rules such as markdown/no-invalid-label-refs then crash
    // ESLint on input like `(text)[https://example.com]`. Revisit once @eslint/markdown ships a fix.
    language: 'markdown/commonmark',
    settings: dprintSettings,
    rules: {
        'dprint-markdown/markdown': [
            'error',
            {
                config: markdownDprintConfig,
                hostConfigs: {
                    typescript: typescriptDprintConfig,
                    json: jsonDprintConfig,
                    toml: tomlDprintConfig,
                    yaml: yamlDprintConfig
                }
            }
        ],

        ...markdownLintRules
    }
} as unknown as Linter.Config;
