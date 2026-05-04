import * as React from 'react';

type GreetingProps = {
    readonly recipient: string;
};

export function Greeting(props: GreetingProps): React.JSX.Element {
    return <span>{`Hello, ${props.recipient}`}</span>;
}
