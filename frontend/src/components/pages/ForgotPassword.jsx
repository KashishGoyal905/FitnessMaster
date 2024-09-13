import { useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ForgotPassword() {
    let navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    async function handlePassUpdate(event) {
        event.preventDefault();
        const fd = new FormData(event.target);
        const data = Object.fromEntries(fd.entries());
        const email = data.email;

        try {
            setIsLoading(true);
            const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/user/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const resData = await response.json();
            if (!response.ok) {
                throw new Error(resData.message || 'Failed to send reset email');
            }

            toast.success('Password reset email sent!');
            setIsLoading(false);
            event.target.reset();
            navigate('/user/login');
        } catch (err) {
            setIsLoading(false);
            toast.error(err.message || 'Failed to send reset email');
            event.target.reset();
            navigate(`/updatePass`);
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
                        Forgot your password?
                    </h2>
                    <p className="mt-2 text-sm text-gray-300">
                        Enter your email to receive a password reset link.
                    </p>
                </div>

                <Form className="mt-8 space-y-6" method="post" onSubmit={handlePassUpdate}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                            Email address
                        </label>
                        <div className="mt-1">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 bg-gray-700 text-white"
                            />
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="w-full sm:w-1/2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        >
                            Send Reset Link
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    );
}
