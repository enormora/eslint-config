import { useEffect, useState } from 'react';

type ItemListProps = {
    items: string[];
    showHeader?: boolean;
};

export function badcomponent({ items, showHeader }: ItemListProps) {
    const [count, setCount] = useState(0);

    if (showHeader) {
        useEffect(() => {
            setCount(items.length);
        }, []);
    }

    return (
        <>
            <h1>Item List</h1>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <a target='_blank' href='https://example.com'>External</a>
            <ul>
                {items.map((item, index) => (
                    <li>{item}</li>
                ))}
            </ul>
            {showHeader && <span>Count: {count}</span>}
            <div role='button' tabIndex='0'>{undefined}</div>
            <CustomThing customProp='hi' isActive />
        </>
    );
}

function CustomThing({ customProp, isActive }: { customProp: string; isActive: boolean }) {
    return <span>{customProp}{isActive ? '!' : ''}</span>;
}
