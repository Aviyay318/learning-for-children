import "./ExpBar.css"
import {useEffect, useState} from "react";
export default function ExpBar ({currentLevel, nextLevel, currentExp, maxExp}) {
    const [displayExp, setDisplayExp] = useState(currentExp);
    const percentage = Math.min((displayExp / maxExp) * 100, 100)
    const currentExpText = currentExp+'%';
    useEffect(() => {
        const timer = setTimeout(() => {
            setDisplayExp(currentExp)
        }, 50)
        return () => clearTimeout(timer)
    }, [currentExp]);
    return (
        <div className={"exp-bar-container"}>
            <div className={"exp-label current-level"}>
                רמה {currentLevel}
            </div>
            <div className={"exp-bar-wrapper"}>
                <svg className="exp-bar" width="300" height="20" viewBox="0 0 300 40">
                    <rect
                        className="exp-bar-bg"
                        x="0"
                        y="10"
                        width="300"
                        height="20"
                        rx="10"
                        ry="10"
                        fill="none"
                        stroke="#12141a"
                        strokeWidth="5"
                    />
                    <rect
                        className="exp-bar-fill"
                        x="2"
                        y="12"
                        width={`${(300 * percentage) / 100}`}
                        height="16"
                        rx="10"
                        ry="10"
                        fill="#00C853"
                    />
                    <clipPath id="clip">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#rect"/>
                    </clipPath>
                    <text
                        x="50%"
                        y="50%"
                        fill={"#fff"}
                        fontWeight={"bold"}
                        clipPath={`url(#clip)`}
                        dominantBaseline={"middle"}
                        textAnchor={"middle"}


                    >{currentExpText}</text>
                </svg>
            </div>
            <div className={"exp-label next-level"}>
                רמה {nextLevel}
            </div>

        </div>

    )
}