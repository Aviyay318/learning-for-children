import React, {useEffect, useRef, useState} from "react";
import defaultCursor from "/cursors/default_cursor.png";
import pointerCursor from "/cursors/pointer_cursor.png";
import pencilCursor from "/cursors/pencil_cursor.png";
import eraserCursor from "/cursors/eraser_cursor.png";
import textCursor from "/cursors/text_cursor.png";
import "./CustomCursor.css";

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [cursorType, setCursorType] = useState("default");
    const [isClicked, setIsClicked] = useState(false);
    const cursorRef = useRef(null);
    const [cursorSize, setCursorSize] = useState(64);

    useEffect(() => {
        const updateCursor = (e) => {
            const x = e.clientX;
            const y = e.clientY;
            setPosition({ x, y });

            const el = document.elementFromPoint(x, y);
            if (!el) return setCursorType("default");

            const isInput = el.tagName === "INPUT" || el.tagName === "TEXTAREA";
            const isPointer =
                el.tagName === "A" ||
                el.tagName === "BUTTON" ||
                el.getAttribute("role") === "button" ||
                el.closest(".clickable") ||
                el.hasAttribute("data-clickable") ||
                el.onclick;
            console.log("Hovered element:", el);
            console.log("Is pointer?", isPointer);

            const canvasParent = el.closest(".canvas-content");
            const canvasTool = canvasParent?.getAttribute("data-tool");
            const penSize = parseInt(canvasParent?.getAttribute("data-pen-size"), 10);
            const eraserSize = parseInt(canvasParent?.getAttribute("data-eraser-size"), 10);

            if (isInput) {
                setCursorType("text");
                setCursorSize(32);
            } else if (canvasTool === "pen") {
                setCursorType("pencil");
                setCursorSize(penSize * 5); // optional scale-up factor
            } else if (canvasTool === "eraser") {
                setCursorType("eraser");
                setCursorSize(eraserSize * 2); // optional scale-up factor
            } else if (isPointer) {
                setCursorType("pointer");
                setCursorSize(32); // reset size
            } else {
                setCursorType("default");
                setCursorSize(32);
            }
        };

        window.addEventListener("mousemove", updateCursor);
        return () => window.removeEventListener("mousemove", updateCursor);
    }, []);

    useEffect(() => {
        const handleClick = () => {
            setIsClicked(true);
            setTimeout(() => setIsClicked(false), 150); // quick reset
        };

        window.addEventListener("mousedown", handleClick);
        return () => window.removeEventListener("mousedown", handleClick);
    }, []);

    if (cursorType === "none") return null;

    const getCursorImage = () => {
        switch (cursorType) {
            case "pointer": return pointerCursor;
            case "pencil": return pencilCursor;
            case "eraser": return eraserCursor;
            case "text": return textCursor;
            default: return defaultCursor;
        }
    };

    return (
        <img
            ref={cursorRef}
            src={getCursorImage()}
            className={`custom-cursor ${cursorType} ${
                isClicked && (cursorType === "default" || cursorType === "pointer")
                    ? "click-effect"
                    : ""
            }`}
            style={{ left: position.x, top: position.y, width: cursorSize, height: cursorSize }}
            alt=""
        />

    );
}
