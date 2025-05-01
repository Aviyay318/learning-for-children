import {useEffect, useState} from "react";
import axios from "axios";
import {GET_USER_DATA, SERVER_URL} from "../../utils/Constants.js";
import Cookies from "js-cookie";

export default function PrivateDetails({userData}){
   
    return(
        <div>
        <h1>PrivateDetails</h1>
            {/*//TODO לעצב את השיט ram*/}
            {userData !== null && <div>
                <div>שם פרטי: {userData.user.firstName}</div>
                <div>שם משפחה: {userData.user.lastName}</div>
                <div>שם משתמש: {userData.user.username}</div>
                <div>אימייל: {userData.user.email}</div>
                <div>גיל: {userData.user.age}</div>
                <div>מגדר: {userData.user.gender}</div>
            </div>}
        </div>
    )
}