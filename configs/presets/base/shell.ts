import shellPlugin from '@eslint/shell';
import type { Linter } from 'eslint';

export const shellConfig = {
    ...shellPlugin.configs.recommended,
    files: [ '**/*.sh' ],
    language: 'shell/posix'
} as unknown as Linter.Config;
