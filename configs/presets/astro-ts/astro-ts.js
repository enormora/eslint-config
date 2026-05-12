import typescriptParser from '@typescript-eslint/parser';
import * as astroParser from 'astro-eslint-parser';
import { astroClientScriptGlobals, astroComponentGlobals, astroPluginConfig, astroRules } from '../astro/astro.js';

export const astroConfig = [
    astroPluginConfig,
    {
        files: [ '*.astro', '**/*.astro' ],
        languageOptions: {
            parser: astroParser,
            globals: astroComponentGlobals,
            parserOptions: {
                parser: typescriptParser,
                extraFileExtensions: [ '.astro' ],
                warnOnUnsupportedTypeScriptVersion: false,
                sourceType: 'module'
            }
        },
        processor: 'astro/client-side-ts',
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
    },
    {
        files: [ '*.astro/*.ts', '**/*.astro/*.ts' ],
        languageOptions: {
            parser: typescriptParser,
            globals: astroClientScriptGlobals,
            parserOptions: {
                warnOnUnsupportedTypeScriptVersion: false,
                sourceType: 'module',
                project: null
            }
        }
    }
];
