import { useState } from "react";
import { Link } from "react-router-dom";
import img from '../../images/signup.png';

export default function SignUp() {
    // Loading State
    const [isLoading, setIsLoading] = useState(false);

    async function handleSignUp(e) {
        e.preventDefault();

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
            return;
        } catch (err) {
            console.log('Failed to Update the Profile: ', err.message);
            // toast.error(err.message || 'Failed to Update the Profile');
            // event.target.reset();
            // return redirect(`/profile/${user._id}`);
        }
    }

    return (
        <div className="h-screen bg-gray-900 flex">
            <div className="flex flex-col justify-center py-12 px-6 m-12 lg:px-8 w-full max-w-md bg-slate-800">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <Link to="/"><img
                        className="mx-auto h-auto w-auto"
                        src="https://img.icons8.com/color/48/yoga-skin-type-1.png"
                        alt="NeelamFitness Logo"
                    /></Link>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                        Create a new account
                    </h2>
                    <p className="mt-2 text-center text-sm text-white">
                        Already have an account?{' '}
                        <Link to="/user/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Sign In
                        </Link>
                    </p>
                </div>

                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-transparent py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form className="space-y-6" method='post' encType="multipart/form-data" onSubmit={handleSignUp}>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-white">
                                    Username
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="name"
                                        name="username"
                                        type="text"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border bg-slate-600 text-white border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-white">
                                    Email address
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border bg-slate-600 text-white border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium  text-white">
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        minLength={8}
                                        required
                                        className="appearance-none block w-full px-3 py-2 border bg-slate-600 text-white border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label class="block mb-2 text-sm font-medium text-white dark:text-white" for="user_avatar">Upload file</label>
                                <input class="block w-full text-sm border border-gray-300 rounded-lg cursor-pointer bg-slate-600 text-white dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file" />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember_me"
                                        name="remember_me"
                                        type="checkbox"
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="remember_me" className="ml-2 block text-sm text-white">
                                        Remember me
                                    </label>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
                    className="absolute inset-0 p-16 h-full w-full "
                    src={img}
                    alt=""
                />
                {/* <Link href="https://storyset.com/sport">Sport illustrations by Storyset</Link> */}
            </div>
        </div>
    )
}
