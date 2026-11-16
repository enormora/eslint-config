export async function returnsBeforeCatch(): Promise<string> {
    try {
        return Promise.reject(new Error('failure'));
    } catch {
        return 'fallback';
    }
}

export async function awaitsBeforeCatch(): Promise<string> {
    try {
        return await Promise.reject(new Error('failure'));
    } catch {
        return 'fallback';
    }
}

export async function returnsDirectly(): Promise<string> {
    return Promise.resolve('ready');
}
