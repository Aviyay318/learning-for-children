import React, { useEffect, useState } from "react";
import axios from "axios";
import { CHECK_EXERCISE, SERVER_URL } from "../../../utils/Constants.js";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
import "../../NewMath/ExerciseTypes/LiteralProblem.css";

export default function LiteralProblem() {
    const [literalProblem, setLiteralProblem] = useState(null);
    const [userAnswer, setUserAnswer] = useState("");
    const [success, setSuccess] = useState(null);
    const [id, setId] = useState(1);
    const [svg1, setSvg1] = useState(null);
    const [svg2, setSvg2] = useState(null);
    const [showHint, setShowHint] = useState(false);
    const [showImageHint, setShowImageHint] = useState(false);
    const [activeImageIndex, setActiveImageIndex] = useState(null);

    const speak = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "he-IL";
        utterance.rate = 0.9;
        speechSynthesis.speak(utterance);
    };

    const countWithAudio = async (count) => {
        for (let i = 0; i < count; i++) {
            setActiveImageIndex(i);
            const utterance = new SpeechSynthesisUtterance((i + 1).toString());
            utterance.lang = 'he-IL';
            speechSynthesis.speak(utterance);
            await new Promise(resolve => setTimeout(resolve, 700));
        }
        setActiveImageIndex(null);
    };

    const checkLiteralProblem = () => {
        const token = Cookies.get("token");
        axios.get(`${SERVER_URL}${CHECK_EXERCISE}?token=${token}&id=${id}&answer=${userAnswer}`)
            .then(response => {
                setSuccess(response.data);
            });
    };

    const getLiteralProblem = async () => {
        const token = Cookies.get("token");
        const response = await axios.get(`${SERVER_URL}/get-literal-problem?token=${token}`);
        if (response.data) {
            setLiteralProblem(response.data);
            setId(response.data.id);
            setSvg1(response.data.svg1);
            setSvg2(response.data.svg2);
            setShowHint(false);
            setShowImageHint(false);
            setUserAnswer("");
            setSuccess(null);
        }
    };

    useEffect(() => {
        getLiteralProblem();
    }, []);

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

            {literalProblem && (
                <motion.p
                    className="question"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    {literalProblem.question}
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
                <button className="speak-btn" onClick={() => speak(literalProblem?.question)}>🔊 קריאה</button>
                <button className="hint-btn" onClick={() => setShowHint(!showHint)}>רמז</button>
                <button className="hint-btn" onClick={() => setShowImageHint(!showImageHint)}>רמז עם תמונות</button>
                <button className="check-btn" onClick={checkLiteralProblem}>בדוק פתרון</button>
                <button className="new-btn" onClick={getLiteralProblem}>שאלה חדשה</button>
            </div>

            {showHint && literalProblem?.hint && (
                <motion.div
                    className="hint"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {literalProblem.hint}
                </motion.div>
            )}

            {showImageHint && Array.isArray(literalProblem?.imageHint) && (
                <motion.div
                    className="hint-image-grid"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {literalProblem.imageHint.map((item, index) => (
                        <div key={index} className="hint-image-set">
                            <div className="hint-title">{item.name} ({item.count})</div>
                            <button
                                className="count-btn"
                                onClick={() => countWithAudio(item.count)}
                            >
                                🎵 ספור יחד איתי
                            </button>
                            <motion.div
                                className="hint-images"
                                initial="hidden"
                                animate="visible"
                                variants={{
                                    visible: { transition: { staggerChildren: 0.08 } }
                                }}
                            >
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
                <motion.div
                    className={`result ${success ? "success" : "error"}`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                >
                    {success ? "✔ תשובה נכונה!" : "✖ תשובה שגויה"}
                </motion.div>
            )}
        </motion.div>
    );
}
