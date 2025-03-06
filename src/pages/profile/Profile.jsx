import "./Profile.css"
import ProfilePicture from "../../components/Profile/ProfilePicture/ProfilePicture.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {GET_USERNAME_AND_GENDER, SERVER_URL} from "../../utils/Constants.js";
import {isStateMemberExpression} from "eslint-plugin-react/lib/util/componentUtil.js";
export default function Profile() {

    const [profile, setProfile] = useState({});

    useEffect(() => {
        axios.get(SERVER_URL+GET_USERNAME_AND_GENDER+"?token=admin12345").then(
            response => {
                if (response!=null){
                    console.log(response.data);
                    setProfile({name:response.data.username,gender:response.data.gender})
                }
            }
        )
    }, []);

    // const gender = "boy"
    return (
        <div className="profile">
            <h1>שלום, {profile.name}</h1>
            <ProfilePicture gender={profile.gender}/>
        </div>
    )
}