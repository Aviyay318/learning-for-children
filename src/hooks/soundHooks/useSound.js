// useSound.js
import { useCallback } from "react";

// Module-level variable to hold the currently playing Audio instance
let currentAudio = null;

export function useSound(url) {
    return useCallback(() => {
        if (!url) return;
        // If there's already a sound playing, stop it.
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }
        // Create a new Audio instance for the new sound
        currentAudio = new Audio(url);
        currentAudio.play().catch((err) =>
            console.error("Playback error:", err)
        );
    }, [url]);
}
