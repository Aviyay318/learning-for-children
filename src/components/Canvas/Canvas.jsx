import {useEffect, useRef, useState} from "react";
import { Stage, Layer, Line, Text } from 'react-konva';
import "./Canvas.css";
import PencilIcon from "/src/assets/images/Canvas/pencil.png";
import EraserIcon from "/src/assets/images/Canvas/eraser.png";
import ColorChooser from "/src/assets/images/Canvas/color_chooser.png";
import { HexColorPicker } from "react-colorful";

export default function Canvas({ text }) {
    const [tool, setTool] = useState("pen");
    const [penSize, setPenSize] = useState(5);
    const [penColor, setColor] = useState("#000");
    const [colorChooserVisible, setColorChooserVisible] = useState(false);
    const [eraserSize, setEraserSize] = useState(20);
    const [lines, setLines] = useState([]);
    const isDrawing = useRef(false);

    const containerRef = useRef();
    const [size, setSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        if (!containerRef.current) return;
        // create the observer
        const observer = new ResizeObserver(entries => {
            for (let entry of entries) {
                const { width, height } = entry.contentRect;
                setSize({ width, height });
            }
        });
        // start observing
        observer.observe(containerRef.current);
        console.log(containerRef.current);
        return () => observer.disconnect();
    }, []);

    const handleMouseDown = (e) => {
        isDrawing.current = true;
        const pos = e.target.getStage().getPointerPosition();
        const size = tool === "pen" ? penSize : eraserSize;
        setLines([...lines, { tool, points: [pos.x, pos.y], strokeWidth: size, color: penColor}]);
    };
    const handleMouseMove = (e) => {
        if (!isDrawing.current) return;
        const stage = e.target.getStage();
        const point = stage.getPointerPosition();
        const lastLine = lines[lines.length - 1];
        lastLine.points = lastLine.points.concat([point.x, point.y]);
        lines.splice(lines.length - 1, 1, lastLine);
        setLines(lines.concat());
    };
    const handleMouseUp = () => (isDrawing.current = false);

    function toggleColorVisibility(){
        setColorChooserVisible(!colorChooserVisible);
    }

    const currentSize = tool === "pen" ? penSize : eraserSize;
    const onSizeChange = (e) => {
        const v = parseInt(e.target.value, 10);
        if (tool === "pen") setPenSize(v);
        else setEraserSize(v);
    };

    return (
        <div className="canvas-container">
            <div className={"canvas-right-container"}>
                <div className={"canvas-exercise"}>
                    <label>{text}</label>
                </div>
                <div className="toolbar">
                    {colorChooserVisible && <HexColorPicker color={penColor} onChange={setColor}/>}
                    <img
                        src={ColorChooser}
                        alt="Color Chooser"
                        className={`canvas-icon ${tool === "color" ? "selected" : ""}`}
                        onClick={() => toggleColorVisibility()}/>
                    <img
                        src={PencilIcon}
                        alt="Pen"
                        className={`canvas-icon ${tool === "pen" ? "selected" : ""}`}
                        onClick={() => setTool("pen")}
                    />
                    <img
                        src={EraserIcon}
                        alt="Eraser"
                        className={`canvas-icon ${tool === "eraser" ? "selected" : ""}`}
                        onClick={() => setTool("eraser")}
                    />



                    <label className="slider-label">
                        {tool === "pen" ? "Pen Size" : "Eraser Size"}: {currentSize}
                        <input
                            type="range"
                            min="1"
                            max="50"
                            value={currentSize}
                            onChange={onSizeChange}
                        />
                    </label>
                </div>
            </div>

            <div className={"canvas-content"} ref={containerRef} >
                <Stage
                    width={size.width}
                    height={size.height}
                    onMouseDown={handleMouseDown}
                    onMousemove={handleMouseMove}
                    onMouseup={handleMouseUp}
                    onTouchStart={handleMouseDown}
                    onTouchMove={handleMouseMove}
                    onTouchEnd={handleMouseUp}
                >
                    <Layer>
                        {lines.map((line, i) => (
                            <Line
                                key={i}
                                points={line.points}
                                stroke={line.color}
                                strokeWidth={line.strokeWidth}
                                tension={0.5}
                                lineCap="round"
                                lineJoin="round"
                                globalCompositeOperation={
                                    line.tool === "eraser" ? "destination-out" : "source-over"
                                }
                            />
                        ))}
                    </Layer>
                </Stage>
            </div>
        </div>
    );
}
