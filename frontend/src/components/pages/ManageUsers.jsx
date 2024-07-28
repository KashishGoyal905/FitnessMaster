import React, { useContext, useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';

// Toast messages
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import authContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import useRoleRedirect from '../../middleware/useRoleRedirect';

export default function ManageUsers() {
    // To resstric the user with 'User' role to acess this page
    useRoleRedirect(['admin'], '/');

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user, updateFun } = useContext(authContext);
    const navigate = useNavigate();


    useEffect(() => {
        // Fetch users from the API
        const fetchUsers = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/users`);
                const data = await response.json();
                console.log(data.userdata);
                setUsers(data.userdata);
                setIsLoading(false);
            } catch (err) {
                setIsLoading(false);
                console.log('Failed to Fetch the Users|Frontend: ', err.message);
                toast.error(err.message || 'Failed to Fetch the Users');
                return;
            }
        };

        fetchUsers();
    }, []);

    async function handleChangeRole(userId) {
        // Confirming
        if (!window.confirm("Are you sure you want to change the Role?")) return;

        try {
            setIsLoading(true);
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/changeRole/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const resData = await response.json();

            if (!response.ok) {
                setIsLoading(false);
                throw new Error(resData.message || 'Failed to Update the Role of the user');
            }


            setIsLoading(false);
            // To re-render the component | Upddate the user state
            setUsers(users =>
                users.map(userA =>
                    userA._id === userId ? { ...userA, userRole: userA.userRole === 'admin' ? 'user' : 'admin' } : userA
                )
            );

            // Check if the user is changing their own role
            if (user._id === userId) {
                const updatedUser = { ...user, userRole: user.userRole === 'admin' ? 'user' : 'admin' };
                updateFun(updatedUser);
                if (updatedUser.userRole === 'admin') {
                    navigate('/dashboard/manage-users');
                } else {
                    navigate('/dashboard');
                }
            }

            toast.success(resData.message || 'User Role Changed Successfully');
        } catch (err) {
            setIsLoading(false);
            console.log('Failed to Update the role of the user|Frontend: ', err.message);
            toast.error(err.message || 'Failed to Update the role of the user');
            return;
        }
    };

    async function handleDeleteUser(userId) {
        // Confirming
        if (!window.confirm("Are you sure you want to delete your account?")) return;

        try {
            setIsLoading(true);
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/delete/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const resData = await response.json();

            if (!response.ok) {
                setIsLoading(false);
                throw new Error(resData.message || 'Failed to Delete the user');
            }

            setIsLoading(false);
            setUsers(users.filter(user => user._id !== userId));
            toast.success(resData.message || 'User Deleted Succesfully');
        } catch (err) {
            setIsLoading(false);
            console.log('Failed to Delete the User|Frontend: ', err.message);
            toast.error(err.message || 'Failed to Delete the User');
            return;
        }
    };

    return (
        <div className="p-6 bg-gray-900 min-h-screen text-white">
            {isLoading &&
                <div className="loading-overlay">
                    <p className="relative">
                        <span className="loading loading-dots loading-lg text-primary"></span>
                    </p>
                </div>
            }
            <h2 className="text-2xl font-bold mb-6 text-center">Manage Users</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-800 rounded-lg shadow-md">
                    <thead>
                        <tr className="bg-gray-700 text-left">
                            <th className="py-3 px-6 border-b border-gray-600">Avatar</th>
                            <th className="py-3 px-6 border-b border-gray-600">Name</th>
                            <th className="py-3 px-6 border-b border-gray-600">Email</th>
                            <th className="py-3 px-6 border-b border-gray-600">Mobile Number</th>
                            <th className="py-3 px-6 border-b border-gray-600">Role</th>
                            <th className="py-3 px-6 border-b border-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && users.map(user => (
                            <tr key={user._id} className="hover:bg-gray-700 transition duration-300">
                                <td className="py-3 px-6 border-b border-gray-600 flex items-center">
                                    <img src={user.image} alt="" className='w-10 h-10 rounded-full border-2 border-gray-500' />
                                </td>
                                <td className="py-3 px-6 border-b border-gray-600">{user.username}</td>
                                <td className="py-3 px-6 border-b border-gray-600">{user.email}</td>
                                <td className="py-3 px-6 border-b border-gray-600">{user.contactNumber || 'Not Available'}</td>
                                <td className="py-3 px-6 border-b border-gray-600">{user.userRole}</td>
                                <td className="py-3 px-6 border-b border-gray-600 flex space-x-2">
                                    <button
                                        onClick={() => handleChangeRole(user._id)}
                                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-200"
                                    >
                                        Change Role
                                    </button>
                                    <button
                                        onClick={() => handleDeleteUser(user._id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200 flex items-center"
                                    >
                                        <FaTrashAlt />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
