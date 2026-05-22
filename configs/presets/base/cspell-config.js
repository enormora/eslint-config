import { cspellSpellcheckerOptions } from './base-shared.js';

export function withCspellWords(words) {
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
