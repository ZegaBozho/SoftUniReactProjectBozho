
import { useEffect, useState } from "react";

export const useLocalStorage = (key, defaultValue) => {
    const [state, setState] = useState(defaultValue);

    useEffect( () => {
         const persistedSerializedState = localStorage.getItem(key);
         if (persistedSerializedState) {
            const persistedState = JSON.parse(persistedSerializedState);
            setState(persistedState);
         }
    }, []);
    
    const setLocalStorage = (value) => {
        setState(value);
        localStorage.setItem(key, JSON.stringify(value));
    }
    return [
        state,
        setLocalStorage
    ]
};