import typescriptParser from '@typescript-eslint/parser';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import { createNodeResolver } from 'eslint-plugin-import-x';
import { javascriptExtensions, typescriptExtensions } from '../../constants.ts';

export const typescriptLanguageOptions = {
    parser: typescriptParser,
    parserOptions: {
        warnOnUnsupportedTypeScriptVersion: false,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: false,
            globalReturn: false
        },
        projectService: true
    }
};

export const typescriptSettings = {
    'import/parsers': {
        '@typescript-eslint/parser': typescriptExtensions
    },
    'import-x/resolver-next': [
        createNodeResolver({
            extensions: [ ...javascriptExtensions, ...typescriptExtensions ]
        }),
        createTypeScriptImportResolver()
    ],
    // The upstream defaults in `is-immutable-type` classify Date, URL,
    // and URLSearchParams as Mutable, which poisons any union, record,
    // or recursive value type that mentions them. We promote them — and
    // a few more value-like built-ins — to ReadonlyShallow so consumers
    // can use them without a Readonly<T> wrapper. Map and Set stay
    // Mutable (via the upstream defaults) so the autofixer keeps
    // rewriting them to ReadonlyMap/ReadonlySet.
    immutability: {
        overrides: [
            { type: { from: 'lib', name: 'Date' }, to: 'ReadonlyShallow' },
            { type: { from: 'lib', name: 'RegExp' }, to: 'ReadonlyShallow' },
            { type: { from: 'lib', name: 'URL' }, to: 'ReadonlyShallow' },
            { type: { from: 'lib', name: 'URLSearchParams' }, to: 'ReadonlyShallow' },
            { type: { from: 'lib', name: 'WeakMap' }, to: 'ReadonlyShallow' },
            { type: { from: 'lib', name: 'WeakSet' }, to: 'ReadonlyShallow' },
            { type: { from: 'lib', name: 'Promise' }, to: 'ReadonlyShallow' },
            { type: { from: 'lib', name: 'Error' }, to: 'ReadonlyShallow' }
        ]
    }
};
