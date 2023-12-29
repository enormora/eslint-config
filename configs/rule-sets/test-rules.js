import { stylisticRuleSet } from './stylistic.js';

export const testRuleSet = {
    rules: {
        '@stylistic/max-len': [
            'error',
            {
                ...stylisticRuleSet.rules['@stylistic/max-len'][1],
                ignoreStrings: true
            }
        ]
    }
};
