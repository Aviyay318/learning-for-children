import "./Profile.css";
import ProfilePicture from "../../components/Profile/ProfilePicture/ProfilePicture.jsx";
import { useEffect, useState } from "react";
import { GET_USER_DATA, SERVER_URL } from "../../utils/Constants.js";
import PrivateDetails from "../privateDetails/PrivateDetails.jsx";
import Cookies from "js-cookie";
import axios from "axios";
import {useUser} from "../../contexts/UserContext.jsx";
import {useNavigate} from "react-router-dom";

export default function Profile() {
    const { user } = useUser();

    // const [isLoading, setIsLoading] = useState(true);
    //
    //
    // useEffect(() => {
    //     getUserData();
    // }, []);

    return (
        <div className={"profile-container flex"}>
            <h1 className={"profile-header header glass"}>
                פרופיל
            </h1>

            <div className="profile-body flex glass">
                <h1>שלום, {user.user.firstName}</h1>
                <ProfilePicture gender={user.user.gender} />
                <PrivateDetails userData={user} />
            </div>
        </div>

    );
}
