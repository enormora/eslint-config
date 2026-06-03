import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Linter } from 'eslint';

const fixturesRoot = fileURLToPath(new URL('../fixtures/', import.meta.url));

export async function resolveFixture(comboName, filename) {
    const filePath = path.join(fixturesRoot, comboName, filename);
    const code = await readFile(filePath, 'utf8');
    return { filePath, code };
}

export async function lintFixture(configs, comboName, filename) {
    const { code, filePath } = await resolveFixture(comboName, filename);
    const linter = new Linter({ configType: 'flat' });
    const messages = linter.verify(code, configs, filePath);
    return { code, filePath, messages };
}

export function uniqueSortedRuleIds(messages) {
    const ruleIds = messages.map(function extractRuleId(message) {
        return message.ruleId;
    });
    const definedRuleIds = ruleIds.filter(function keepDefinedRuleId(ruleId) {
        return ruleId !== null && ruleId !== undefined;
    });
    return Array.from(new Set(definedRuleIds)).toSorted();
}

export function fixFixture(configs, code, filePath) {
    const linter = new Linter({ configType: 'flat' });
    return linter.verifyAndFix(code, configs, { filename: filePath });
}
