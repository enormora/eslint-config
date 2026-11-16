import type { Linter } from 'eslint';
import {
    dprintJsConfig,
    dprintJsonConfig,
    dprintPackageJsonConfig,
    dprintYamlConfig,
    dprintTomlConfig
} from './dprint.ts';
import { markdownConfig } from './markdown.ts';
import { packageJsonConfig } from './package-json.ts';
import { shellConfig } from './shell.ts';

export const baseConfig = [
    dprintJsConfig,
    dprintJsonConfig,
    packageJsonConfig,
    dprintPackageJsonConfig,
    markdownConfig,
    dprintYamlConfig,
    dprintTomlConfig,
    shellConfig
] as unknown as Linter.Config[];

/* eslint-disable no-barrel-files/no-barrel-files -- expose dprint configs and cspell helper as public API so consumers can spread or call them when customizing */
export {
    jsonDprintConfig,
    markdownDprintConfig,
    tomlDprintConfig,
    typescriptDprintConfig,
    yamlDprintConfig
} from './dprint-config.ts';
export { withCspellWords } from './cspell-config.ts';
/* eslint-enable no-barrel-files/no-barrel-files -- end of public re-exports */
