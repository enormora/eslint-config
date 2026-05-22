/* eslint-disable @typescript-eslint/no-magic-numbers */

// Consumer-style union type that includes Date as a value primitive. Date is
// a class with mutable methods, but consumers treat it as a value and must
// not be forced to wrap it as Readonly<Date> — that breaks downstream generic
// constraints such as <T extends Record<string, V>>.
type ValuePrimitive = Date | bigint | boolean | number | string | symbol | null | undefined;

// Recursive value type — mirrors the common "JSON-like but with Date" shape
// used by factories, fixtures, and builders.
type ValueShape =
    | ValuePrimitive
    | readonly ValueShape[]
    | { readonly [key: string]: ValueShape };

export declare function materialize(value: ValueShape): ValueShape;

// Each built-in mutable class must be accepted as-is in a parameter position.
export declare function takeDate(value: Date): void;
export declare function takeRegExp(value: RegExp): void;
export declare function takeUrl(value: URL): void;
export declare function takeUrlSearchParams(value: URLSearchParams): void;
export declare function takeWeakMap(value: WeakMap<object, number>): void;
export declare function takeWeakSet(value: WeakSet<object>): void;
export declare function takePromise(value: Promise<number>): void;
export declare function takeError(value: Error): void;

// Same built-ins embedded in unions must not poison the alias.
type WithRegex = RegExp | string;
type WithUrl = URL | string;
type WithPromise = Promise<number> | number;
type WithError = Error | string;

export declare function takeWithRegex(value: WithRegex): void;
export declare function takeWithUrl(value: WithUrl): void;
export declare function takeWithPromise(value: WithPromise): void;
export declare function takeWithError(value: WithError): void;

// Map and Set remain Mutable so the autofixer can rewrite them — verify the
// rule still flags them and the fix produces the readonly variants.
export declare function takeReadonlyMap(value: ReadonlyMap<string, number>): void;
export declare function takeReadonlySet(value: ReadonlySet<string>): void;
