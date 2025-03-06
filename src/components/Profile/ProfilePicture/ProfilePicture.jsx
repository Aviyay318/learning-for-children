import "./ProfilePicture.css"
import {useProfilePicture} from "../../../hooks/useProfilePicture.js";
import ProfilePictureChooser from "./ProfilePictureChooser.jsx";
import {useState} from "react";
export default function ProfilePicture({gender}) {
    const [picture, setPicture] = useState(useProfilePicture(gender))
    function handlePictureChange(pictureUrl) {
        setPicture(pictureUrl)
    }

    return (
        <>
            <img className="profile-picture" id={"pfp"} src={picture} alt="profile-picture"/>
            <ProfilePictureChooser gender={gender} handlePictureChange={handlePictureChange}/>
        </>
    )
}