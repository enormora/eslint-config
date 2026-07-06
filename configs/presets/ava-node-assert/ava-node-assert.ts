import type { Linter } from 'eslint';
import { avaConfig, testSupportConfig as baseTestSupportConfig } from '../ava/ava.ts';
import { nodeAssertConfig } from '../node-assert/node-assert.ts';

export const avaNodeAssertConfig = {
    ...avaConfig,
    plugins: {
        ...avaConfig.plugins,
        ...nodeAssertConfig.plugins
    },
    rules: {
        ...avaConfig.rules,
        ...nodeAssertConfig.rules
    }
} as unknown as Linter.Config;

export const testSupportConfig = {
    ...baseTestSupportConfig,
    plugins: {
        ...baseTestSupportConfig.plugins,
        ...nodeAssertConfig.plugins
    },
    rules: {
        ...baseTestSupportConfig.rules,
        ...nodeAssertConfig.rules
    }
} as unknown as Linter.Config;
