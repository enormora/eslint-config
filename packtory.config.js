// @ts-check
import fs from 'node:fs/promises';
import path from 'node:path';

const projectFolder = process.cwd();
const sourcesFolder = path.join(projectFolder, 'configs');

// eslint-disable-next-line node/no-process-env -- needed
const npmToken = process.env.NPM_TOKEN;

/** @returns {Promise<import('@packtory/cli').PacktoryConfig>} */
export async function buildConfig() {
    const packageJsonContent = await fs.readFile(path.join(projectFolder, './package.json'), { encoding: 'utf8' });
    const packageJson = JSON.parse(packageJsonContent);

    if (npmToken === undefined) {
        throw new Error('Missing NPM_TOKEN environment variable');
    }

    return {
        registrySettings: { token: npmToken },
        checks: {
            noDuplicatedFiles: {
                enabled: true,
                allowList: [ path.join(projectFolder, 'LICENSE') ]
            }
        },
        commonPackageSettings: {
            sourcesFolder,
            mainPackageJson: packageJson,
            includeSourceMapFiles: true,
            additionalFiles: [
                {
                    sourceFilePath: path.join(projectFolder, 'LICENSE'),
                    targetFilePath: 'LICENSE'
                }
            ],
            additionalPackageJsonAttributes: {
                license: packageJson.license,
                repository: packageJson.repository,
                author: packageJson.author,
                contributors: packageJson.contributors
            }
        },
        packages: [
            {
                name: '@enormora/eslint-config-base',
                entryPoints: [
                    {
                        js: 'presets/base/base.js'
                    }
                ],
                additionalFiles: [
                    {
                        sourceFilePath: path.join(sourcesFolder, 'presets/base/base.md'),
                        targetFilePath: 'readme.md'
                    }
                ],
                additionalPackageJsonAttributes: {
                    description: 'Enormora’s ESLint base configuration'
                }
            },
            {
                name: '@enormora/eslint-config-base-with-prettier',
                entryPoints: [
                    {
                        js: 'presets/base-with-prettier/base-with-prettier.js'
                    }
                ],
                additionalFiles: [
                    {
                        sourceFilePath: path.join(sourcesFolder, 'presets/base-with-prettier/base-with-prettier.md'),
                        targetFilePath: 'readme.md'
                    }
                ],
                additionalPackageJsonAttributes: {
                    description: 'Enormora’s ESLint base configuration formatted with prettier'
                }
            },
            {
                name: '@enormora/eslint-config-node',
                entryPoints: [
                    {
                        js: 'presets/node/node.js'
                    }
                ],
                bundlePeerDependencies: [ '@enormora/eslint-config-base' ],
                additionalFiles: [
                    {
                        sourceFilePath: path.join(sourcesFolder, 'presets/node/node.md'),
                        targetFilePath: 'readme.md'
                    }
                ],
                additionalPackageJsonAttributes: {
                    description: 'Enormora’s ESLint node.js configuration'
                }
            },
            {
                name: '@enormora/eslint-config-typescript',
                entryPoints: [ { js: 'presets/typescript/typescript.js' } ],
                bundlePeerDependencies: [ '@enormora/eslint-config-base' ],
                additionalFiles: [
                    {
                        sourceFilePath: path.join(sourcesFolder, 'presets/typescript/typescript.md'),
                        targetFilePath: 'readme.md'
                    }
                ],
                additionalPackageJsonAttributes: {
                    description: 'Enormora’s ESLint typescript configuration'
                }
            },
            {
                name: '@enormora/eslint-config-test-base',
                entryPoints: [ { js: 'presets/test-base/test-base.js' } ],
                bundlePeerDependencies: [ '@enormora/eslint-config-base' ],
                additionalFiles: [
                    {
                        sourceFilePath: path.join(sourcesFolder, 'presets/test-base/test-base.md'),
                        targetFilePath: 'readme.md'
                    }
                ],
                additionalPackageJsonAttributes: {
                    description: 'Enormora’s shared ESLint rules for test files'
                }
            },
            {
                name: '@enormora/eslint-config-ava',
                entryPoints: [ { js: 'presets/ava/ava.js' } ],
                bundlePeerDependencies: [ '@enormora/eslint-config-base' ],
                bundleDependencies: [ '@enormora/eslint-config-test-base' ],
                additionalFiles: [
                    {
                        sourceFilePath: path.join(sourcesFolder, 'presets/ava/ava.md'),
                        targetFilePath: 'readme.md'
                    }
                ],
                additionalPackageJsonAttributes: {
                    description: 'Enormora’s ESLint ava configuration'
                }
            },
            {
                name: '@enormora/eslint-config-mocha',
                entryPoints: [ { js: 'presets/mocha/mocha.js' } ],
                bundlePeerDependencies: [ '@enormora/eslint-config-base' ],
                bundleDependencies: [ '@enormora/eslint-config-test-base' ],
                additionalFiles: [
                    {
                        sourceFilePath: path.join(sourcesFolder, 'presets/mocha/mocha.md'),
                        targetFilePath: 'readme.md'
                    }
                ],
                additionalPackageJsonAttributes: {
                    description: 'Enormora’s ESLint mocha configuration'
                }
            },
            {
                name: '@enormora/eslint-config-browser',
                entryPoints: [ { js: 'presets/browser/browser.js' } ],
                bundlePeerDependencies: [ '@enormora/eslint-config-base' ],
                additionalFiles: [
                    {
                        sourceFilePath: path.join(sourcesFolder, 'presets/browser/browser.md'),
                        targetFilePath: 'readme.md'
                    }
                ],
                additionalPackageJsonAttributes: {
                    description: 'Enormora’s ESLint browser configuration'
                }
            },
            {
                name: '@enormora/eslint-config-react',
                entryPoints: [ { js: 'presets/react/react.js' } ],
                bundlePeerDependencies: [ '@enormora/eslint-config-base' ],
                additionalFiles: [
                    {
                        sourceFilePath: path.join(sourcesFolder, 'presets/react/react.md'),
                        targetFilePath: 'readme.md'
                    }
                ],
                additionalPackageJsonAttributes: {
                    description: 'Enormora’s ESLint react configuration'
                }
            },
            {
                name: '@enormora/eslint-config-react-jsx',
                entryPoints: [ { js: 'presets/react-jsx/react-jsx.js' } ],
                bundlePeerDependencies: [ '@enormora/eslint-config-base' ],
                bundleDependencies: [ '@enormora/eslint-config-react' ],
                additionalFiles: [
                    {
                        sourceFilePath: path.join(sourcesFolder, 'presets/react-jsx/react-jsx.md'),
                        targetFilePath: 'readme.md'
                    }
                ],
                additionalPackageJsonAttributes: {
                    description: 'Enormora’s ESLint react with JSX configuration'
                }
            },
            {
                name: '@enormora/eslint-config-react-tsx',
                entryPoints: [ { js: 'presets/react-tsx/react-tsx.js' } ],
                bundlePeerDependencies: [ '@enormora/eslint-config-base', '@enormora/eslint-config-typescript' ],
                bundleDependencies: [ '@enormora/eslint-config-react-jsx' ],
                additionalFiles: [
                    {
                        sourceFilePath: path.join(sourcesFolder, 'presets/react-tsx/react-tsx.md'),
                        targetFilePath: 'readme.md'
                    }
                ],
                additionalPackageJsonAttributes: {
                    description: 'Enormora’s ESLint react with TSX and typescript configuration'
                }
            },
            {
                name: '@enormora/eslint-config-vue-ts',
                entryPoints: [ { js: 'presets/vue-ts/vue-ts.js' } ],
                bundlePeerDependencies: [ '@enormora/eslint-config-base', '@enormora/eslint-config-typescript' ],
                additionalFiles: [
                    {
                        sourceFilePath: path.join(sourcesFolder, 'presets/vue-ts/vue-ts.md'),
                        targetFilePath: 'readme.md'
                    }
                ],
                additionalPackageJsonAttributes: {
                    description: 'Enormora’s ESLint Vue with TypeScript configuration'
                }
            },
            {
                name: '@enormora/eslint-config-vitest',
                entryPoints: [ { js: 'presets/vitest/vitest.js' } ],
                bundlePeerDependencies: [ '@enormora/eslint-config-base' ],
                bundleDependencies: [ '@enormora/eslint-config-test-base' ],
                additionalFiles: [
                    {
                        sourceFilePath: path.join(sourcesFolder, 'presets/vitest/vitest.md'),
                        targetFilePath: 'readme.md'
                    }
                ],
                additionalPackageJsonAttributes: {
                    description: 'Enormora’s ESLint Vitest configuration'
                }
            },
            {
                name: '@enormora/eslint-config-aws-cdk',
                entryPoints: [ { js: 'presets/aws-cdk/aws-cdk.js' } ],
                bundlePeerDependencies: [ '@enormora/eslint-config-base', '@enormora/eslint-config-typescript' ],
                additionalFiles: [
                    {
                        sourceFilePath: path.join(sourcesFolder, 'presets/aws-cdk/aws-cdk.md'),
                        targetFilePath: 'readme.md'
                    }
                ],
                additionalPackageJsonAttributes: {
                    description: 'Enormora’s ESLint AWS CDK configuration'
                }
            }
        ]
    };
}
