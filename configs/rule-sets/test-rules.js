import { stylisticRuleSet } from './stylistic.js';

export const testRuleSet = {
    rules: {
        'max-len': [
            'error',
            {
                ...stylisticRuleSet.rules['@stylistic/max-len'][1],
                ignoreStrings: true
            }
        ]
    }
};
