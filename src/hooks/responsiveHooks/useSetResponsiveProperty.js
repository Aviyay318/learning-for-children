import useBreakpoint from "./useBreakpoint.js";
import {useEffect} from "react";

export default function useSetResponsiveProperty(prefix) {

    const breakpoint = useBreakpoint();

    useEffect(() => {
        let widthValue = 0;
        switch (breakpoint) {
            case 'mobile':
                widthValue = `var(${prefix}-mobile)`
                break;
            case 'tablet':
                widthValue = `var(${prefix}-tablet)`
                break;
            case 'desktop':
            default:
                widthValue = `var(${prefix}-desktop)`
                break;
        }
        document.documentElement.style.setProperty(`${prefix}`, widthValue);
    }, [breakpoint]);

}