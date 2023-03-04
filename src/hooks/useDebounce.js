import { useEffect, useState } from 'react';

function useDebounce(value, delay) {
    const [deBounceValue, setDeBounceValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => setDeBounceValue(value), delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value]);

    return deBounceValue;
}

export default useDebounce;
