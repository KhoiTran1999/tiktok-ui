import { useEffect, useState } from 'react';

function useDebounce(value, delay) {
    const [debounceValue, setDebounceValue] = useState(value);
    useEffect(() => {
        const run = setTimeout(() => {
            setDebounceValue(value);
        }, delay);

        return () => clearTimeout(run);
    }, [value]);

    return debounceValue;
}

export default useDebounce;
