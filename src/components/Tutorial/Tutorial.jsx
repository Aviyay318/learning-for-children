import { useTutorial } from "../../hooks/uiHooks/useTutorial.js";

export default function Tutorial({ topic }) {
        const instruction = useTutorial(topic);

        if (!instruction) return <p>אין הוראות זמינות לנושא זה.</p>;

        return (
            <div className="bg-yellow-100 p-4 rounded-xl shadow-md" style={{ direction: "rtl" }}>
                    <h2 className="text-xl font-bold mb-2">{instruction.title}</h2>
                    <p className="mb-2">{instruction.description}</p>

                    <p className="mb-2 font-medium">🧮 דוגמה:</p>
                    <pre
                        className="bg-white rounded p-2 mb-2"
                        style={{ whiteSpace: "pre", fontFamily: "monospace", direction: "ltr" }}
                    >
        {instruction.example}
      </pre>

                    <p className="mb-1 font-medium">📘 הסבר:</p>
                    <pre
                        className="bg-white rounded p-2 mb-2"
                        style={{ whiteSpace: "pre-line", fontFamily: "inherit" }}
                    >
        {instruction.explanation}
      </pre>

                    <p className="italic">💡 טיפ: {instruction.tip}</p>
            </div>
        );
}
