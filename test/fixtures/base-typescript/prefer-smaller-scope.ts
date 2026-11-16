type FunctionOnlyText = string;

export function formatText(enabled: boolean): string {
    const functionOnlyText: FunctionOnlyText = 'ready';
    const enabledMessage = 'enabled';
    if (enabled) {
        return enabledMessage;
    }

    return functionOnlyText;
}
