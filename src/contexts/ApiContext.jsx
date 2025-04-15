
import { createContext, useContext, useState } from "react";

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
    const [activeRequests, setActiveRequests] = useState(0);

    const wrapRequest = async (requestFn) => {
        setActiveRequests((count) => count + 1);
        try {
            return await requestFn();
        } finally {
            setActiveRequests((count) => count - 1);
        }
    };

    return (
        <ApiContext.Provider value={{ isLoading: activeRequests > 0, wrapRequest }}>
            {children}
        </ApiContext.Provider>
    );
};

export const useApiManager = () => useContext(ApiContext);
