import {useEffect, useState} from "react";

export const useProfilePicture = (gender, preference) => {

    const defaultPictures = ({
        boy: "src/assets/profile-pictures/boy1.jpg",
        girl: "src/assets/profile-pictures/girl1.jpg",
    });

    const [profilePicture, setProfilePicture] = useState(()=>{
        const savedPicture = localStorage.getItem("profilePicture");
        return savedPicture ? JSON.parse(savedPicture) : defaultPictures;
    })
    useEffect(() => {
        if (preference && profilePicture[gender] !== preference){
            setProfilePicture((prev)=> ({
                ...prev,
                [gender]: preference,
            }))
            localStorage.setItem("profilePicture", JSON.stringify({...profilePicture, [gender]: preference}));
        }
    }, [preference, gender]);


    return profilePicture[gender] || defaultPictures[gender];

}