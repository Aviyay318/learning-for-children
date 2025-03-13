import "./ButtonImage.css"
import {useEffect} from "react";
export default function ButtonImage({id, buttonNumber,setImageTo, imageUrl}) {
    const handleClick = () => {
        setImageTo(imageUrl)
    }
    function setImageToButton(){
        document.getElementById(`${id}-button-${buttonNumber}`).style.backgroundImage = `url(${imageUrl})`
    }
    useEffect(() => {
        setImageToButton()
    },[])
    return (
        <button className={"button-image"}
                id={`${id}-button-${buttonNumber}`}
                onClick={handleClick}
                aria-label={`Select image ${buttonNumber}`}
        >
        </button>
    )
}