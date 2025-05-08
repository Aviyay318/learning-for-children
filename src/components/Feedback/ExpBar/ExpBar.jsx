import "./ExpBar.css"
import {useEffect, useState} from "react";

export default function ExpBar({currentLevel, nextLevel, currentExp, maxExp}) {
    const [displayExp, setDisplayExp] = useState(currentExp);
    const [levelUp, setLevelUp] = useState(false);

    const percentage = Math.min((displayExp / maxExp) * 100, 100);
    const currentExpText = currentExp + '%';

    useEffect(() => {
        const timer = setTimeout(() => {
            setDisplayExp(currentExp);
        }, 50);
        return () => clearTimeout(timer);
    }, [currentExp]);

    useEffect(() => {
        if (currentExp === 100) {
            setLevelUp(true);
            const resetTimer = setTimeout(() => {
                setDisplayExp(0);
                setLevelUp(false);
            }, 3000);
            return () => clearTimeout(resetTimer);
        }
    }, [currentExp]);

    return (
        <div className="exp-bar-container" style={{position: "relative"}}>
            {levelUp && (
                <div className="level-up-popup">
                    🎉 עברת שלב! 🎉
                </div>
            )}

            <div className="exp-label current-level">
                רמה {currentLevel}
            </div>

            <div className="exp-bar-wrapper">
                <svg className="exp-bar" width="800" height="100" viewBox="0 0 800 40">
                    <rect
                        className="exp-bar-bg"
                        x="5"
                        y="0"
                        width="790"
                        height="50"
                        rx="10"
                        ry="10"
                        fill="none"
                        stroke="#12141a"
                        strokeWidth="5"
                    />
                    <rect
                        className={`exp-bar-fill ${levelUp ? 'flash' : ''}`}
                        x="6"
                        y="2"
                        width={`${(788 * percentage) / 100}`}
                        height="46"
                        rx="10"
                        ry="10"
                        fill="#00C853"
                    />
                    <clipPath id="clip">
                        <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#rect"/>
                    </clipPath>
                    <text
                        x="50%"
                        y="50%"
                        fill="#fff"
                        fontWeight="bold"
                        clipPath="url(#clip)"
                        dominantBaseline="middle"
                        textAnchor="middle"
                    >
                        {currentExpText}
                    </text>
                </svg>
            </div>

            <div className="exp-label next-level">
                רמה {nextLevel}
            </div>
        </div>
    );
}
