// @ts-check
import fs from 'node:fs/promises';
import path from 'node:path';

const projectFolder = process.cwd();
const sourcesFolder = path.join(projectFolder, 'target/build/configs');
const presetMarkdownFolder = path.join(projectFolder, 'configs');
const sharedSourceFiles = [
    'constants.js',
    'plugins/enormora/enormora-plugin.js',
    'plugins/enormora/prefer-ternary-for-value-selection.js',
    'plugins/restricted-syntax/no-unnecessary-arrow-function.js',
    'presets/base/base-shared.js',
    'presets/base/cspell-config.js',
    'presets/base/markdown-lint-rules.js',
    'presets/base/package-json.js',
    'presets/base/plain-text-language.js',
    'rule-sets/best-practices.js',
    'rule-sets/restricted-syntax.js',
    'rule-sets/stylistic.js'
];
const noDuplicatedFilesAllowList = [
    path.join(projectFolder, 'LICENSE'),
    ...sharedSourceFiles.flatMap(function withSourceMap(relativePath) {
        return [
            path.join(sourcesFolder, relativePath),
            path.join(sourcesFolder, `${relativePath}.map`)
        ];
    })
];
const publishingPeerDependencies = {
    eslint: '^10.0.0',
    prettier: '^3.0.0',
    typescript: '>=4.8.4 <6.1.0'
};

/**
 * @returns {Promise<import('@packtory/cli').PacktoryConfiguration>}
 */
