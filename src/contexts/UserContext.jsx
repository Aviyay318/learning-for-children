import { createContext, useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage.js";

export const UserContext = createContext({
    user: null,
    setUser: () => {}
});

export const UserProvider = ({ children }) => {
    const [user, setUser] = useLocalStorage("user");

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
