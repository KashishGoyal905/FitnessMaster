import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

export default function ManageClasses() {
    const [classes, setClasses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/class/getAllClasses`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Failed to fetch the Classes');
                }

                setClasses(data.classes);
                setIsLoading(false);
            } catch (err) {
                setIsLoading(false);
                console.log('Failed to fetch the Classes|Frontend: ', err.message);
                toast.error(err.message || 'Failed to fetch the Classes');
            }
        };

        fetchClasses();
    }, [token]);

    const handleEdit = (classId) => {
        console.log(`Edit class with ID: ${classId}`);
    };

    async function handleDelete(classId) {
        // Confirming
        if (!window.confirm("Are you sure you want to delete this class?")) return;

        try {
            setIsLoading(true);
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/class/${classId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to Delete the class');
            }

            toast.success(data.message || 'Class deleted successfully');
            // Update the state to reflect the deleted class
            setClasses(prevClasses => prevClasses.filter(classe => classe._id !== classId));
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            console.log('Failed to Delete the class|Frontend: ', err.message);
            toast.error(err.message || 'Failed to Delete the class');
        }

    };

    return (
        <div className="p-6 bg-gray-900 min-h-screen text-white">
            {isLoading && (
                <div className="loading-overlay">
                    <p className="relative">
                        <span className="loading loading-dots loading-lg text-primary"></span>
                    </p>
                </div>
            )}
            <h1 className="text-3xl font-bold mb-6 text-center">Manage Classes</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {classes.map((classe) => (
                    <div
                        key={classe._id}
                        className="card shadow-lg p-4 rounded-lg bg-gray-800 transition-transform transform hover:scale-105"
                    >
                        <figure className="w-full h-48 overflow-hidden rounded-t-lg">
                            <img
                                src={classe.image}
                                alt={classe.title}
                                className="w-full h-full object-cover"
                            />
                        </figure>
                        <div className="card-body text-white">
                            <h2 className="text-xl font-bold mb-2">{classe.title}</h2>
                            <p className="text-sm mb-4">{classe.description}</p>
                            <p className="text-sm font-semibold">Instructor: {classe.instructor}</p>
                            <p className="text-sm mb-4">Time: {classe.time}</p>
                            <div className="flex justify-between items-center mt-4">
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                                    onClick={() => handleEdit(classe._id)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
                                    onClick={() => handleDelete(classe._id)}
                                >
                                    Delete
                                </button>
                                <Link
                                    to={`/dashboard/class/${classe._id}/users`}
                                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
                                >
                                    View Users
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
