// @ts-check
import path from 'node:path';
import fs from 'node:fs/promises';

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
                        js: 'base.js'
                    }
                ],
                additionalFiles: [
                    {
                        sourceFilePath: path.join(projectFolder, 'base.md'),
                        targetFilePath: 'readme.md'
                    }
                ],
                additionalPackageJsonAttributes: {
                    description: 'Enormora’s ESLint base configuration'
                }
            },
            {
                name: '@enormora/eslint-config-node',
                entryPoints: [
                    {
                        js: 'node.js'
                    }
                ],
                bundlePeerDependencies: ['@enormora/eslint-config-base'],
                additionalFiles: [
                    {
                        sourceFilePath: path.join(projectFolder, 'node.md'),
                        targetFilePath: 'readme.md'
                    }
                ],
                additionalPackageJsonAttributes: {
                    description: 'Enormora’s ESLint node.js configuration'
                }
            },
            {
                name: '@enormora/eslint-config-typescript',
                entryPoints: [{ js: 'typescript.js' }],
                bundlePeerDependencies: ['@enormora/eslint-config-base'],
                additionalFiles: [
                    {
                        sourceFilePath: path.join(projectFolder, 'typescript.md'),
                        targetFilePath: 'readme.md'
                    }
                ],
                additionalPackageJsonAttributes: {
                    description: 'Enormora’s ESLint typescript configuration'
                }
            },
            {
                name: '@enormora/eslint-config-ava',
                entryPoints: [{ js: 'ava.js' }],
                bundlePeerDependencies: ['@enormora/eslint-config-base'],
                additionalFiles: [
                    {
                        sourceFilePath: path.join(projectFolder, 'ava.md'),
                        targetFilePath: 'readme.md'
                    }
                ],
                additionalPackageJsonAttributes: {
                    description: 'Enormora’s ESLint ava configuration'
                }
            },
            {
                name: '@enormora/eslint-config-mocha',
                entryPoints: [{ js: 'mocha.js' }],
                bundlePeerDependencies: ['@enormora/eslint-config-base'],
                additionalFiles: [
                    {
                        sourceFilePath: path.join(projectFolder, 'mocha.md'),
                        targetFilePath: 'readme.md'
                    }
                ],
                additionalPackageJsonAttributes: {
                    description: 'Enormora’s ESLint mocha configuration'
                }
            },
            {
                name: '@enormora/eslint-config-browser',
                entryPoints: [{ js: 'browser.js' }],
                bundlePeerDependencies: ['@enormora/eslint-config-base'],
                additionalFiles: [
                    {
                        sourceFilePath: path.join(projectFolder, 'browser.md'),
                        targetFilePath: 'readme.md'
                    }
                ],
                additionalPackageJsonAttributes: {
                    description: 'Enormora’s ESLint browser configuration'
                }
            },
            {
                name: '@enormora/eslint-config-react',
                entryPoints: [{ js: 'react.js' }],
                bundlePeerDependencies: ['@enormora/eslint-config-base'],
                additionalFiles: [
                    {
                        sourceFilePath: path.join(projectFolder, 'react.md'),
                        targetFilePath: 'readme.md'
                    }
                ],
                additionalPackageJsonAttributes: {
                    description: 'Enormora’s ESLint react configuration'
                }
            },
            {
                name: '@enormora/eslint-config-react-jsx',
                entryPoints: [{ js: 'react-jsx.js' }],
                bundlePeerDependencies: ['@enormora/eslint-config-base'],
                bundleDependencies: ['@enormora/eslint-config-react'],
                additionalFiles: [
                    {
                        sourceFilePath: path.join(projectFolder, 'react-jsx.md'),
                        targetFilePath: 'readme.md'
                    }
                ],
                additionalPackageJsonAttributes: {
                    description: 'Enormora’s ESLint react with JSX configuration'
                }
            },
            {
                name: '@enormora/eslint-config-react-tsx',
                entryPoints: [{ js: 'react-tsx.js' }],
                bundlePeerDependencies: ['@enormora/eslint-config-base', '@enormora/eslint-config-typescript'],
                bundleDependencies: ['@enormora/eslint-config-react-jsx'],
                additionalFiles: [
                    {
                        sourceFilePath: path.join(projectFolder, 'react-tsx.md'),
                        targetFilePath: 'readme.md'
                    }
                ],
                additionalPackageJsonAttributes: {
                    description: 'Enormora’s ESLint react with TSX and typescript configuration'
                }
            },
            {
                name: '@enormora/eslint-config-vue-ts',
                entryPoints: [{ js: 'vue-ts.js' }],
                bundlePeerDependencies: ['@enormora/eslint-config-base', '@enormora/eslint-config-typescript'],
                additionalFiles: [],
                additionalPackageJsonAttributes: {
                    description: 'Enormora’s ESLint Vue with TypeScript configuration'
                }
            },
            {
                name: '@enormora/eslint-config-vitest',
                entryPoints: [{ js: 'vitest.js' }],
                bundlePeerDependencies: ['@enormora/eslint-config-base'],
                additionalFiles: [],
                additionalPackageJsonAttributes: {
                    description: 'Enormora’s ESLint Vitest configuration'
                }
            }
        ]
    };
}
