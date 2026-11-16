declare const values: Readonly<Record<string, string>>;
declare const optionalValues: Readonly<Record<string, string>> | undefined;
declare const key: string;

export const indexed = values['name'];
export const optionalIndexed = optionalValues?.['name'];
export const dotted = values.name;
export const optionalDotted = optionalValues?.name;
export const hyphenated = values['full-name'];
export const dynamic = values[key];
export const numeric = values[0];
