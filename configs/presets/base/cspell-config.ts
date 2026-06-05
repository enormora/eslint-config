import { cspellSpellcheckerOptions } from './base-shared.ts';

export function withCspellWords(words: readonly string[]) {
    return {
        rules: {
            '@cspell/spellchecker': [
                'error',
                {
                    ...cspellSpellcheckerOptions,
                    cspell: {
                        ...cspellSpellcheckerOptions.cspell,
                        words: [ ...cspellSpellcheckerOptions.cspell.words, ...words ]
                    }
                }
            ]
        }
    };
}
