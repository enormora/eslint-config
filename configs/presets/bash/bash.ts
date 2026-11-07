import { shellConfig } from '../base/shell.ts';

export const bashConfig = {
    ...shellConfig,
    files: [ '**/*.{sh,bash}' ],
    language: 'shell/bash'
};
