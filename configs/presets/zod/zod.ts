import type { ESLint } from 'eslint';
import zodCorePlugin from 'eslint-plugin-zod-core';
import zodMiniPlugin from 'eslint-plugin-zod-mini';
import { enormoraZodPlugin } from '../../plugins/enormora-zod/enormora-zod-plugin.ts';
import { createRestrictedImportsPlugin } from '../../rule-sets/restricted-imports.ts';
import { createRestrictedSyntaxPlugin } from '../../rule-sets/restricted-syntax.ts';

const useZodMiniOrCoreMessage = 'Use zod/mini or zod/v4/core instead.';

const regularZodImportRestriction = {
    paths: [
        { name: 'zod', message: useZodMiniOrCoreMessage },
        { name: 'zod/v4', message: useZodMiniOrCoreMessage },
        { name: 'zod/v3', message: useZodMiniOrCoreMessage }
    ]
};

const noEnumSchemaRestriction = {
    selector: "CallExpression[callee.object.name='z'][callee.property.name='enum']",
    message: 'Use a union of z.literal() schemas instead of z.enum().'
};

const noNativeEnumSchemaRestriction = {
    selector: "CallExpression[callee.object.name='z'][callee.property.name='nativeEnum']",
    message: 'Use a union of z.literal() schemas instead of z.nativeEnum().'
};

const restrictedImportsWrappers = createRestrictedImportsPlugin([ 'no-regular-zod-import' ]);
const restrictedSyntaxWrappers = createRestrictedSyntaxPlugin(
    [ 'no-enum-schema', 'no-native-enum-schema' ],
    {}
);

export const zodConfig = {
    plugins: {
        'zod-mini': zodMiniPlugin as ESLint.Plugin,
        'zod-core': zodCorePlugin as ESLint.Plugin,
        'enormora-zod': enormoraZodPlugin,
        'restricted-imports': restrictedImportsWrappers,
        'restricted-syntax-zod': restrictedSyntaxWrappers
    },
    rules: {
        'zod-mini/consistent-import': [ 'error', { syntax: 'named' } ],
        'zod-mini/consistent-import-source': [ 'error', { sources: [ 'zod/mini' ] } ],
        'zod-mini/consistent-object-schema-type': 'off',
        'zod-mini/consistent-schema-output-type-style': [ 'error', { style: 'output' } ],
        'zod-mini/consistent-schema-var-name': 'error',
        'zod-mini/no-any-schema': 'error',
        'zod-mini/no-coerce-boolean': 'error',
        'zod-mini/no-conflicting-checks': 'error',
        'zod-mini/no-duplicate-schema-methods': 'error',
        'zod-mini/no-empty-custom-schema': 'error',
        'zod-mini/no-throw-in-refine': 'error',
        'zod-mini/no-transform-in-record-key': 'error',
        'zod-mini/no-unknown-schema': 'off',
        'zod-mini/no-unnecessary-readonly': 'error',
        'zod-mini/prefer-enum-over-literal-union': 'off',
        'zod-mini/prefer-meta': 'error',
        'zod-mini/prefer-tuple-over-array-length': 'error',
        'zod-mini/require-brand-type-parameter': 'error',
        'zod-mini/require-error-message': 'error',
        'zod-mini/schema-error-property-style': 'off',

        'zod-core/consistent-import': [ 'error', { syntax: 'named' } ],
        'zod-core/consistent-schema-output-type-style': [ 'error', { style: 'output' } ],

        'enormora-zod/require-readonly-schema': 'error',

        'restricted-imports/no-regular-zod-import': [ 'error', regularZodImportRestriction ],

        'restricted-syntax-zod/no-enum-schema': [ 'error', noEnumSchemaRestriction ],
        'restricted-syntax-zod/no-native-enum-schema': [ 'error', noNativeEnumSchemaRestriction ]
    }
};
