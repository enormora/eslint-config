import type { Linter } from 'eslint';
import jsonSchemaValidatorPlugin from 'eslint-plugin-json-schema-validator';
import packageJsonPlugin from 'eslint-plugin-package-json';
import { meta as jsonParserMetadata, parseForESLint } from 'jsonc-eslint-parser';
import { disable } from '../../rule-severity.ts';

export const packageJsonConfig = {
    files: [ '**/package.json' ],
    languageOptions: { parser: { meta: jsonParserMetadata, parseForESLint } },
    plugins: {
        'package-json': packageJsonPlugin,
        'json-schema-validator': jsonSchemaValidatorPlugin
    },
    rules: {
        'package-json/no-empty-fields': 'error',
        'package-json/no-redundant-files': 'error',
        'package-json/no-redundant-publishConfig': 'error',
        'package-json/repository-shorthand': 'error',
        'package-json/require-override-restrictions': 'error',
        'package-json/restrict-dist-tags': 'error',
        'package-json/restrict-private-properties': 'error',
        'package-json/scripts-name-casing': 'error',
        'package-json/sort-collections': 'error',
        'package-json/unique-dependencies': 'error',
        'package-json/valid-author': 'error',
        'package-json/valid-bin': 'error',
        'package-json/valid-browser': 'error',
        'package-json/valid-bugs': 'error',
        'package-json/valid-bundleDependencies': 'error',
        'package-json/valid-config': 'error',
        'package-json/valid-contributors': 'error',
        'package-json/valid-cpu': 'error',
        'package-json/valid-dependencies': 'error',
        'package-json/valid-description': 'error',
        'package-json/valid-devDependencies': 'error',
        'package-json/valid-devEngines': 'error',
        'package-json/valid-directories': 'error',
        'package-json/valid-engines': 'error',
        'package-json/valid-exports': 'error',
        'package-json/valid-files': 'error',
        'package-json/valid-funding': 'error',
        'package-json/valid-gypfile': 'error',
        'package-json/valid-homepage': 'error',
        'package-json/valid-keywords': 'error',
        'package-json/valid-libc': 'error',
        'package-json/valid-license': 'error',
        'package-json/valid-main': 'error',
        'package-json/valid-man': 'error',
        'package-json/valid-module': 'error',
        'package-json/valid-name': 'error',
        'package-json/valid-optionalDependencies': 'error',
        'package-json/valid-os': 'error',
        'package-json/valid-packageManager': 'error',
        'package-json/valid-peerDependencies': 'error',
        'package-json/valid-peerDependenciesMeta': 'error',
        'package-json/valid-peerDependenciesMeta-relationship': 'error',
        'package-json/valid-private': 'error',
        'package-json/valid-publishConfig': 'error',
        'package-json/valid-repository': 'error',
        'package-json/valid-repository-directory': 'error',
        'package-json/valid-scripts': 'error',
        'package-json/valid-sideEffects': 'error',
        'package-json/valid-type': 'error',
        'package-json/valid-version': 'error',
        'package-json/valid-workspaces': 'error',

        'package-json/bin-name-casing': disable<'Executable names may follow external command conventions'>(),
        'package-json/consistent-package-manager-declaration': disable<
            'Package manager declaration strategy belongs to the consuming project'
        >(),
        'package-json/consistent-property-aliases': disable<'Supported package metadata aliases are allowed'>(),
        'package-json/exports-subpaths-style': disable<'Equivalent export subpath layouts are allowed'>(),
        'package-json/no-local-dependencies': disable<
            'Local dependencies are allowed for workspaces and development'
        >(),
        'package-json/order-properties': disable<'Package properties may follow project conventions'>(),
        'package-json/prefer-rolling-workspace-spec': disable<
            'Workspace version range policy belongs to the consuming project'
        >(),
        'package-json/prefer-scoped-name': disable<'Unscoped package names are allowed'>(),
        'package-json/require-attribution': disable<
            'Author and contributor attribution requirements depend on the consuming project'
        >(),
        'package-json/require-author': disable<'The author field is not required for every package'>(),
        'package-json/require-bin': disable<'The bin field is not required for every package'>(),
        'package-json/require-browser': disable<'The browser field is not required for every package'>(),
        'package-json/require-bugs': disable<'The bugs field is not required for every package'>(),
        'package-json/require-bundleDependencies': disable<
            'The bundleDependencies field is not required for every package'
        >(),
        'package-json/require-config': disable<'The config field is not required for every package'>(),
        'package-json/require-contributors': disable<'The contributors field is not required for every package'>(),
        'package-json/require-cpu': disable<'The cpu field is not required for every package'>(),
        'package-json/require-dependencies': disable<'The dependencies field is not required for every package'>(),
        'package-json/require-description': disable<'The description field is not required for every package'>(),
        'package-json/require-devDependencies': disable<
            'The devDependencies field is not required for every package'
        >(),
        'package-json/require-devEngines': disable<'The devEngines field is not required for every package'>(),
        'package-json/require-directories': disable<'The directories field is not required for every package'>(),
        'package-json/require-engines': disable<'The engines field is not required for every package'>(),
        'package-json/require-exports': disable<'The exports field is not required for every package'>(),
        'package-json/require-files': disable<'The files field is not required for every package'>(),
        'package-json/require-funding': disable<'The funding field is not required for every package'>(),
        'package-json/require-gypfile': disable<'The gypfile field is not required for every package'>(),
        'package-json/require-homepage': disable<'The homepage field is not required for every package'>(),
        'package-json/require-keywords': disable<'The keywords field is not required for every package'>(),
        'package-json/require-libc': disable<'The libc field is not required for every package'>(),
        'package-json/require-license': disable<'The license field is not required for every package'>(),
        'package-json/require-main': disable<'The main field is not required for every package'>(),
        'package-json/require-man': disable<'The man field is not required for every package'>(),
        'package-json/require-module': disable<'The module field is not required for every package'>(),
        'package-json/require-name': disable<'The name field is not required for every package'>(),
        'package-json/require-optionalDependencies': disable<
            'The optionalDependencies field is not required for every package'
        >(),
        'package-json/require-os': disable<'The os field is not required for every package'>(),
        'package-json/require-packageManager': disable<'The packageManager field is not required for every package'>(),
        'package-json/require-package-json-export': disable<
            'Packages need not expose package.json through their exports map'
        >(),
        'package-json/require-peerDependencies': disable<
            'The peerDependencies field is not required for every package'
        >(),
        'package-json/require-peerDependenciesMeta': disable<
            'The peerDependenciesMeta field is not required for every package'
        >(),
        'package-json/require-private': disable<'The private field is not required for every package'>(),
        'package-json/require-publishConfig': disable<'The publishConfig field is not required for every package'>(),
        'package-json/require-repository': disable<'The repository field is not required for every package'>(),
        'package-json/require-scripts': disable<'The scripts field is not required for every package'>(),
        'package-json/require-sideEffects': disable<'The sideEffects field is not required for every package'>(),
        'package-json/require-type': disable<'The type field is not required for every package'>(),
        'package-json/require-types': disable<'The types field is not required for every package'>(),
        'package-json/require-version': disable<'The version field is not required for every package'>(),
        'package-json/restrict-dependency-ranges': disable<
            'Dependency range policy belongs to the consuming project'
        >(),
        'package-json/restrict-top-level-properties': disable<'Project-specific package metadata is allowed'>(),
        'package-json/specify-peers-locally': disable<
            'Peer dependency installation strategy belongs to the consuming project'
        >(),

        'json-schema-validator/no-invalid': 'error'
    }
} as unknown as Linter.Config;
