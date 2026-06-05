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
const originalDprintMarkdownRule = dprintPlugin.rules?.markdown;
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
    // Pinned to commonmark because @eslint/markdown@8.0.2's MarkdownSourceCode does not implement
    // getLoc() for GFM-specific nodes (autolinks, tableCell, etc.). Rules such as
    // markdown/no-bare-urls and markdown/table-column-count fire under gfm but then crash ESLint
    // 10's reporter ("Custom getLoc() method must be implemented in the subclass"). Revisit once
    // @eslint/markdown ships a fix.
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
} as Linter.Config;
