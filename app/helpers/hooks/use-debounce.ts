import { useState, useEffect, useRef } from 'react';
import { useUnmount } from './use-unmount';

export const useDebounce = (fn: Function, delay: number) => {
    const ref = useRef<ReturnType<typeof setTimeout> | null>(null);

    useUnmount(() => {
        if (ref.current) clearTimeout(ref.current);
    });

    return (...args: unknown[]) => {
        if (ref.current) clearInterval(ref.current);

        ref.current = setTimeout(() => fn(...args), delay);
    };
};
