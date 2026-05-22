import assert from 'node:assert';
import { suite, test } from 'mocha';
import { cspellSpellcheckerOptions } from '../configs/presets/base/base-shared.js';
import { withCspellWords } from '../configs/presets/base/cspell-config.js';

function cloneOptions(value) {
    if (Array.isArray(value)) {
        return value.map((item) => {
            return cloneOptions(item);
        });
    }
    if (value !== null && typeof value === 'object') {
        const result = {};
        for (const key of Object.keys(value)) {
            result[key] = cloneOptions(value[key]);
        }
        return result;
    }
    return value;
}

suite('withCspellWords helper', function () {
    test('returns a config block with the @cspell/spellchecker rule at error severity', function () {
        const block = withCspellWords([ 'enormora' ]);
        const [ severity ] = block.rules['@cspell/spellchecker'];
        assert.strictEqual(severity, 'error');
    });

    test('appends the provided words to the base cspell.words list', function () {
        const block = withCspellWords([ 'enormora', 'packtory' ]);
        const [ , options ] = block.rules['@cspell/spellchecker'];
        assert.deepStrictEqual(options.cspell.words, [ 'enormora', 'packtory' ]);
    });

    test('preserves the remaining options from the base config', function () {
        const block = withCspellWords([ 'foo' ]);
        const [ , options ] = block.rules['@cspell/spellchecker'];
        const expected = {
            ...cspellSpellcheckerOptions,
            cspell: { ...cspellSpellcheckerOptions.cspell, words: [ 'foo' ] }
        };
        assert.deepStrictEqual(options, expected);
    });

    test('does not mutate the shared base options', function () {
        const before = cloneOptions(cspellSpellcheckerOptions);
        withCspellWords([ 'mutates' ]);
        assert.deepStrictEqual(cspellSpellcheckerOptions, before);
    });

    test('exposes only the rules key so it can be spread alongside other config blocks', function () {
        const block = withCspellWords([ 'foo' ]);
        assert.deepStrictEqual(Object.keys(block), [ 'rules' ]);
    });
});
