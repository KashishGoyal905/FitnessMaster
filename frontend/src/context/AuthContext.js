import { createContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Context Api to handle the authentication and authorization throughout the website
const authContext = createContext({
    isAuthenticated: '',
    login: () => { },
    user: null,
    update: () => { },
    logout: () => { },
});

// export function authContextProvider({ children }) {
export const AuthContextProvider = ({ children }) => {

    // isAuthenticated state to check if the user is authenticated or not
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const token = localStorage.getItem('token');
        return !!token;
    });

    // user state | it will hold the details regarding the logged in user
    //* NEW
    const [user, setUser] = useState(null);
    //* OLD
    // const [user, setUser] = useState(() => {
    //     const storedUser = localStorage.getItem('user');
    //     return storedUser ? JSON.parse(storedUser) : null;
    // });

    useEffect(() => {
        // extracting token from the localStorage
        const token = localStorage.getItem('token');
        //* OLD
        // const storedUser = localStorage.getItem('user');


        //* New
        // Fetch user details from the backend if token is present
        const fetchUser = async () => {
            if (token) {
                try {
                    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/me`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });

                    if (!response.ok) {
                        console.log('Token is manipulated');
                        toast.error('Token is Manipulated!');
                        throw new Error('Token is Manipulated');
                    }

                    const userData = await response.json();
                    if (userData.user) {
                        setIsAuthenticated(true);
                        setUser(userData.user);
                    } else {
                        logout();
                    }

                } catch (error) {
                    console.error(error.message || 'Failed to fetch user data:', error);
                    logout();
                }
            }
        };

        fetchUser();

        //* OLD
        // if both are present i am setting the state
        // it is important to do because if we refresh the website then all the state will be lost
        // that's why whenever user refresh the website gather the details from the localStorage and set it.
        // if (token && storedUser) {
        //     setIsAuthenticated(true);
        //     setUser(JSON.parse(storedUser));
        // }

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
        // localStorage.setItem('user', JSON.stringify(user));
        setIsAuthenticated(true);
        setUser(user);
    };

    // logout
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpirationTime');
        // localStorage.removeItem('user');
        setIsAuthenticated(false);
        setUser(null);
        toast.info('Logged out successfully!');
    };

    // profile update function
    const updateFun = (updatedUser) => {
        // localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
    }

    return (
        <authContext.Provider value={{ isAuthenticated, login, logout, updateFun, user }}>
            {children}
        </authContext.Provider>
    );
}

export default authContext;