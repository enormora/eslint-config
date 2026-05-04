type Greeting = {
    readonly recipient: string;
};

export function greet(greeting: Greeting): string {
    return `Hello, ${greeting.recipient}`;
}
