import { RuleTester } from '@typescript-eslint/rule-tester';
import { AST_NODE_TYPES } from '@typescript-eslint/utils';
import { suite, suiteTeardown, test } from 'mocha';
import {
    preferTernaryForValueSelectionRule
} from '../../configs/plugins/enormora/prefer-ternary-for-value-selection.ts';

RuleTester.afterAll = suiteTeardown;
RuleTester.describe = function registerSuite(suiteName: string, defineSuite: () => void): void {
    suite(suiteName, defineSuite);
};
RuleTester.it = function registerTest(testName: string, runTest: () => void): void {
    test(testName, runTest);
};
RuleTester.itOnly = function registerTestOnly(testName: string, runTest: () => void): void {
    test(testName, runTest);
};

const ruleTester = new RuleTester({
    languageOptions: { parserOptions: { ecmaVersion: 'latest', sourceType: 'module' } }
});
const expectedErrors = [ { messageId: 'preferTernary', type: AST_NODE_TYPES.IfStatement } ] as const;

ruleTester.run('prefer-ternary-for-value-selection', preferTernaryForValueSelectionRule, {
    valid: [
        'function choose(condition) { if (condition) { return first; } return second; }',
        'function choose(condition) { if (condition) return first; return second; }',
        'function choose(condition) { if (condition) { return; } return second; }',
        'function choose(condition) { if (condition) { return first; } else { return; } }',
        'function choose(condition) { if (condition) { return true; } else { return false; } }',
        'function choose(condition) { if (condition) { prepare(); return first; } else { return second; } }',
        'function choose(condition) { if (condition) { return first; } else { prepare(); return second; } }',
        'function choose(condition) { if (condition) { return first; } else { throw error; } }',
        'async function run(condition) { if (condition) { await first(); } else { await second(); } }',
        'function* run(condition) { if (condition) { yield first; } else { yield second; } }',
        'function choose(condition) { if (condition) { return first; } else if (other) { return second; } else { return third; } }',
        'function choose(condition) { if (condition) { return other ? first : second; } else { return third; } }',
        'function choose(condition) { if (other ? first : second) { return first; } else { return second; } }',
        'function choose(condition) { if (condition) { return { value: first }; } else { return { value: second }; } }',
        'function choose(condition) { if (condition) { return function () { return first; }; } else { return second; } }',
        'function choose(condition) { if (condition) { /* explain the decision */ return first; } else { return second; } }',
        'function choose(condition) { if (condition) { return first; } /* explain the decision */ else { return second; } }',
        'if (condition) { first = value; } else { second = other; }',
        'if (condition) { selected += first; } else { selected += second; }',
        'if (condition) { selected.value = first; } else { selected.value = second; }',
        'let selected; if (condition) { selected = first; }',
        'let selected = first, other = second; if (condition) { selected = third; }',
        'let selected = createDefault(); if (condition) { selected = first; }',
        'let selected = defaults.value; if (condition) { selected = first; }',
        'let selected = first; if (changeDefault()) { selected = second; }',
        'let selected = first; if (selected) { selected = second; }',
        'let selected = first; if (condition) { selected = transform(selected); }',
        'let selected = first; if (condition) { selected = (() => selected)(); }',
        'let selected = first; if (condition) { other = second; }',
        'let selected = first; /* explain the decision */ if (condition) { selected = second; }',
        'let selected = first; log(selected); if (condition) { selected = second; }',
        'function choose(condition) { if (condition) { return format(\nfirst\n); } else { return second; } }',
        'function choose(condition: boolean): string { if (condition) { return "first"; } return "second"; }'
    ],
    invalid: [
        {
            code: 'function choose(condition) { if (condition) { return first; } else { return second; } }',
            errors: expectedErrors,
            output: null
        },
        {
            code: 'function choose(condition) { if (condition) return first; else return second; }',
            errors: expectedErrors,
            output: null
        },
        {
            code: 'function choose(condition) { if (condition) { return first(); } else { return second(); } }',
            errors: expectedErrors,
            output: null
        },
        {
            code:
                'function choose(condition: boolean): string { if (condition) { return "first"; } else { return "second"; } }',
            errors: expectedErrors,
            output: null
        },
        {
            code: 'if (condition) { selected = first; } else { selected = second; }',
            errors: expectedErrors,
            output: null
        },
        {
            code: 'if (condition) selected = first(); else selected = second();',
            errors: expectedErrors,
            output: null
        },
        {
            code: 'let selected = first; if (condition) { selected = second; }',
            errors: expectedErrors,
            output: null
        },
        {
            code: 'let selected = "first"; if (condition === true) selected = createValue();',
            errors: expectedErrors,
            output: null
        },
        {
            code: 'let selected: string = "first"; if (condition) { selected = "second"; }',
            errors: expectedErrors,
            output: null
        }
    ]
});
