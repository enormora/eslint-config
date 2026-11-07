export function disable<Reason extends string = string>(
    ...reason: string extends Reason ? readonly [never] : Reason extends '' ? readonly [never] : readonly []
): 'off';
export function disable(): 'off' {
    return 'off';
}
