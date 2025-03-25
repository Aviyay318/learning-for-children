import { createContext, useContext, useState } from "react";

export const UserContext = createContext({
    user: null,
    setUser: () => {}
});

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // user object will contain firstName, lastName, email, etc.

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
