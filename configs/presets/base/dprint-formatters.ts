import { fileURLToPath } from 'node:url';
import dprintJsonFormatter from '@dprint/json';
import dprintMarkdownFormatter from '@dprint/markdown';
import dprintTomlFormatter from '@dprint/toml';
import dprintTypescriptFormatter from '@dprint/typescript';

// `dprint-plugin-yaml` ships only `plugin.wasm` and `package.json` — there is no JS entry to import
// from. Packtory's dependency scanner records `import.meta.resolve('<pkg>/plugin.wasm')` call sites
// (since `@packtory/cli@0.0.31`), so this call is what makes the package land in the published
// `dependencies`. The dprint plugin reads the bytes itself when it resolves a `getPath`-shaped
// formatter, so we just hand it the path.
const dprintYamlWasmPath = fileURLToPath(import.meta.resolve('dprint-plugin-yaml/plugin.wasm'));

const dprintYamlFormatter = {
    getPath() {
        return dprintYamlWasmPath;
    }
};

export const dprintSettings = {
    '@ben_12/dprint': {
        formatters: {
            typescript: dprintTypescriptFormatter,
            json: dprintJsonFormatter,
            markdown: dprintMarkdownFormatter,
            toml: dprintTomlFormatter,
            yaml: dprintYamlFormatter
        }
    }
};
