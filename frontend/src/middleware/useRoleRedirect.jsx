// useRoleRedirect.jsx
import { useContext, useEffect } from 'react';
import authContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// Toast messages
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useRoleRedirect = (allowedRoles, redirectTo) => {
    const { user } = useContext(authContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user && !allowedRoles.includes(user.userRole)) {
            toast.error("You do not have access to this page");
            navigate(redirectTo);
        }
    }, [user, navigate, allowedRoles, redirectTo]);
};

export default useRoleRedirect;
