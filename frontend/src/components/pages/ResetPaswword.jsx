import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ResetPassword() {
    let navigate = useNavigate();
    const { token } = useParams();
    const [isLoading, setIsLoading] = useState(false);

    async function handlePassUpdate(event) {
        event.preventDefault();
        const fd = new FormData(event.target);
        const data = Object.fromEntries(fd.entries());
        const password = data.password;
        const confirmPassword = data.confirmPassword;

        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        try {
            setIsLoading(true);
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/reset-password/${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password }),
            });

            const resData = await response.json();
            if (!response.ok) {
                throw new Error(resData.message || 'Failed to reset password');
            }

            toast.success('Password reset successfully');
            setIsLoading(false);
            navigate('/user/login');
        } catch (err) {
            toast.error(err.message || 'Failed to reset password');
            setIsLoading(false);
            event.target.reset();
            navigate(`/reset-password/${token}`);
        }
    }

    return (
        <div className="min-h-screen bg-gray-900 flex justify-center items-center px-4 sm:px-6 lg:px-8">
            {isLoading &&
                <div className="loading-overlay">
                    <p className="relative">
                        <span className="loading loading-dots loading-lg text-primary"></span>
                    </p>
                </div>
            }
            <div className="bg-gray-800 py-8 px-6 rounded-lg shadow-lg w-full max-w-md">
                <div className="text-center">
                    <Link to="/">
                        <img
                            className="mx-auto h-12 w-auto"
                            src="https://img.icons8.com/color/48/yoga-skin-type-1.png"
                            alt="Fitness Master Logo"
                        />
                    </Link>
                    <h2 className="mt-6 text-3xl font-extrabold text-white">
                        Reset your password
                    </h2>
                </div>

                <form className="mt-8 space-y-6" method="post" onSubmit={handlePassUpdate}>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                            New Password
                        </label>
                        <div className="mt-1">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                minLength={8}
                                required
                                className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 bg-gray-700 text-white"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-300">
                            Confirm Password
                        </label>
                        <div className="mt-1">
                            <input
                                id="confirm-password"
                                name="confirmPassword"
                                type="password"
                                minLength={8}
                                required
                                className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 bg-gray-700 text-white"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        >
                            Reset Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
