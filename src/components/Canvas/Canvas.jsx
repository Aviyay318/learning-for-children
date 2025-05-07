import {useRef, useState} from "react";
import { Stage, Layer, Line, Text } from 'react-konva';
import "./Canvas.css"

export default function Canvas({text})  {

    const [tool, setTool] = useState('pen');
    const [penSize,   setPenSize]   = useState(5);
    const [eraserSize, setEraserSize] = useState(20);
    const [lines, setLines] = useState([]);
    const isDrawing = useRef(false);

    const handleMouseDown = (e) => {
        isDrawing.current = true;
        const pos = e.target.getStage().getPointerPosition();
        setLines([...lines, { tool, points: [pos.x, pos.y] }]);
    };

    const handleMouseMove = (e) => {
        // no drawing - skipping
        if (!isDrawing.current) {
            return;
        }
        const stage = e.target.getStage();
        const point = stage.getPointerPosition();
        let lastLine = lines[lines.length - 1];
        // add point
        lastLine.points = lastLine.points.concat([point.x, point.y]);

        // replace last
        lines.splice(lines.length - 1, 1, lastLine);
        setLines(lines.concat());
    };

    const handleMouseUp = () => {
        isDrawing.current = false;
    };

    return (
        <div className={"canvas-container"}>
            <select
                value={tool}
                onChange={(e) => {
                    setTool(e.target.value);
                }}
            >
                <option value="pen">Pen</option>
                <option value="eraser">Eraser</option>
            </select>
            <label>Pen size
                <input
                    type="number"
                    value={penSize}
                    onChange={e => setPenSize(+e.target.value)}
                />
            </label>
            <label>Eraser size
                <input
                    type="number"
                    value={eraserSize}
                    onChange={e => setEraserSize(+e.target.value)}
                />
            </label>

            <Stage
                width={500}
                height={500}
                onMouseDown={handleMouseDown}
                onMousemove={handleMouseMove}
                onMouseup={handleMouseUp}
                onTouchStart={handleMouseDown}
                onTouchMove={handleMouseMove}
                onTouchEnd={handleMouseUp}
            >
                <Layer>
                    <Text className={"canvas-text"} text={`${text}`}/>
                    {lines.map((line, i) => (
                        <Line
                            key={i}
                            points={line.points}
                            stroke="#fffff"
                            strokeWidth={line.tool === "pen" ? penSize : eraserSize}
                            tension={0.5}
                            lineCap="round"
                            lineJoin="round"
                            globalCompositeOperation={
                                line.tool === 'eraser' ? 'destination-out' : 'source-over'
                            }
                        />
                    ))}
                </Layer>
            </Stage>
        </div>
    );
}