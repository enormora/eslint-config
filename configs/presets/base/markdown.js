import dprintPlugin from '@ben_12/eslint-plugin-dprint';
import markdownPlugin from '@eslint/markdown';
import markdownLinksPlugin from 'eslint-plugin-markdown-links';
import markdownPreferencesPlugin from 'eslint-plugin-markdown-preferences';
import {
    jsonDprintConfig,
    markdownDprintConfig,
    tomlDprintConfig,
    typescriptDprintConfig,
    yamlDprintConfig
} from './dprint-config.js';
import { dprintSettings } from './dprint-formatters.js';

// `@eslint/markdown` declares `language: 'markdown/commonmark'` for .md files, which makes ESLint
// parse them into an mdast tree (root node `type: 'root'`). The stock `dprint/markdown` rule listens
// on the ESTree selector `Program` and therefore never fires under that language, silently turning
// dprint formatting off. The adapter below wraps the original `dprint/markdown` rule and re-keys its
// visitor under the mdast `root` selector so the formatter runs in the same pass as the linters.
const originalDprintMarkdownRule = dprintPlugin.rules.markdown;
const dprintMarkdownLanguageAdapter = {
    rules: {
        markdown: {
            meta: originalDprintMarkdownRule.meta,
            create(context) {
                const inner = originalDprintMarkdownRule.create(context);
                return { root: inner.Program };
            }
        }
    }
};

export const markdownConfig = {
    files: [ '**/*.md' ],
    plugins: {
        markdown: markdownPlugin,
        'markdown-links': markdownLinksPlugin,
        'markdown-preferences': markdownPreferencesPlugin,
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

        'markdown/fenced-code-language': 'error',
        'markdown/fenced-code-meta': 'off',
        'markdown/heading-increment': 'error',
        'markdown/no-bare-urls': 'error',
        'markdown/no-duplicate-definitions': 'error',
        'markdown/no-duplicate-headings': 'error',
        'markdown/no-empty-definitions': 'error',
        'markdown/no-empty-images': 'error',
        'markdown/no-empty-links': 'error',
        'markdown/no-html': 'error',
        'markdown/no-invalid-label-refs': 'error',
        'markdown/no-missing-atx-heading-space': 'error',
        'markdown/no-missing-label-refs': 'error',
        'markdown/no-missing-link-fragments': 'error',
        'markdown/no-multiple-h1': 'error',
        'markdown/no-reference-like-urls': 'error',
        'markdown/no-reversed-media-syntax': 'error',
        'markdown/no-space-in-emphasis': 'error',
        'markdown/no-unused-definitions': 'error',
        'markdown/require-alt-text': 'error',
        'markdown/table-column-count': 'error',

        // markdown-links: external network check is opt-in to keep CI deterministic;
        // local-path and fragment checks are pure wins.
        'markdown-links/no-dead-urls': 'off',
        'markdown-links/no-missing-fragments': 'error',
        'markdown-links/no-missing-path': 'error',
        'markdown-links/no-self-destination': 'error',

        // markdown-preferences: many rules overlap with dprint/markdown formatting. We enable only
        // the 8 rules from this plugin's `recommended` config (none of which fight dprint) and
        // explicitly turn the other 45 off. Override individually if a stricter style is desired.
        'markdown-preferences/atx-heading-closing-sequence': 'off',
        'markdown-preferences/atx-heading-closing-sequence-length': 'off',
        'markdown-preferences/blockquote-marker-alignment': 'error',
        'markdown-preferences/bullet-list-marker-style': 'off',
        'markdown-preferences/canonical-code-block-language': 'off',
        'markdown-preferences/code-fence-length': 'off',
        'markdown-preferences/code-fence-spacing': 'off',
        'markdown-preferences/code-fence-style': 'off',
        'markdown-preferences/custom-container-marker-spacing': 'off',
        'markdown-preferences/definitions-last': 'off',
        'markdown-preferences/emoji-notation': 'off',
        'markdown-preferences/emphasis-delimiters-style': 'off',
        'markdown-preferences/hard-linebreak-style': 'error',
        'markdown-preferences/heading-casing': 'off',
        'markdown-preferences/indent': 'off',
        'markdown-preferences/level1-heading-style': 'off',
        'markdown-preferences/level2-heading-style': 'off',
        'markdown-preferences/link-bracket-newline': 'off',
        'markdown-preferences/link-bracket-spacing': 'off',
        'markdown-preferences/link-destination-style': 'off',
        'markdown-preferences/link-paren-newline': 'off',
        'markdown-preferences/link-paren-spacing': 'off',
        'markdown-preferences/link-title-style': 'off',
        'markdown-preferences/list-marker-alignment': 'error',
        'markdown-preferences/max-len': 'off',
        'markdown-preferences/no-heading-trailing-punctuation': 'off',
        'markdown-preferences/no-implicit-block-closing': 'error',
        'markdown-preferences/no-laziness-blockquotes': 'error',
        'markdown-preferences/no-multi-spaces': 'off',
        'markdown-preferences/no-multiple-empty-lines': 'off',
        'markdown-preferences/no-tabs': 'off',
        'markdown-preferences/no-text-backslash-linebreak': 'error',
        'markdown-preferences/no-trailing-spaces': 'off',
        'markdown-preferences/ordered-list-marker-sequence': 'off',
        'markdown-preferences/ordered-list-marker-start': 'off',
        'markdown-preferences/ordered-list-marker-style': 'off',
        'markdown-preferences/padded-custom-containers': 'off',
        'markdown-preferences/padding-line-between-blocks': 'off',
        'markdown-preferences/prefer-autolinks': 'error',
        'markdown-preferences/prefer-fenced-code-blocks': 'error',
        'markdown-preferences/prefer-inline-code-words': 'off',
        'markdown-preferences/prefer-link-reference-definitions': 'off',
        'markdown-preferences/prefer-linked-words': 'off',
        'markdown-preferences/setext-heading-underline-length': 'off',
        'markdown-preferences/sort-definitions': 'off',
        'markdown-preferences/strikethrough-delimiters-style': 'off',
        'markdown-preferences/table-header-casing': 'off',
        'markdown-preferences/table-leading-trailing-pipes': 'off',
        'markdown-preferences/table-pipe-alignment': 'off',
        'markdown-preferences/table-pipe-spacing': 'off',
        'markdown-preferences/thematic-break-character-style': 'off',
        'markdown-preferences/thematic-break-length': 'off',
        'markdown-preferences/thematic-break-sequence-pattern': 'off'
    }
};
