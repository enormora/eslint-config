import markdownPlugin from '@eslint/markdown';
import type { ESLint } from 'eslint';
import markdownLinksPlugin from 'eslint-plugin-markdown-links';
import markdownPreferencesPlugin from 'eslint-plugin-markdown-preferences';

export const markdownLintPlugins: Record<string, ESLint.Plugin> = {
    markdown: markdownPlugin,
    'markdown-links': markdownLinksPlugin,
    'markdown-preferences': markdownPreferencesPlugin
};

export const markdownLintRules = {
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
    // Allow the three GFM task-list checkbox markers (`[ ]`, `[x]`, `[X]`). The commonmark
    // language has no concept of task lists, so the rule otherwise reports the checkbox content
    // as a missing label reference.
    'markdown/no-missing-label-refs': [ 'error', { allowLabels: [ '', 'x', 'X' ] } ],
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

    // markdown-preferences: many rules overlap with the active markdown formatter (dprint or
    // prettier, depending on which base preset is used). We enable only 7 rules from this
    // plugin's `recommended` config (none of which fight either formatter) and explicitly turn
    // the other 46 off. Override individually if a stricter style is desired.
    //
    // `prefer-autolinks` is intentionally disabled even though it is in `recommended`: its
    // autofix rewrites any `[x](x)` to `<x>` without checking whether the URL has a scheme.
    // CommonMark autolinks require an absolute URI, so a relative link like `[foo.md](foo.md)`
    // becomes `<foo.md>`, which GitHub renders as an empty HTML tag (the link disappears).
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
    'markdown-preferences/prefer-autolinks': 'off',
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
};
