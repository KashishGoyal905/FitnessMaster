import { useContext, useEffect } from 'react';
import authContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// Toast messages
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useAuthRedirect = () => {
    const { isAuthenticated } = useContext(authContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            toast.info("Already Logged In");
            navigate('/');
        }
    }, [isAuthenticated, navigate]);
};

export default useAuthRedirect;
