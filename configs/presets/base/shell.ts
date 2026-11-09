import shellPlugin from '@eslint/shell';
import type { Linter } from 'eslint';

export const shellConfig = {
    files: [ '**/*.sh' ],
    language: 'shell/posix',
    plugins: { shell: shellPlugin },
    rules: {
        'shell/no-backticks': 'error',
        'shell/no-expansions-in-single-quotes': 'error',
        'shell/no-ls-iteration': 'error',
        'shell/no-unquoted-expansions': 'error',
        'shell/no-unused-vars': 'error',
        'shell/no-useless-cat': 'error',
        'shell/no-useless-echo': 'error',
        'shell/no-variables-in-printf-format': 'error',
        'shell/require-cd-guard': 'error',
        'shell/require-read-r': 'error'
    }
} as unknown as Linter.Config;
