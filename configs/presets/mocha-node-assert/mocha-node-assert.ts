import type { Linter } from 'eslint';
import { mochaConfig, testSupportConfig as baseTestSupportConfig } from '../mocha/mocha.ts';
import { nodeAssertConfig } from '../node-assert/node-assert.ts';

export const mochaNodeAssertConfig = {
    ...mochaConfig,
    plugins: {
        ...mochaConfig.plugins,
        ...nodeAssertConfig.plugins
    },
    rules: {
        ...mochaConfig.rules,
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
