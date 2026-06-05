import * as astroParser from 'astro-eslint-parser';
import type { Linter } from 'eslint';
import astroPlugin from 'eslint-plugin-astro';
import jsxAccessibilityPlugin from 'eslint-plugin-jsx-a11y';
import globals from 'globals';

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
    'astro/no-exports-from-components': 'off',
    'astro/no-prerender-export-outside-pages': 'off',
    'astro/no-set-html-directive': 'off',
    'astro/no-set-text-directive': 'off',
    'astro/no-unsafe-inline-scripts': 'off',
    'astro/no-unused-css-selector': 'off',
    'astro/no-unused-define-vars-in-style': 'error',
    'astro/prefer-class-list-directive': 'off',
    'astro/prefer-object-class-list': 'off',
    'astro/prefer-split-class-list': 'off',
    'astro/semi': 'off',
    'astro/sort-attributes': 'off',
    'astro/valid-compile': 'error',

    'astro/jsx-a11y/alt-text': 'error',
    'astro/jsx-a11y/anchor-ambiguous-text': 'off',
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
        'off',
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
    'astro/jsx-a11y/lang': 'off',
    'astro/jsx-a11y/media-has-caption': 'error',
    'astro/jsx-a11y/mouse-events-have-key-events': 'error',
    'astro/jsx-a11y/no-access-key': 'error',
    'astro/jsx-a11y/no-aria-hidden-on-focusable': 'off',
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
            li: [
                'menuitem',
                'menuitemradio',
                'menuitemcheckbox',
                'option',
                'row',
                'tab',
                'treeitem'
            ],
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
    'astro/jsx-a11y/prefer-tag-over-role': 'off',
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
            parser: astroParser,
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
