type Entry = { readonly id: number };

export function compareObjects(left: Entry, right: Entry): boolean { return left < right; }
export function compareFraction(value: number): boolean { return 0.1 + 0.2 === value; }
export function compareNumericText(value: string): boolean { return '10' < value; }
export const compareSymbols = Symbol('entry') === Symbol('entry');
export function findFreshEntry(entries: Entry[]): boolean { return entries.includes({ id: 1 }); }
export function findFreshKey(entries: Map<Entry, string>): string | undefined { return entries.get({ id: 1 }); }
export function compareNan(value: number): boolean { return value === Number.NaN; }
export function compareSelf(value: number): boolean { return value === value; }

export function sameEntry(left: Entry, right: Entry): boolean { return left === right; }
export function findExistingEntry(entries: Entry[], entry: Entry): boolean { return entries.includes(entry); }
export function findExistingKey(entries: Map<Entry, string>, entry: Entry): string | undefined { return entries.get(entry); }
export function compareDates(left: Date, right: Date): boolean { return left < right; }
export function compareIntegers(value: number): boolean { return 1 + 2 === value; }
export function compareText(left: string, right: string): boolean { return left < right; }
export function compareJson(left: Entry, right: Entry): boolean { return JSON.stringify(left) === JSON.stringify(right); }
export function storeObjectKey(entries: Map<Entry, string>, entry: Entry): Map<Entry, string> { return entries.set(entry, 'value'); }
