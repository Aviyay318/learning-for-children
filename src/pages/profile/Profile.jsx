import "./Profile.css"
import ProfilePicture from "../../components/Profile/ProfilePicture/ProfilePicture.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {GET_USERNAME_AND_GENDER, SERVER_URL} from "../../utils/Constants.js";
import {isStateMemberExpression} from "eslint-plugin-react/lib/util/componentUtil.js";
import Exercise from "../../components/Math/Exercise/Exercise.jsx";
export default function Profile() {

    const [profile, setProfile] = useState({});



    // const gender = "boy"
    return (
        <div className="profile">
            <Exercise/>
            <h1>שלום, {profile.name}</h1>
            <ProfilePicture gender={"girl"}/>
        </div>
    )
}