import React from "react";

export const SimpleExercise = ({ question, checkAnswer }) => {
    const [answer, setAnswer] = React.useState("");

    const handleSubmit = () => {
        checkAnswer(answer);
        setAnswer("");
    };

    return (
        <div className="p-6 border-2 border-blue-200 rounded-2xl shadow-lg bg-white w-full max-w-md mx-auto text-center">
            {question && (
                <>
                    <div className="text-2xl font-extrabold text-blue-700 mb-6">
                        {question}
                    </div>
                    <input
                        type="text"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        className="border border-gray-300 text-center px-4 py-2 rounded-lg w-2/3 text-lg"
                        placeholder="הקלד את התשובה"
                    />
                    <button
                        onClick={handleSubmit}
                        className="ml-3 bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-lg transition duration-200"
                    >
                        בדוק תשובה
                    </button>
                </>
            )}

            {!question && <div className="text-gray-500">לא נטענה שאלה...</div>}
        </div>
    );
};
