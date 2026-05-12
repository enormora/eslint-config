import * as astroParser from 'astro-eslint-parser';
import astroPlugin from 'eslint-plugin-astro';
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
    'astro/no-exports-from-components': 'error',
    'astro/no-prerender-export-outside-pages': 'error',
    'astro/no-set-html-directive': 'error',
    'astro/no-set-text-directive': 'error',
    'astro/no-unsafe-inline-scripts': [
        'error',
        {
            allowDefineVars: false,
            allowModuleScripts: false,
            allowNonce: true,
            allowNonExecutingTypes: []
        }
    ],
    'astro/no-unused-css-selector': 'error',
    'astro/no-unused-define-vars-in-style': 'error',
    'astro/prefer-class-list-directive': 'error',
    'astro/prefer-object-class-list': 'error',
    'astro/prefer-split-class-list': [ 'error', { splitLiteral: true } ],
    'astro/semi': 'off',
    'astro/sort-attributes': 'off',
    'astro/valid-compile': 'error',

    'astro/jsx-a11y/alt-text': 'error',
    'astro/jsx-a11y/anchor-ambiguous-text': 'error',
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
        'error',
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
            tabbable: [
                'button',
                'checkbox',
                'link',
                'progressbar',
                'searchbox',
                'slider',
                'spinbutton',
                'switch',
                'textbox'
            ]
        }
    ],
    'astro/jsx-a11y/label-has-associated-control': 'error',
    'astro/jsx-a11y/lang': 'error',
    'astro/jsx-a11y/media-has-caption': 'error',
    'astro/jsx-a11y/mouse-events-have-key-events': 'error',
    'astro/jsx-a11y/no-access-key': 'error',
    'astro/jsx-a11y/no-aria-hidden-on-focusable': 'error',
    'astro/jsx-a11y/no-autofocus': 'error',
    'astro/jsx-a11y/no-distracting-elements': 'error',
    'astro/jsx-a11y/no-interactive-element-to-noninteractive-role': 'error',
    'astro/jsx-a11y/no-noninteractive-element-interactions': [
        'error',
        {
            body: [ 'onError', 'onLoad' ],
            iframe: [ 'onError', 'onLoad' ],
            img: [ 'onError', 'onLoad' ]
        }
    ],
    'astro/jsx-a11y/no-noninteractive-element-to-interactive-role': 'error',
    'astro/jsx-a11y/no-noninteractive-tabindex': 'error',
    'astro/jsx-a11y/no-redundant-roles': 'error',
    'astro/jsx-a11y/no-static-element-interactions': 'error',
    'astro/jsx-a11y/prefer-tag-over-role': 'error',
    'astro/jsx-a11y/role-has-required-aria-props': 'error',
    'astro/jsx-a11y/role-supports-aria-props': 'error',
    'astro/jsx-a11y/scope': 'error',
    'astro/jsx-a11y/tabindex-no-positive': 'error'
};

export const astroPluginConfig = {
    plugins: {
        astro: astroPlugin
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
];
