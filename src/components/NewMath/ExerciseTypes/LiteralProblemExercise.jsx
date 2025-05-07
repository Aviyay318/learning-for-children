import { motion } from "framer-motion";
import "./LiteralProblem.css"
export default function LiteralProblemExercise({
                                                   question,
                                                   svg1,
                                                   svg2,
                                                   imageHint,
                                                   hint,
                                                   userAnswer,
                                                   setUserAnswer,
                                                   checkAnswer,
                                                   onSpeak,
                                                   onHint,
                                                   onImageHint,
                                                   showHint,
                                                   showImageHint,
                                                   success,
                                                   countWithAudio,
                                                   activeImageIndex
                                               }) {

    const handleSubmit = async () => {
        const result = await checkAnswer({ userAnswer }); // שלח כאובייקט, לא רק מחרוזת
        console.log("✔ תוצאה מהשרת:", result);
    };


    return (
        <motion.div
            className="literal-problem-container"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
        >
            <h2>בעיה מילולית</h2>
            <div className="images">
                {svg1 && <div dangerouslySetInnerHTML={{ __html: svg1 }} className="svg-icon" />}
                {svg2 && <div dangerouslySetInnerHTML={{ __html: svg2 }} className="svg-icon" />}
            </div>

            {question && (
                <motion.p className="question" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                    {question}
                </motion.p>
            )}

            <input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="הכנס כאן"
                className="input"
            />

            <div className="buttons">
                <button className="speak-btn" onClick={onSpeak}>🔊 קריאה</button>
                <button className="hint-btn" onClick={onHint}>רמז</button>
                <button className="hint-btn" onClick={onImageHint}>רמז עם תמונות</button>
                <button className="check-btn" onClick={handleSubmit}>בדוק פתרון</button>
            </div>

            {showHint && hint && (
                <motion.div className="hint" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                    {hint}
                </motion.div>
            )}

            {showImageHint && Array.isArray(imageHint) && (
                <motion.div className="hint-image-grid" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                    {imageHint.map((item, index) => (
                        <div key={index} className="hint-image-set">
                            <div className="hint-title">{item.name} ({item.count})</div>
                            <button className="count-btn" onClick={() => countWithAudio(item.count)}>🎵 ספור יחד איתי</button>
                            <motion.div className="hint-images" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08 } } }}>
                                {Array.from({ length: item.count }).map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className={`hint-single-image ${activeImageIndex === i ? "highlighted" : ""}`}
                                        dangerouslySetInnerHTML={{ __html: item.svg }}
                                        variants={{
                                            hidden: { opacity: 0, y: 10 },
                                            visible: { opacity: 1, y: 0 }
                                        }}
                                    />
                                ))}
                            </motion.div>
                        </div>
                    ))}
                </motion.div>
            )}

            {success !== null && (
                <motion.div className={`result ${success ? "success" : "error"}`} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                    {success ? "✔ תשובה נכונה!" : "✖ תשובה שגויה"}
                </motion.div>
            )}
        </motion.div>
    );
}
