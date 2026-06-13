import globals from 'globals';

export function countBrowserGlobals(): number {
    return Object.keys(globals.browser).length;
}
