import "./Background.css"
import ButtonImage from "../ButtonImage/ButtonImage.jsx";
import {useEffect, useState} from "react";
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
                {/*<ButtonImage id={"ch"} buttonNumber={1} setImageFrom={changeBackground} imageUrl={1}/>*/}
                {/*<ButtonImage id={"ch"} buttonNumber={2} setImageFrom={changeBackground} imageUrl={2}/>*/}
                {/*<ButtonImage id={"ch"} buttonNumber={3} setImageFrom={changeBackground} imageUrl={3}/>*/}
                {/*<ButtonImage id={"ch"} buttonNumber={4} setImageFrom={changeBackground} imageUrl={4}/>*/}
            </div>

        </div>
    )
}