import { createContext, useEffect, useState } from "react";
// Toastify
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Context Api to handle the authentication and authorization throughout the website
const authContext = createContext({
    isAuthenticated: '',
    user: null,
    login: () => { },
    logout: () => { },
    update: () => { },
});

// export function authContextProvider({ children }) {
export const AuthContextProvider = ({ children }) => {
    // isAuthenticated state to check if the user is authenticated or not
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const token = localStorage.getItem('token');
        // to convert it into a boolean value
        return !!token;
    });

    // user state | it will hold the details regarding the logged in user
    const [user, setUser] = useState(null);

    // It will be executed after the first time component mounting and after that in refrehes
    useEffect(() => {
        // extracting token from the localStorage
        const token = localStorage.getItem('token');

        // Fetch user details from the backend if token is present
        const fetchUser = async () => {
            if (token) {
                try {
                    // Req to grab the details of the user from the mongoDb whose token is present in localStorage
                    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/me`, {
                        headers: {
                            // Security check
                            'Authorization': `Bearer ${token}`,
                        },
                    });
                    const userData = await response.json();

                    if (!response.ok) {
                        toast.error(userData.message | 'Token is Manipulated!');
                        throw new Error(userData | 'Token is Manipulated');
                    }

                    // Setting the details extracted from the DB
                    setIsAuthenticated(true);
                    setUser(userData.user);
                } catch (error) {
                    console.log(error.message || 'Failed to fetch user data:', error);
                    logout();
                }
            }
        };

        fetchUser();

        // token expiration
        const tokenExpirationTime = localStorage.getItem('tokenExpirationTime');
        if (tokenExpirationTime && new Date().getTime() > tokenExpirationTime) {
            logout();
        }

        const checkTokenExpiration = () => {
            const expirationTime = localStorage.getItem('tokenExpirationTime');
            if (expirationTime && new Date().getTime() > expirationTime) {
                logout();
            }
        };

        const intervalId = setInterval(checkTokenExpiration, 1000); // Check every second

        // cleanup funciton
        return () => clearInterval(intervalId);
    }, []);


    // Login funciton | as soon as the user logs in setting the details in the localStorage & state
    const login = (token, user) => {
        const tokenExpirationTime = new Date().getTime() + 60 * 60 * 1000; // 1hr  from now
        localStorage.setItem('token', token);
        localStorage.setItem('tokenExpirationTime', tokenExpirationTime);
        setIsAuthenticated(true);
        setUser(user);
    };

    // logout
    const logout = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/logout`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
        }
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpirationTime');
        setIsAuthenticated(false);
        setUser(null);
        toast.info('Logged out successfully!');
    };

    // profile update function
    const updateFun = (updatedUser) => {
        setUser(updatedUser);
    }

    return (
        // The `children` component now has access to fields and functions present in the value object.
        <authContext.Provider value={{ isAuthenticated, user, login, logout, updateFun }}>
            {children}
        </authContext.Provider>
    );
}

export default authContext;