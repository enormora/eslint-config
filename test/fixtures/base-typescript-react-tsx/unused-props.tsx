import React from 'react';

type PartiallyUsedProps = {
    readonly message: string;
    readonly unused: string;
};

type FullyUsedProps = {
    readonly message: string;
};

export function PartiallyUsed(props: PartiallyUsedProps): React.JSX.Element {
    return <span>{props.message}</span>;
}

export function FullyUsed(props: FullyUsedProps): React.JSX.Element {
    return <span>{props.message}</span>;
}

export function Forwarded(props: PartiallyUsedProps): React.JSX.Element {
    return <PartiallyUsed {...props} />;
}
