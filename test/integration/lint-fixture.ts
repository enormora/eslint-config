import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { Linter } from 'eslint';

const fixturesRoot = path.join(process.cwd(), 'test/fixtures');

type ResolvedFixture = { readonly filePath: string; readonly code: string; };
type LintedFixture = {
    readonly code: string;
    readonly filePath: string;
    readonly messages: readonly Linter.LintMessage[];
};

export async function resolveFixture(comboName: string, filename: string): Promise<ResolvedFixture> {
    const filePath = path.join(fixturesRoot, comboName, filename);
    const code = await readFile(filePath, 'utf8');
    return { filePath, code };
}

export async function lintFixture(
    configs: readonly unknown[],
    comboName: string,
    filename: string
): Promise<LintedFixture> {
    const { code, filePath } = await resolveFixture(comboName, filename);
    const linter = new Linter({ configType: 'flat' });
    const messages = linter.verify(code, configs as Linter.Config[], filePath);
    return { code, filePath, messages };
}

export function uniqueSortedRuleIds(messages: readonly Linter.LintMessage[]): readonly string[] {
    const ruleIds = messages.map(function extractRuleId(message) {
        return message.ruleId;
    });
    const definedRuleIds = ruleIds.filter(function keepDefinedRuleId(ruleId): ruleId is string {
        return ruleId !== null;
    });
    return Array.from(new Set(definedRuleIds)).toSorted(function compareLocale(left, right) {
        return left.localeCompare(right);
    });
}

export function fixFixture(
    configs: readonly unknown[],
    code: string,
    filePath: string
): Linter.FixReport {
    const linter = new Linter({ configType: 'flat' });
    return linter.verifyAndFix(code, configs as Linter.Config[], { filename: filePath });
}
