/* eslint-disable @typescript-eslint/no-magic-numbers, @typescript-eslint/no-extraneous-class, restricted-syntax/no-class-declaration, @typescript-eslint/no-unused-vars, restricted-syntax/no-empty-function-body, @typescript-eslint/explicit-function-return-type */

// Named-reference-shaped parameter types and type-alias right-hand sides must
// be accepted regardless of how the reference is expressed: `typeof X`,
// `keyof typeof X`, a union of named references, or a built-in utility-type
// composition over named references. Inline structural mutable types must
// still be flagged. Lowercase-namespaced type queries such as
// `ns.member<typeof x>` (e.g. `z.infer<typeof schema>`) are intentionally
// NOT covered by the ignore pattern — when the inferred type resolves to a
// mutable shape the rule must still flag it.

declare class InMemoryApp {
    public name: string;
    public synth(): void;
}

declare class Http2SecureServer {
    public listen(): void;
}

declare class Http2Server {
    public listen(): void;
}

declare class TcpServer {
    public listen(): void;
}

declare class Uploader {
    public upload(input: string): Promise<{ ok: boolean }>;
}

declare const mutableInferenceSource: { parse(value: unknown): { value: string } };

declare namespace inferenceNamespace {
    export type infer<TSchema> = TSchema extends { parse(value: unknown): infer TInferred } ? TInferred : never;
}

// Valid: named-reference-shaped parameter types must be accepted.
export declare function takeTypeofClass(value: typeof InMemoryApp): void;
export declare function takeKeyofTypeofClass(value: keyof typeof InMemoryApp): void;
export declare function takeNamedUnion(value: Http2SecureServer | Http2Server | TcpServer): void;
export declare function takeUtilityWrapped(value: Awaited<ReturnType<Uploader['upload']>>): void;

// Invalid: lowercase-namespaced inferred types must still be flagged when the
// resolved shape is mutable.
export declare function takeMutableInference(value: inferenceNamespace.infer<typeof mutableInferenceSource>): void;

// Invalid: inline structural mutable parameter types must still be flagged.
export declare function takeInlineObject(value: { name: string; count: number }): void;
export declare function takeArrayLiteral(value: string[]): void;

// Valid: named-reference-shaped type aliases must be accepted.
export type UnderlyingServer = Http2SecureServer | Http2Server | TcpServer;
export type UploadResult = Awaited<ReturnType<Uploader['upload']>>;
export type AppConstructor = typeof InMemoryApp;
export type AppKey = keyof typeof InMemoryApp;

// Invalid: lowercase-namespaced inferred alias must still be flagged when the
// resolved shape is mutable.
export type MutableInferred = inferenceNamespace.infer<typeof mutableInferenceSource>;

// Invalid: inline structural mutable aliases must still be flagged (and the
// fixer keeps rewriting them).
export type InlineObjectAlias = { name: string; count: number };
export type ArrayAlias = string[];
