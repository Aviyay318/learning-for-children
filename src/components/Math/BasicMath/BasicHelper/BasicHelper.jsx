import { useEffect, useState } from "react";
import "./BasicHelper.css";
import Shape from "../../Shapes/Shape.jsx";

export default function BasicHelper({ num1, num2, operand }) {
    const shapes = ["square", "circle", "triangle"];
    const colors = ["red", "yellow", "green", "purple"];

    function randomizeShape() {
        const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        return { type: randomShape, color: randomColor };
    }

    const [shape1, setShape1] = useState(null);
    const [shape2, setShape2] = useState(null);

    useEffect(() => {
        setShape1(randomizeShape());
        setShape2(randomizeShape());
    }, [num1, num2]);

    return (
        <div className="basic-exercise-helper">
            <div className="shapes-container">
                {shape1 && Array.from({ length: num1 }, (_, index) => (
                    <Shape key={index} type={shape1.type} color={shape1.color} />
                ))}
            </div>
            <label className="basic-exercise-helper-operand">
                {operand}
            </label>
            <div className="shapes-container">
                {shape2 && Array.from({ length: num2 }, (_, index) => (
                    <Shape key={index} type={shape2.type} color={shape2.color} />
                ))}
            </div>
        </div>
    );
}
