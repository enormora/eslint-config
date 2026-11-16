import { meta as astroParserMetadata, parseForESLint } from 'astro-eslint-parser';
import type { Linter } from 'eslint';
import astroPlugin from 'eslint-plugin-astro';
import jsxAccessibilityPlugin from 'eslint-plugin-jsx-a11y';
import globals from 'globals';
import { disable } from '../../rule-severity.ts';

export const astroComponentGlobals = {
    ...globals.node,
    ...globals.es2025,
    Astro: false,
    Fragment: false
};

export const astroClientScriptGlobals = {
    ...globals.browser,
    ...globals.es2025
};

export const astroRules = {
    'astro/missing-client-only-directive-value': 'error',
    'astro/no-conflict-set-directives': 'error',
    'astro/no-deprecated-astro-canonicalurl': 'error',
    'astro/no-deprecated-astro-fetchcontent': 'error',
    'astro/no-deprecated-astro-resolve': 'error',
    'astro/no-deprecated-getentrybyslug': 'error',
    'astro/no-exports-from-components': disable<'Component modules may expose named exports'>(),
    'astro/no-prerender-export-outside-pages': disable<
        'Page discovery depends on the consuming Astro project layout'
    >(),
    'astro/no-set-html-directive': disable<'Original rationale undocumented; retained pending review'>(),
    'astro/no-set-text-directive': disable<'Explicit text insertion directives are allowed'>(),
    'astro/no-unsafe-inline-scripts': disable<'Inline script policy depends on the consuming application'>(),
    'astro/no-unused-css-selector': disable<'CSS linting is outside the supported preset scope'>(),
    'astro/no-unused-define-vars-in-style': 'error',
    'astro/prefer-class-list-directive': disable<'Class strings and class:list directives are both allowed'>(),
    'astro/prefer-object-class-list': disable<'Array and object class lists are both allowed'>(),
    'astro/prefer-split-class-list': disable<'Class list grouping is left to readability'>(),
    'astro/semi': disable<'Semicolon formatting is handled by the active formatter'>(),
    'astro/sort-attributes': disable<'Attributes may follow domain order'>(),

    'astro/jsx-a11y/alt-text': 'error',
    'astro/jsx-a11y/anchor-ambiguous-text': disable<
        'Accessibility enforcement depends on product and UX requirements'
    >(),
    'astro/jsx-a11y/anchor-has-content': 'error',
    'astro/jsx-a11y/anchor-is-valid': 'error',
    'astro/jsx-a11y/aria-activedescendant-has-tabindex': 'error',
    'astro/jsx-a11y/aria-props': 'error',
    'astro/jsx-a11y/aria-proptypes': 'error',
    'astro/jsx-a11y/aria-role': 'error',
    'astro/jsx-a11y/aria-unsupported-elements': 'error',
    'astro/jsx-a11y/autocomplete-valid': 'error',
    'astro/jsx-a11y/click-events-have-key-events': 'error',
    'astro/jsx-a11y/control-has-associated-label': [
        disable<'Accessibility enforcement depends on product and UX requirements'>(),
        {
            ignoreElements: [ 'audio', 'canvas', 'embed', 'input', 'textarea', 'tr', 'video' ],
            ignoreRoles: [
                'grid',
                'listbox',
                'menu',
                'menubar',
                'radiogroup',
                'row',
                'tablist',
                'toolbar',
                'tree',
                'treegrid'
            ],
            includeRoles: [ 'alert', 'dialog' ]
        }
    ],
    'astro/jsx-a11y/heading-has-content': 'error',
    'astro/jsx-a11y/html-has-lang': 'error',
    'astro/jsx-a11y/iframe-has-title': 'error',
    'astro/jsx-a11y/img-redundant-alt': 'error',
    'astro/jsx-a11y/interactive-supports-focus': [
        'error',
        {
            tabbable: [ 'button', 'checkbox', 'link', 'searchbox', 'spinbutton', 'switch', 'textbox' ]
        }
    ],
    'astro/jsx-a11y/label-has-associated-control': 'error',
    'astro/jsx-a11y/lang': disable<'Accessibility enforcement depends on product and UX requirements'>(),
    'astro/jsx-a11y/media-has-caption': 'error',
    'astro/jsx-a11y/mouse-events-have-key-events': 'error',
    'astro/jsx-a11y/no-access-key': 'error',
    'astro/jsx-a11y/no-aria-hidden-on-focusable': disable<
        'Accessibility enforcement depends on product and UX requirements'
    >(),
    'astro/jsx-a11y/no-autofocus': 'error',
    'astro/jsx-a11y/no-distracting-elements': 'error',
    'astro/jsx-a11y/no-interactive-element-to-noninteractive-role': [
        'error',
        {
            tr: [ 'none', 'presentation' ],
            canvas: [ 'img' ]
        }
    ],
    'astro/jsx-a11y/no-noninteractive-element-interactions': [
        'error',
        {
            handlers: [
                'onClick',
                'onError',
                'onLoad',
                'onMouseDown',
                'onMouseUp',
                'onKeyPress',
                'onKeyDown',
                'onKeyUp'
            ],
            alert: [ 'onKeyUp', 'onKeyDown', 'onKeyPress' ],
            body: [ 'onError', 'onLoad' ],
            dialog: [ 'onKeyUp', 'onKeyDown', 'onKeyPress' ],
            iframe: [ 'onError', 'onLoad' ],
            img: [ 'onError', 'onLoad' ]
        }
    ],
    'astro/jsx-a11y/no-noninteractive-element-to-interactive-role': [
        'error',
        {
            ul: [ 'listbox', 'menu', 'menubar', 'radiogroup', 'tablist', 'tree', 'treegrid' ],
            ol: [ 'listbox', 'menu', 'menubar', 'radiogroup', 'tablist', 'tree', 'treegrid' ],
            li: [ 'menuitem', 'menuitemradio', 'menuitemcheckbox', 'option', 'row', 'tab', 'treeitem' ],
            table: [ 'grid' ],
            td: [ 'gridcell' ],
            fieldset: [ 'radiogroup', 'presentation' ]
        }
    ],
    'astro/jsx-a11y/no-noninteractive-tabindex': [
        'error',
        {
            tags: [],
            roles: [ 'tabpanel' ],
            allowExpressionValues: true
        }
    ],
    'astro/jsx-a11y/no-redundant-roles': 'error',
    'astro/jsx-a11y/no-static-element-interactions': [
        'error',
        {
            allowExpressionValues: true,
            handlers: [ 'onClick', 'onMouseDown', 'onMouseUp', 'onKeyPress', 'onKeyDown', 'onKeyUp' ]
        }
    ],
    'astro/jsx-a11y/prefer-tag-over-role': disable<
        'Accessibility enforcement depends on product and UX requirements'
    >(),
    'astro/jsx-a11y/role-has-required-aria-props': 'error',
    'astro/jsx-a11y/role-supports-aria-props': 'error',
    'astro/jsx-a11y/scope': 'error',
    'astro/jsx-a11y/tabindex-no-positive': 'error'
};

export const astroPluginConfig = {
    plugins: {
        astro: astroPlugin,
        'jsx-a11y': jsxAccessibilityPlugin
    }
};

export const astroConfig = [
    astroPluginConfig,
    {
        files: [ '*.astro', '**/*.astro' ],
        languageOptions: {
            parser: { meta: astroParserMetadata, parseForESLint },
            globals: astroComponentGlobals,
            parserOptions: {
                extraFileExtensions: [ '.astro' ],
                sourceType: 'module'
            }
        },
        processor: 'astro/astro',
        rules: astroRules
    },
    {
        files: [ '*.astro/*.js', '**/*.astro/*.js' ],
        languageOptions: {
            globals: astroClientScriptGlobals,
            parserOptions: {
                sourceType: 'module'
            }
        }
    }
] as unknown as Linter.Config[];
