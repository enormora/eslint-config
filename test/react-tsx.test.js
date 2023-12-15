import test from 'ava';
import { reactTsxConfig } from '../configs/react-tsx.js';
import { checkConfigLanguageOptions } from './rules-configuration.js';

test('react-tsx preset config has the correct language options defined', checkConfigLanguageOptions, {
    configLanguageOptions: reactTsxConfig.languageOptions,
    languageOptions: {
        parserOptions: {
            ecmaFeatures: {
                jsx: true
            }
        }
    }
});
