import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import img from '../../images/signup.png';

// Toast messages
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import authContext from "../../context/AuthContext";
import useAuthRedirect from "../../middleware/useAuthRedirect";


export default function SignUp() {
    // If the user is already logged in, it will redirect to main page.
    useAuthRedirect();

    // Loading State
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useContext(authContext);
    // For navigation
    const navigate = useNavigate();

    async function handleSignUp(e) {
        e.preventDefault();

        // Data received from the Form
        const fd = new FormData(e.target);
        const data = Object.fromEntries(fd.entries());
        console.log('User Sign Up Details: ', data);

        try {
            setIsLoading(true);
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/signup`, {
                method: 'POST',
                body: fd, // FormData automatically sets the correct headers
            });

            const resData = await response.json();
            if (!response.ok) {
                setIsLoading(false);
                throw new Error(resData.message || 'Failed to Sign Up');
            }

            e.target.reset();
            setIsLoading(false);
            login(resData.token, resData.user);
            toast.success(resData.message || 'User Created Succesfully');
            return navigate('/');
        } catch (err) {
            console.log('Failed to Sign Up|Frontend: ', err.message);
            toast.error(err.message || 'Failed to Sign Up');
            return;
        }
    }

    return (
        <div className={`h-screen bg-gray-900 flex`}>
            {isLoading &&
                <div className="loading-overlay">
                    <p className="relative">
                        <span className="loading loading-dots loading-lg text-primary"></span>
                    </p>
                </div>
            }
            <div className={`${isLoading ? 'blur-background' : ''} flex flex-col justify-center py-12 px-4 md:px-6 lg:px-8 m-6 md:m-12 w-full max-w-md bg-slate-800 rounded-lg shadow-lg`}>
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <Link to="/">
                        <img
                            className="mx-auto h-auto w-auto"
                            src="https://img.icons8.com/color/48/yoga-skin-type-1.png"
                            alt="NeelamFitness Logo"
                        />
                    </Link>
                    <h2 className="mt-6 text-center text-2xl md:text-3xl font-bold md:font-extrabold text-white">
                        Create a new account
                    </h2>
                    <p className="mt-2 text-center text-xs md:text-sm text-white">
                        Already have an account?{' '}
                        <Link to="/user/login" className="font-bold text-[13px] md:text-[16px] text-primary hover:text-indigo-400">
                            Sign In
                        </Link>
                    </p>
                </div>

                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-transparent py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form className="space-y-6" method='post' encType="multipart/form-data" onSubmit={handleSignUp}>
                            <div>
                                <label htmlFor="name" className="block text-xs md:text-sm font-medium text-white">
                                    Full Name
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="name"
                                        name="username"
                                        type="text"
                                        placeholder="John Smith"
                                        required
                                        className="appearance-none block w-full px-3 py-2 bg-slate-600 text-white rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-xs md:text-sm font-medium text-white">
                                    Email address
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="john@google.com"
                                        required
                                        className="appearance-none block w-full px-3 py-2 bg-slate-600 text-white rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-xs md:text-sm font-medium text-white">
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder=""
                                        minLength={8}
                                        required
                                        className="appearance-none block w-full px-3 py-2 bg-slate-600 text-white rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs md:text-sm font-medium text-white mb-1" htmlFor="user_avatar">Profile Picture</label>
                                <input className="block w-full h-full text-xs md:text-sm px-2 py-0 rounded-md cursor-pointer bg-slate-600 text-white border border-slate-600 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" required name="image" id="user_avatar" type="file" />
                            </div>
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm md:text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Sign up
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="hidden lg:block relative w-0 flex-1">
                <img
                    className="absolute inset-0 p-16 h-full w-full"
                    src={img}
                    alt=""
                />
                {/* <Link href="https://storyset.com/sport">Sport illustrations by Storyset</Link> */}
            </div>
        </div>
    )
}
