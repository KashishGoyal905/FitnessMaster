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