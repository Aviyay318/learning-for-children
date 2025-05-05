// src/components/ResponsiveLayoutWrapper.jsx
import { useResponsive } from "../contexts/ResponsiveContext";

export default function LayoutWrapper({ children }) {
    const { scale, designWidth, designHeight } = useResponsive();

    return (
        <div
            style={{
                width: "100vw",
                height: "100vh",
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                backgroundColor: "#fff", // optional background
            }}
        >
            <div
                style={{
                    width: `${designWidth}px`,
                    height: `${designHeight}px`,
                    transform: `scale(${scale})`,
                    transformOrigin: "top center",
                    position: "relative",
                }}
            >
                {children}
            </div>
        </div>
    );
}
