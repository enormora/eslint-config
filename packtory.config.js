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
                repository: packageJson.repository
            }
        },
        packages: [
            {
                name: '@enormora/eslint-config-base',
                entryPoints: [
                    {
                        js: 'base.js'
                    }
                ]
            },
            {
                name: '@enormora/eslint-config-node',
                entryPoints: [
                    {
                        js: 'node.js'
                    }
                ],
                bundlePeerDependencies: ['@enormora/eslint-config-base']
            },
            {
                name: '@enormora/eslint-config-typescript',
                entryPoints: [{ js: 'typescript.js' }],
                bundlePeerDependencies: ['@enormora/eslint-config-base']
            },
            {
                name: '@enormora/eslint-config-ava',
                entryPoints: [{ js: 'ava.js' }],
                bundlePeerDependencies: ['@enormora/eslint-config-base']
            },
            {
                name: '@enormora/eslint-config-mocha',
                entryPoints: [{ js: 'mocha.js' }],
                bundlePeerDependencies: ['@enormora/eslint-config-base']
            },
            {
                name: '@enormora/eslint-config-browser',
                entryPoints: [{ js: 'browser.js' }],
                bundlePeerDependencies: ['@enormora/eslint-config-base']
            },
            {
                name: '@enormora/eslint-config-react',
                entryPoints: [{ js: 'react.js' }],
                bundlePeerDependencies: ['@enormora/eslint-config-base']
            },
            {
                name: '@enormora/eslint-config-react-jsx',
                entryPoints: [{ js: 'react-jsx.js' }],
                bundlePeerDependencies: ['@enormora/eslint-config-base'],
                bundleDependencies: ['@enormora/eslint-config-react']
            },
            {
                name: '@enormora/eslint-config-react-tsx',
                entryPoints: [{ js: 'react-tsx.js' }],
                bundlePeerDependencies: ['@enormora/eslint-config-base', '@enormora/eslint-config-typescript'],
                bundleDependencies: ['@enormora/eslint-config-react-jsx']
            }
        ]
    };
}
