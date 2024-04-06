import { useCallback } from "react";
import debounce from "lodash.debounce";

export const useDebounce = (callback: (...args: string[]) => void, delay: number) => {
    const debounceFN = useCallback(
        debounce((...args: string[]) => callback(...args), delay), [callback, delay]
    );

    return debounceFN;
};

/*
- call this to use debounce for search directly to server
- setInputValue() is the hook to store onChange function of input
- nextValue is the event.target.value from input field

const debounceSave = useDebounce((nextValue) => setInputValue(nextValue), 1000);

- then call this function inside onChnage input field

debouncedSave(e);
*/