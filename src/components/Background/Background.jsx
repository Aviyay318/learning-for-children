import "./Background.css"
import {useEffect, useState} from "react";
import ButtonImage from "../ButtonImage/ButtonImage.jsx";
export default function Background() {
    const backgroundAlbum = ({
        1: "src/assets/images/1.jpg",
        2: "src/assets/images/2.jpg",
        3: "src/assets/images/3.jpg",
        4: "src/assets/images/4.jpg",
    })
    const [background, setBackground] = useState("src/assets/images/1.jpg");
    function handleBackgroundChange(url) {
        setBackground(url)
    }

    useEffect(() => {
        document.getElementById("background").style.backgroundImage = `url("${background}")`;
    },[background])
    return (
        <div className={"background-settings-container flex"}>
            <h2>שנה רקע:</h2>
            <div className="ch-button-group">
                {Object.keys(backgroundAlbum).map((photo, index) => {
                    return (
                        <ButtonImage
                            key={index}
                            buttonNumber={index}
                            setImageTo={handleBackgroundChange}
                            imageUrl={backgroundAlbum[photo]}
                        />
                    )
                })}
            </div>

        </div>
    )
}