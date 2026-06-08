import { cspellSpellcheckerOptions } from './base-shared.ts';

type CspellRule = readonly ['error', {
    readonly cspell: {
        readonly words: readonly string[];
    };
}];

type CspellConfigBlock = { readonly rules: { readonly '@cspell/spellchecker': CspellRule; }; };

export function withCspellWords(words: readonly string[]): CspellConfigBlock {
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
