import {useCallback} from "react";

export function useSoundSequence() {
    const playSound = useCallback((url) => {
        return new Promise((resolve, reject) => {
            const audio = new Audio(url);
            audio.onended = resolve;
            audio.onerror = reject;
            audio.play().catch(reject);
        });
    }, []);

    return useCallback((urls) => {
        return urls.reduce((promise, url) => {
            return promise.then(() => playSound(url));
        }, Promise.resolve());
    }, [playSound]);
}
