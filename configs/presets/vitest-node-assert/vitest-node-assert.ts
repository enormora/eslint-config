import type { Linter } from 'eslint';
import { nodeAssertConfig } from '../node-assert/node-assert.ts';
import { testSupportConfig as baseTestSupportConfig, vitestConfig } from '../vitest/vitest.ts';

export const vitestNodeAssertConfig = {
    ...vitestConfig,
    plugins: {
        ...vitestConfig.plugins,
        ...nodeAssertConfig.plugins
    },
    rules: {
        ...vitestConfig.rules,
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