export async function buildConfiguration() {
    const packageJsonContent = await fs.readFile(path.join(projectFolder, './package.json'), { encoding: 'utf8' });
    const packageJson = JSON.parse(packageJsonContent);
    const packtoryMainPackageJson = {
        ...packageJson,
        peerDependencies: {
            ...packageJson.peerDependencies,
            ...publishingPeerDependencies
        }
    };

    return {
        registrySettings: {
            authentication: {
                publish: { type: 'npm-open-identity-connect', provider: 'automatic' },
                metadata: 'automatic'
            }
        },
        checks: {
            noDuplicatedFiles: {
                enabled: true,
                allowList: noDuplicatedFilesAllowList
            },
            noDevelopmentDependencyImports: { enabled: true },
            noUnusedBundleDependencies: { enabled: true },
            uniqueTargetPaths: { enabled: true },
            noUnexposedExecutables: { enabled: true },
            nodeEngineCompatibility: { enabled: true },
            requiredFiles: { enabled: true, files: [ 'LICENSE', 'readme.md' ] }
        },
        commonPackageSettings: {
            sourcesFolder,
            mainPackageManifest: packtoryMainPackageJson,
            includeSourceMapFiles: true,
            publishSettings: {
                access: 'public',
                provenance: { type: 'automatic' }
            },
            additionalFiles: [
                {
                    inputFilePath: path.join(projectFolder, 'LICENSE'),
                    targetFilePath: 'LICENSE'
                }
            ],
            additionalPackageManifestAttributes: {
                license: packageJson.license,
                repository: packageJson.repository,
                author: packageJson.author,
                contributors: packageJson.contributors,
                engines: packageJson.engines
            }
        },
        packages: [
            {
                name: '@enormora/eslint-config-base',
                roots: {
                    main: {
                        javaScript: 'presets/base/base.js'
                    }
                },
                additionalFiles: [
                    {
                        inputFilePath: path.join(presetMarkdownFolder, 'presets/base/base.md'),
                        targetFilePath: 'readme.md'
                    }
                ],
                additionalPackageManifestAttributes: {
                    description: 'Enormora’s ESLint base configuration'
                }
            },
            {
                name: '@enormora/eslint-config-base-with-prettier',
                roots: {
                    main: {
                        javaScript: 'presets/base-with-prettier/base-with-prettier.js'
                    }
                },
                additionalFiles: [
                    {
                        inputFilePath: path.join(
                            presetMarkdownFolder,
                            'presets/base-with-prettier/base-with-prettier.md'
                        ),
                        targetFilePath: 'readme.md'
                    }
                ],
                additionalPackageManifestAttributes: {
                    description: 'Enormora’s ESLint base configuration formatted with prettier'
                }
            },
            {
                name: '@enormora/eslint-config-node',
                roots: {
                    main: {
                        javaScript: 'presets/node/node.js'
                    }
                },
                additionalFiles: [
                    {
                        inputFilePath: path.join(presetMarkdownFolder, 'presets/node/node.md'),
                        targetFilePath: 'readme.md'
                    }
                ],
                additionalPackageManifestAttributes: {
                    description: 'Enormora’s ESLint node.js configuration'
                }
            },
            {
                name: '@enormora/eslint-config-typescript',
                roots: { main: { javaScript: 'presets/typescript/typescript.js' } },
                bundlePeerDependencies: [ '@enormora/eslint-config-base' ],
                additionalFiles: [
                    {
                        inputFilePath: path.join(presetMarkdownFolder, 'presets/typescript/typescript.md'),
                        targetFilePath: 'readme.md'
                    }
                ],
                additionalPackageManifestAttributes: {
                    description: 'Enormora’s ESLint typescript configuration'
                }
            },
            {
                name: '@enormora/eslint-config-test-base',
                roots: { main: { javaScript: 'presets/test-base/test-base.js' } },
                bundlePeerDependencies: [ '@enormora/eslint-config-base' ],
                additionalFiles: [
                    {
                        inputFilePath: path.join(presetMarkdownFolder, 'presets/test-base/test-base.md'),
                        targetFilePath: 'readme.md'
                    }
                ],
                additionalPackageManifestAttributes: {
                    description: 'Enormora’s shared ESLint rules for test files'
                }
            },
            {
                name: '@enormora/eslint-config-node-assert',
                roots: { main: { javaScript: 'presets/node-assert/node-assert.js' } },
                additionalFiles: [
                    {
                        inputFilePath: path.join(presetMarkdownFolder, 'presets/node-assert/node-assert.md'),
                        targetFilePath: 'readme.md'
                    }
                ],
                additionalPackageManifestAttributes: {
                    description: 'Enormora’s ESLint node:assert configuration'
                }
            },
            {
                name: '@enormora/eslint-config-ava',
                roots: { main: { javaScript: 'presets/ava/ava.js' } },
                bundleDependencies: [ '@enormora/eslint-config-test-base' ],
                additionalFiles: [
                    {
                        inputFilePath: path.join(presetMarkdownFolder, 'presets/ava/ava.md'),
                        targetFilePath: 'readme.md'
                    }
                ],
                additionalPackageManifestAttributes: {
                    description: 'Enormora’s ESLint ava configuration'
                }
            },
            {
                name: '@enormora/eslint-config-ava-node-assert',
                roots: { main: { javaScript: 'presets/ava-node-assert/ava-node-assert.js' } },
                bundleDependencies: [ '@enormora/eslint-config-ava', '@enormora/eslint-config-node-assert' ],
                additionalFiles: [
                    {
                        inputFilePath: path.join(presetMarkdownFolder, 'presets/ava-node-assert/ava-node-assert.md'),
                        targetFilePath: 'readme.md'
                    }
                ],
                additionalPackageManifestAttributes: {
                    description: 'Enormora’s ESLint AVA configuration with node:assert rules'
                }
            },
            {
                name: '@enormora/eslint-config-mocha',
                roots: { main: { javaScript: 'presets/mocha/mocha.js' } },
                bundleDependencies: [ '@enormora/eslint-config-test-base' ],
                additionalFiles: [
                    {
                        inputFilePath: path.join(presetMarkdownFolder, 'presets/mocha/mocha.md'),
                        targetFilePath: 'readme.md'
                    }
                ],
                additionalPackageManifestAttributes: {
                    description: 'Enormora’s ESLint mocha configuration'
                }
            },
            {
                name: '@enormora/eslint-config-mocha-node-assert',
                roots: { main: { javaScript: 'presets/mocha-node-assert/mocha-node-assert.js' } },
                bundleDependencies: [ '@enormora/eslint-config-mocha', '@enormora/eslint-config-node-assert' ],
                additionalFiles: [
                    {
                        inputFilePath: path.join(
                            presetMarkdownFolder,
                            'presets/mocha-node-assert/mocha-node-assert.md'
                        ),
                        targetFilePath: 'readme.md'
                    }
                ],
                additionalPackageManifestAttributes: {
                    description: 'Enormora’s ESLint Mocha configuration with node:assert rules'
                }
            },
            {
                name: '@enormora/eslint-config-browser',
                roots: { main: { javaScript: 'presets/browser/browser.js' } },
                additionalFiles: [
                    {
                        inputFilePath: path.join(presetMarkdownFolder, 'presets/browser/browser.md'),
                        targetFilePath: 'readme.md'
                    }
                ],
                additionalPackageManifestAttributes: {
                    description: 'Enormora’s ESLint browser configuration'
                }
            },
            {
                name: '@enormora/eslint-config-eslint-plugin',
                roots: { main: { javaScript: 'presets/eslint-plugin/eslint-plugin.js' } },
                additionalFiles: [
                    {
                        inputFilePath: path.join(presetMarkdownFolder, 'presets/eslint-plugin/eslint-plugin.md'),
                        targetFilePath: 'readme.md'
                    }
                ],
                additionalPackageManifestAttributes: {
                    description: 'Enormora’s ESLint configuration for authoring ESLint plugins'
                }
            },
            {
                name: '@enormora/eslint-config-react',
                roots: { main: { javaScript: 'presets/react/react.js' } },
                additionalFiles: [
                    {
                        inputFilePath: path.join(presetMarkdownFolder, 'presets/react/react.md'),
                        targetFilePath: 'readme.md'
                    }
                ],
                additionalPackageManifestAttributes: {
                    description: 'Enormora’s ESLint react configuration'
                }
            },
            {
                name: '@enormora/eslint-config-react-jsx',
                roots: { main: { javaScript: 'presets/react-jsx/react-jsx.js' } },
                bundlePeerDependencies: [ '@enormora/eslint-config-base' ],
                bundleDependencies: [ '@enormora/eslint-config-react' ],
                additionalFiles: [
                    {
                        inputFilePath: path.join(presetMarkdownFolder, 'presets/react-jsx/react-jsx.md'),
                        targetFilePath: 'readme.md'
                    }
                ],
                additionalPackageManifestAttributes: {
                    description: 'Enormora’s ESLint react with JSX configuration'
                }
            },
            {
                name: '@enormora/eslint-config-react-tsx',
                roots: { main: { javaScript: 'presets/react-tsx/react-tsx.js' } },
                bundlePeerDependencies: [ '@enormora/eslint-config-base' ],
                bundleDependencies: [ '@enormora/eslint-config-react-jsx' ],
                additionalFiles: [
                    {
                        inputFilePath: path.join(presetMarkdownFolder, 'presets/react-tsx/react-tsx.md'),
                        targetFilePath: 'readme.md'
                    }
                ],
                additionalPackageManifestAttributes: {
                    description: 'Enormora’s ESLint react with TSX and typescript configuration'
                }
            },
            {
                name: '@enormora/eslint-config-vue-ts',
                roots: { main: { javaScript: 'presets/vue-ts/vue-ts.js' } },
                bundlePeerDependencies: [ '@enormora/eslint-config-typescript' ],
                additionalFiles: [
                    {
                        inputFilePath: path.join(presetMarkdownFolder, 'presets/vue-ts/vue-ts.md'),
                        targetFilePath: 'readme.md'
                    }
                ],
                additionalPackageManifestAttributes: {
                    description: 'Enormora’s ESLint Vue with TypeScript configuration'
                }
            },
            {
                name: '@enormora/eslint-config-astro',
                roots: { main: { javaScript: 'presets/astro/astro.js' } },
                additionalFiles: [
                    {
                        inputFilePath: path.join(presetMarkdownFolder, 'presets/astro/astro.md'),
                        targetFilePath: 'readme.md'
                    }
                ],
                additionalPackageManifestAttributes: {
                    description: 'Enormora’s ESLint Astro configuration',
                    engines: { node: '^26.3.0' }
                }
            },
            {
                name: '@enormora/eslint-config-astro-ts',
                roots: { main: { javaScript: 'presets/astro-ts/astro-ts.js' } },
                bundleDependencies: [ '@enormora/eslint-config-astro' ],
                additionalFiles: [
                    {
                        inputFilePath: path.join(presetMarkdownFolder, 'presets/astro-ts/astro-ts.md'),
                        targetFilePath: 'readme.md'
                    }
                ],
                additionalPackageManifestAttributes: {
                    description: 'Enormora’s ESLint Astro with TypeScript configuration',
                    engines: { node: '^26.3.0' }
                }
            },
            {
                name: '@enormora/eslint-config-vitest',
                roots: { main: { javaScript: 'presets/vitest/vitest.js' } },
                bundleDependencies: [ '@enormora/eslint-config-test-base' ],
                additionalFiles: [
                    {
                        inputFilePath: path.join(presetMarkdownFolder, 'presets/vitest/vitest.md'),
                        targetFilePath: 'readme.md'
                    }
                ],
                additionalPackageManifestAttributes: {
                    description: 'Enormora’s ESLint Vitest configuration'
                }
            },
            {
                name: '@enormora/eslint-config-vitest-node-assert',
                roots: { main: { javaScript: 'presets/vitest-node-assert/vitest-node-assert.js' } },
                bundleDependencies: [ '@enormora/eslint-config-vitest', '@enormora/eslint-config-node-assert' ],
                additionalFiles: [
                    {
                        inputFilePath: path.join(
                            presetMarkdownFolder,
                            'presets/vitest-node-assert/vitest-node-assert.md'
                        ),
                        targetFilePath: 'readme.md'
                    }
                ],
                additionalPackageManifestAttributes: {
                    description: 'Enormora’s ESLint Vitest configuration with node:assert rules'
                }
            },
            {
                name: '@enormora/eslint-config-aws-cdk',
                roots: { main: { javaScript: 'presets/aws-cdk/aws-cdk.js' } },
                bundlePeerDependencies: [ '@enormora/eslint-config-base' ],
                additionalFiles: [
                    {
                        inputFilePath: path.join(presetMarkdownFolder, 'presets/aws-cdk/aws-cdk.md'),
                        targetFilePath: 'readme.md'
                    }
                ],
                additionalPackageManifestAttributes: {
                    description: 'Enormora’s ESLint AWS CDK configuration'
                }
            },
            {
                name: '@enormora/eslint-config-zod',
                roots: { main: { javaScript: 'presets/zod/zod.js' } },
                bundlePeerDependencies: [ '@enormora/eslint-config-base' ],
                additionalFiles: [
                    {
                        inputFilePath: path.join(presetMarkdownFolder, 'presets/zod/zod.md'),
                        targetFilePath: 'readme.md'
                    }
                ],
                additionalPackageManifestAttributes: {
                    description: 'Enormora’s ESLint Zod configuration enforcing Zod Mini and Zod core'
                }
            }
        ]
    };
}
