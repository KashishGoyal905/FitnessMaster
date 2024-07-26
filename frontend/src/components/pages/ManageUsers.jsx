import React, { useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';

// Toast messages
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ManageUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch users from the API
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/users`);
                const data = await response.json();
                console.log(data.userdata);
                setUsers(data.userdata);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleChangeRole = (userId) => {
        // Implement change role logic here
        console.log(`Change role for user ID: ${userId}`);
    };

    async function handleDeleteUser(userId) {
        // Implement delete user logic here
        console.log(`Delete user ID: ${userId}`);
        // Confirming
        if (!window.confirm("Are you sure you want to delete your account?")) return;

        try {
            setLoading(true);
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const resData = await response.json();

            if (!response.ok) {
                setLoading(false);
                throw new Error(resData.message || 'Failed to Login');
            }

            setLoading(false);
            toast.success(resData.message || 'User Deleted Succesfully');
        } catch (err) {
            setLoading(false);
            console.log('Failed to Delete the User|Frontend: ', err.message);
            toast.error(err.message || 'Failed to Delete the User');
            return;
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="p-6 bg-gray-900 min-h-screen text-white">
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
