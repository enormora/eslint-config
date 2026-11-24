import markdownPlugin from '@eslint/markdown';
import type { ESLint } from 'eslint';
import markdownLinksPlugin from 'eslint-plugin-markdown-links';
import markdownPreferencesPlugin from 'eslint-plugin-markdown-preferences';
import unicornPlugin from 'eslint-plugin-unicorn';
import { disable } from '../../rule-severity.ts';

export const markdownLintPlugins: Record<string, ESLint.Plugin> = {
    markdown: markdownPlugin,
    'markdown-links': markdownLinksPlugin,
    'markdown-preferences': markdownPreferencesPlugin,
    unicorn: unicornPlugin
};

export const markdownLintRules = {
    'markdown/fenced-code-language': 'error',
    'markdown/fenced-code-meta': disable<'Fence metadata conventions depend on the consuming renderer'>(),
    'markdown/heading-increment': 'error',
    'markdown/no-bare-urls': disable<'Requires the GFM markdown language, which this preset does not use'>(),
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
    'markdown/table-column-count': disable<'Requires the GFM markdown language, which this preset does not use'>(),

    // markdown-links: external network check is opt-in to keep CI deterministic;
    // local-path and fragment checks are pure wins.
    'markdown-links/no-dead-urls': disable<'Network availability must not make lint results nondeterministic'>(),
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
    'markdown-preferences/atx-heading-closing-sequence': disable<
        'Markdown layout is handled by the active formatter'
    >(),
    'markdown-preferences/atx-heading-closing-sequence-length': disable<
        'Markdown layout is handled by the active formatter'
    >(),
    'markdown-preferences/blockquote-marker-alignment': 'error',
    'markdown-preferences/bullet-list-marker-style': disable<'Markdown layout is handled by the active formatter'>(),
    'markdown-preferences/canonical-code-block-language': disable<'Equivalent code language aliases are allowed'>(),
    'markdown-preferences/code-fence-length': disable<'Markdown layout is handled by the active formatter'>(),
    'markdown-preferences/code-fence-spacing': disable<'Markdown layout is handled by the active formatter'>(),
    'markdown-preferences/code-fence-style': disable<'Markdown layout is handled by the active formatter'>(),
    'markdown-preferences/custom-container-marker-spacing': disable<
        'Custom container syntax belongs to the consuming Markdown renderer'
    >(),
    'markdown-preferences/definitions-last': disable<'Link definitions may stay near the text that uses them'>(),
    'markdown-preferences/emoji-notation': disable<'Unicode and named emoji notation are both allowed'>(),
    'markdown-preferences/emphasis-delimiters-style': disable<'Markdown layout is handled by the active formatter'>(),
    'markdown-preferences/hard-linebreak-style': 'error',
    'markdown-preferences/heading-casing': disable<'Heading casing follows the document language and terminology'>(),
    'markdown-preferences/indent': disable<'Markdown layout is handled by the active formatter'>(),
    'markdown-preferences/level1-heading-style': disable<'Markdown layout is handled by the active formatter'>(),
    'markdown-preferences/level2-heading-style': disable<'Markdown layout is handled by the active formatter'>(),
    'markdown-preferences/link-bracket-newline': disable<'Markdown layout is handled by the active formatter'>(),
    'markdown-preferences/link-bracket-spacing': disable<'Markdown layout is handled by the active formatter'>(),
    'markdown-preferences/link-destination-style': disable<'Inline and reference link destinations are both allowed'>(),
    'markdown-preferences/link-paren-newline': disable<'Markdown layout is handled by the active formatter'>(),
    'markdown-preferences/link-paren-spacing': disable<'Markdown layout is handled by the active formatter'>(),
    'markdown-preferences/link-title-style': disable<'Equivalent link title delimiters are allowed'>(),
    'markdown-preferences/list-marker-alignment': 'error',
    'markdown-preferences/max-len': disable<'Markdown layout is handled by the active formatter'>(),
    'markdown-preferences/no-heading-trailing-punctuation': disable<'Heading punctuation may carry meaning'>(),
    'markdown-preferences/no-implicit-block-closing': 'error',
    'markdown-preferences/no-laziness-blockquotes': 'error',
    'markdown-preferences/no-multi-spaces': disable<'Markdown layout is handled by the active formatter'>(),
    'markdown-preferences/no-multiple-empty-lines': disable<'Markdown layout is handled by the active formatter'>(),
    'markdown-preferences/no-tabs': disable<'Markdown layout is handled by the active formatter'>(),
    'markdown-preferences/no-text-backslash-linebreak': 'error',
    'markdown-preferences/no-trailing-spaces': disable<'Markdown layout is handled by the active formatter'>(),
    'markdown-preferences/ordered-list-marker-sequence': disable<
        'Markdown layout is handled by the active formatter'
    >(),
    'markdown-preferences/ordered-list-marker-start': disable<'Markdown layout is handled by the active formatter'>(),
    'markdown-preferences/ordered-list-marker-style': disable<'Markdown layout is handled by the active formatter'>(),
    'markdown-preferences/padded-custom-containers': disable<
        'Custom container syntax belongs to the consuming Markdown renderer'
    >(),
    'markdown-preferences/padding-line-between-blocks': disable<'Markdown layout is handled by the active formatter'>(),
    'markdown-preferences/prefer-autolinks': disable<
        'Autofix can turn relative links into invalid CommonMark autolinks'
    >(),
    'markdown-preferences/prefer-fenced-code-blocks': 'error',
    'markdown-preferences/prefer-inline-code-words': disable<'Inline code markup depends on the meaning of the word'>(),
    'markdown-preferences/prefer-link-reference-definitions': disable<'Inline and reference links are both allowed'>(),
    'markdown-preferences/prefer-linked-words': disable<'Link label wording is left to document context'>(),
    'markdown-preferences/setext-heading-underline-length': disable<
        'Markdown layout is handled by the active formatter'
    >(),
    'markdown-preferences/sort-definitions': disable<'Link definitions may follow document order'>(),
    'markdown-preferences/strikethrough-delimiters-style': disable<
        'Markdown layout is handled by the active formatter'
    >(),
    'markdown-preferences/table-header-casing': disable<
        'Table header casing follows the document language and terminology'
    >(),
    'markdown-preferences/table-leading-trailing-pipes': disable<
        'Markdown layout is handled by the active formatter'
    >(),
    'markdown-preferences/table-pipe-alignment': disable<'Markdown layout is handled by the active formatter'>(),
    'markdown-preferences/table-pipe-spacing': disable<'Markdown layout is handled by the active formatter'>(),
    'markdown-preferences/thematic-break-character-style': disable<
        'Markdown layout is handled by the active formatter'
    >(),
    'markdown-preferences/thematic-break-length': disable<'Markdown layout is handled by the active formatter'>(),
    'markdown-preferences/thematic-break-sequence-pattern': disable<
        'Markdown layout is handled by the active formatter'
    >(),

    'unicorn/no-empty-link-text': 'error',
    'unicorn/no-javascript-url': 'error',
    'unicorn/no-leading-empty-lines': 'error'
};
