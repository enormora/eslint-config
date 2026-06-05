import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { Linter } from 'eslint';

const fixturesRoot = path.join(process.cwd(), 'test/fixtures');

export async function resolveFixture(comboName: string, filename: string) {
    const filePath = path.join(fixturesRoot, comboName, filename);
    const code = await readFile(filePath, 'utf8');
    return { filePath, code };
}

export async function lintFixture(configs: readonly unknown[], comboName: string, filename: string) {
    const { code, filePath } = await resolveFixture(comboName, filename);
    const linter = new Linter({ configType: 'flat' });
    const messages = linter.verify(code, configs as Linter.Config[], filePath);
    return { code, filePath, messages };
}

export function uniqueSortedRuleIds(messages: Linter.LintMessage[]) {
    const ruleIds = messages.map(function extractRuleId(message) {
        return message.ruleId;
    });
    const definedRuleIds = ruleIds.filter(function keepDefinedRuleId(ruleId): ruleId is string {
        return ruleId !== null && ruleId !== undefined;
    });
    return Array.from(new Set(definedRuleIds)).toSorted();
}

export function fixFixture(configs: readonly unknown[], code: string, filePath: string) {
    const linter = new Linter({ configType: 'flat' });
    return linter.verifyAndFix(code, configs as Linter.Config[], { filename: filePath });
}
