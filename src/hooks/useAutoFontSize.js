// hooks/useAutoFontSize.js
import { useEffect } from "react";

export function useAutoFontSize(ref, options = {}) {
    const {
        maxFontSize = 100,
        minFontSize = 10,
        step = 1
    } = options;

    useEffect(() => {
        const el = ref.current;
        if (!el || !el.parentElement) return;

        const parent = el.parentElement;

        const resizeFont = () => {
            let fontSize = maxFontSize;
            el.style.fontSize = fontSize + "px";
            el.style.whiteSpace = "nowrap";

            // First: shrink if overflowing
            while (el.scrollWidth > parent.clientWidth && fontSize > minFontSize) {
                fontSize -= step;
                el.style.fontSize = fontSize + "px";
            }

            // Then: grow if there’s extra space
            while (
                el.scrollWidth < parent.clientWidth &&
                fontSize + step <= maxFontSize
                ) {
                fontSize += step;
                el.style.fontSize = fontSize + "px";
                if (el.scrollWidth > parent.clientWidth) {
                    fontSize -= step; // go back one step
                    el.style.fontSize = fontSize + "px";
                    break;
                }
            }
        };

        resizeFont(); // initial call

        const observer = new ResizeObserver(resizeFont);
        observer.observe(parent);

        return () => observer.disconnect();
    }, [ref, maxFontSize, minFontSize, step]);
}
