import "./Profile.css";
import ProfilePicture from "../../components/Profile/ProfilePicture/ProfilePicture.jsx";
import { useEffect, useState } from "react";
import { GET_USER_DATA, SERVER_URL } from "../../utils/Constants.js";
import PrivateDetails from "../privateDetails/PrivateDetails.jsx";
import Cookies from "js-cookie";
import axios from "axios";

export default function Profile() {
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        age: '',
        gender: '',
    });

    const [isLoading, setIsLoading] = useState(true);

    const getUserData = async () => {
        try {
            const token = Cookies.get('token');
            if (!token || token === "null") {
                console.warn("No valid token found");
                setIsLoading(false);
                return;
            }

            const response = await axios.get(`${SERVER_URL}${GET_USER_DATA}?token=${token}`);
            if (response.data !== null) {
                console.log("User data:", response.data);
                setUserData({
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    username: response.data.username,
                    email: response.data.email,
                    age: response.data.age,
                    gender: response.data.gender,
                });
            }
        } catch (err) {
            console.error("Error fetching user data:", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getUserData();
    }, []);

    return (
        <div className="profile">
            {isLoading ? (
                <p>טוען נתונים...</p>
            ) : (
                <>
                    <h1>שלום, {userData.firstName}</h1>
                    <ProfilePicture gender={userData.gender} />
                    <PrivateDetails userData={userData} />
                </>
            )}
        </div>
    );
}
