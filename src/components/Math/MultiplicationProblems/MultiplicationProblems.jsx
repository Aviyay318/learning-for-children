import { useEffect, useState } from "react";
import BasicExercise from "../BasicMath/BasicExercise/BasicExercise.jsx";

export default function MultiplicationProblems() {
    const [multiplicationTable, setMultiplicationTable] = useState([]);

    useEffect(() => {
        const table = [];

        for (let i = 0; i <= 10; i++) {
            const row = [];
            for (let j = 0; j <= 10; j++) {
                if (i === 0 && j === 0) {
                    row.push("X");
                } else if (i === 0) {
                    row.push(j);
                } else if (j === 0) {
                    row.push(i);
                } else {
                    row.push(""); // נשתמש במחרוזת ריקה כדי לאפשר עריכה
                }
            }
            table.push(row);
        }

        setMultiplicationTable(table);
    }, []);

    const handleInputChange = (rowIndex, colIndex, value) => {
        const updatedTable = [...multiplicationTable];
        updatedTable[rowIndex][colIndex] = value;
        setMultiplicationTable(updatedTable);
    };

    const getMultiplicationExersice=()=>{

    }

    return (
        <div>
            <h1>Multiplication Problems:</h1>
            {/*id,num1, num2, operand1, operandEqual, num3, userAnswer, setUserAnswer*/}
            {/*<BasicExercise />*/}
            <table style={{ borderCollapse: "collapse" }}>
                <tbody>
                {multiplicationTable.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((cell, colIndex) => {
                            const isHeader = rowIndex === 0 || colIndex === 0;

                            return (
                                <td
                                    key={colIndex}
                                    style={{
                                        border: "1px solid black",
                                        padding: "6px",
                                        backgroundColor: isHeader ? "#f9e500" : "#ffffff",
                                        textAlign: "center",
                                        minWidth: "40px"
                                    }}
                                >
                                    {isHeader ? (
                                        cell
                                    ) : (
                                        <input
                                            type="text"
                                            value={cell}
                                            onChange={(e) =>
                                                handleInputChange(rowIndex, colIndex, e.target.value)
                                            }
                                            style={{
                                                width: "40px",
                                                textAlign: "center",
                                                border: "none",
                                                outline: "none"
                                            }}
                                        />
                                    )}
                                </td>
                            );
                        })}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
