/* eslint-disable @typescript-eslint/no-magic-numbers, @typescript-eslint/no-extraneous-class, restricted-syntax/no-class-declaration, @typescript-eslint/no-unused-vars, restricted-syntax/no-empty-function-body, @typescript-eslint/explicit-function-return-type */

// Named class/interface references stand in for third-party types such as
// `sinon.SinonSpy`, `aws-cdk-lib.App`, `aws-cdk-lib.Stage`, or `constructs.Construct`.
// Their public members are not declared `readonly` upstream, so a purely
// structural `ReadonlyShallow` check rejects them. The rule must mimic the
// behavior of the deprecated `functional/prefer-readonly-type` here and let
// named class/interface references pass while still flagging inline mutable
// types.

declare class ThirdPartySpy<TArgs extends readonly unknown[], TReturn> {
    public callCount: number;
    public calledWith(...args: TArgs): boolean;
    public returnValue(value: TReturn): void;
}

declare class ThirdPartyApp {
    public name: string;
    public synth(): void;
}

declare class ThirdPartyConstruct {
    public node: ThirdPartyApp;
    public addChild(child: ThirdPartyConstruct): void;
}

interface ThirdPartyHandle {
    label: string;
    invoke(): void;
}

// Valid: named class/interface references in parameter position must be accepted.
export declare function takeSpy(value: ThirdPartySpy<readonly [number], string>): void;
export declare function takeApp(value: ThirdPartyApp): void;
export declare function takeConstruct(value: ThirdPartyConstruct): void;
export declare function takeHandle(value: ThirdPartyHandle): void;
export declare function takeGenericContainer(value: ThirdPartySpy<readonly [string], number>): void;

// Invalid: inline mutable structural types must still be flagged.
export declare function takeArray(value: string[]): void;
export declare function takeTuple(value: [number, string]): void;
export declare function takeObjectLiteral(value: { name: string; count: number }): void;
export declare function takeMap(value: Map<string, number>): void;
export declare function takeSet(value: Set<string>): void;
