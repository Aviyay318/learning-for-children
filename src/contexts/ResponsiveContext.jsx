import React, { createContext, useContext, useMemo } from "react";
import useWindowSize from "../hooks/responsiveHooks/useWindowSize";

const ResponsiveContext = createContext();

export const ResponsiveProvider = ({ children }) => {
    const { width, height } = useWindowSize();
    const designWidth = 1920;
    const designHeight = 1080;

    const scale = useMemo(() => {
        return Math.min(1, width / designWidth, height / designHeight);
    }, [width, height, designWidth, designHeight]);

    const value = useMemo(() => ({
        width,
        height,
        scale,
        designWidth,
        designHeight,
    }), [width, height, scale]);

    return (
        <ResponsiveContext.Provider value={value}>
            {children}
        </ResponsiveContext.Provider>
    );
};

export const useResponsive = () => useContext(ResponsiveContext);
