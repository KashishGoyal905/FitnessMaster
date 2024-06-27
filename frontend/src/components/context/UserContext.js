import React, { createContext, useState } from "react";

// Create the context
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
    const [userRole, setUserRole] = useState('user'); // default role

    const user = {
        userRole,
        setUserRole,
        // Add more user-related state and functions here
    };

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
};
