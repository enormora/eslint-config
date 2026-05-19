import { suite, test } from 'mocha';
import { reactTsxConfig } from '../configs/presets/react-tsx/react-tsx.js';
import { checkConfigLanguageOptions } from './rules-configuration.js';

suite('react-tsx preset', function () {
    test('react-tsx preset config has the correct language options defined', function () {
        checkConfigLanguageOptions({
            configLanguageOptions: reactTsxConfig.languageOptions,
            languageOptions: {
                parserOptions: {
                    ecmaFeatures: {
                        jsx: true
                    }
                }
            }
        });
    });
});
