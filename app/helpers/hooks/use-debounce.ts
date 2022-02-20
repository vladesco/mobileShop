import { useEffect, useRef } from 'react';

export const useDebounce = (fn: Function, delay: number) => {
    const interval = useRef<ReturnType<typeof setTimeout>>();

    useEffect(
        () => () => {
            if (interval.current) clearTimeout(interval.current);
        },
        []
    );

    return (...args: unknown[]) => {
        if (interval.current) clearInterval(interval.current);

        interval.current = setTimeout(() => fn(...args), delay);
    };
};
