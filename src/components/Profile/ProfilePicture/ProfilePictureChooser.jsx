import ButtonImage from "../../ButtonImage/ButtonImage.jsx";
import "./ProfilePictureChooser.css"
import {useEffect, useState} from "react";

export default function ProfilePictureChooser({gender, handlePictureChange}) {
    const ELEMENT_ID = "pfp";
    const boyProfilePhotosAlbum=({
        boy1: "src/assets/profile-pictures/boy1.jpg",
        boy2: "src/assets/profile-pictures/boy2.jpg",
        boy3: "src/assets/profile-pictures/boy3.jpg",
        boy4: "src/assets/profile-pictures/boy4.jpg",

    })
    const girlProfilePhotosAlbum =({
        girl1: "src/assets/profile-pictures/girl1.jpg",
        girl2: "src/assets/profile-pictures/girl2.jpg",
        girl3: "src/assets/profile-pictures/girl3.jpg",
        girl4: "src/assets/profile-pictures/girl4.jpg",
    })

    const [albumToUse, setAlbumToUse] = useState(null)

    function handleProfilePictureChooser() {
        switch (gender) {
            case "boy": return setAlbumToUse(boyProfilePhotosAlbum);
            case "girl":return setAlbumToUse( girlProfilePhotosAlbum);
        }
    }

    useEffect(() => {
        handleProfilePictureChooser();
    },[])

    function changeProfilePicture(url){
        const element = document.getElementById("pfp");
        element.style.backgroundImage = url;
        handlePictureChange(url);
    }


    return (
        <>
            <div className="pfp-button-group">
                {console.log(albumToUse)}
                {
                    albumToUse && Object.keys(albumToUse).map((photo, index) => {
                        return (
                            <ButtonImage
                                key={index}
                                id={ELEMENT_ID}
                                buttonNumber={index+1}
                                setImageTo={changeProfilePicture}
                                imageUrl={albumToUse[photo]}
                            >
                            </ButtonImage>
                        )
                    })}
            </div>
        </>
    )
}