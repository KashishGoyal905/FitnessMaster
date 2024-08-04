import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';


export default function ManageClasses() {
    const [classes, setClasses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedClass, setSelectedClass] = useState(null);

    // View Users:
    const [openUserDialog, setOpenUserDialog] = useState(false);
    const [enrolledUsers, setEnrolledUsers] = useState([]);

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

    // Edit
    const handleEdit = (classe) => {
        setSelectedClass(classe);
        setOpenDialog(true);
    };
    const handleCloseDialog = () => {
        setSelectedClass(null);
        setOpenDialog(false);
    };

    async function handleSave() {
        const formData = new FormData();
        formData.append('title', selectedClass.title);
        formData.append('description', selectedClass.description);
        formData.append('instructor', selectedClass.instructor);
        formData.append('time', selectedClass.time);
        formData.append('cost', selectedClass.cost);
        formData.append('phase', selectedClass.phase);

        if (selectedClass.image) {
            formData.append('image', selectedClass.image); // Append the image file if selected
        }

        try {
            setIsLoading(true);
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/class/${selectedClass._id}`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const data = await response.json();
            setIsLoading(false);

            if (!response.ok) {
                throw new Error(data.message || 'Failed to update the class');
            }

            toast.success(data.message || 'Class updated successfully');
            setClasses(prevClasses => prevClasses.map(c => c._id === data.class._id ? data.class : c));
            handleCloseDialog();
        } catch (err) {
            setIsLoading(false);
            toast.error(err.message || 'Failed to update the class');
        }
    };

    // View Users
    const handleViewUsers = async (classId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/class/${classId}/users`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            const data = await response.json();
            setEnrolledUsers(data.enrolledUsers);
            setOpenUserDialog(true);
        } catch (error) {
            console.error('Error fetching enrolled users:', error);
        }
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
                throw new Error(data.message || 'Failed to delete the class');
            }

            toast.success(data.message || 'Class deleted successfully');
            // Update the state to reflect the deleted class
            setClasses(prevClasses => prevClasses.filter(classe => classe._id !== classId));
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            console.log('Failed to delete the class|Frontend: ', err.message);
            toast.error(err.message || 'Failed to delete the class');
        }
    }

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
                {classes && classes.map((classe) => (
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
                                    onClick={() => handleEdit(classe)}
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
                                    to="#"
                                    onClick={() => handleViewUsers(classe._id)}
                                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
                                >
                                    View Users
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Dialog open={openUserDialog} onClose={() => setOpenUserDialog(false)} maxWidth="md" fullWidth>
                <DialogTitle>Enrolled Users</DialogTitle>
                <DialogContent dividers className="bg-gray-800">
                    {enrolledUsers.length > 0 ? (
                        <List>
                            {enrolledUsers.map((user) => (
                                <ListItem key={user._id} className="hover:bg-gray-700 transition duration-300">
                                    <ListItemAvatar>
                                        <Avatar src={user.image} alt={user.username} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={user.username}
                                        secondary={
                                            <>
                                                <span>Email: {user.email}</span><br />
                                                <span>Mobile: {user.contactNumber || 'Not Available'}</span><br />
                                                <span>Role: {user.userRole}</span>
                                            </>
                                        }
                                        style={{ color: 'white' }}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                        <p className="text-white">No users enrolled in this class.</p>
                    )}
                </DialogContent>
                <DialogActions className="bg-gray-900">
                    <Button onClick={() => setOpenUserDialog(false)} style={{ color: 'white', backgroundColor: '#6b7280' }}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            {selectedClass && (
                <Dialog
                    open={openDialog}
                    onClose={handleCloseDialog}
                    PaperProps={{
                        style: {
                            backgroundColor: '#1a202c', // Tailwind's bg-gray-900
                            color: 'white', // Tailwind's text-white
                        },
                    }}
                >
                    <DialogTitle>Edit Class</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Title"
                            fullWidth
                            margin="normal"
                            value={selectedClass.title}
                            onChange={(e) => setSelectedClass({ ...selectedClass, title: e.target.value })}
                            InputProps={{
                                style: {
                                    backgroundColor: '#4a5568', // Tailwind's bg-gray-700
                                    color: 'white',
                                },
                            }}
                            InputLabelProps={{
                                style: { color: 'white' },
                            }}
                        />
                        <TextField
                            label="Description"
                            fullWidth
                            margin="normal"
                            value={selectedClass.description}
                            onChange={(e) => setSelectedClass({ ...selectedClass, description: e.target.value })}
                            InputProps={{
                                style: {
                                    backgroundColor: '#4a5568', // Tailwind's bg-gray-700
                                    color: 'white',
                                },
                            }}
                            InputLabelProps={{
                                style: { color: 'white' },
                            }}
                        />
                        <TextField
                            label="Instructor"
                            fullWidth
                            margin="normal"
                            value={selectedClass.instructor}
                            onChange={(e) => setSelectedClass({ ...selectedClass, instructor: e.target.value })}
                            InputProps={{
                                style: {
                                    backgroundColor: '#4a5568', // Tailwind's bg-gray-700
                                    color: 'white',
                                },
                            }}
                            InputLabelProps={{
                                style: { color: 'white' },
                            }}
                        />
                        <TextField
                            label="Time"
                            fullWidth
                            margin="normal"
                            type="time"
                            value={selectedClass.time}
                            onChange={(e) => setSelectedClass({ ...selectedClass, time: e.target.value })}
                            InputProps={{
                                style: {
                                    backgroundColor: '#4a5568', // Tailwind's bg-gray-700
                                    color: 'white',
                                },
                            }}
                            InputLabelProps={{
                                style: { color: 'white' },
                            }}
                        />
                        <TextField
                            label="Cost"
                            fullWidth
                            margin="normal"
                            type="number"
                            value={selectedClass.cost}
                            onChange={(e) => setSelectedClass({ ...selectedClass, cost: e.target.value })}
                            InputProps={{
                                style: {
                                    backgroundColor: '#4a5568', // Tailwind's bg-gray-700
                                    color: 'white',
                                },
                            }}
                            InputLabelProps={{
                                style: { color: 'white' },
                            }}
                        />
                        <input
                            accept="image/*"
                            type="file"
                            onChange={(e) => setSelectedClass({ ...selectedClass, image: e.target.files[0] })}
                            className="w-full mt-2 mb-4 p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <TextField
                            label="Phase"
                            fullWidth
                            margin="normal"
                            select
                            SelectProps={{
                                native: true,
                                style: {
                                    backgroundColor: '#4a5568', // Tailwind's bg-gray-700
                                    color: 'white',
                                },
                            }}
                            value={selectedClass.phase}
                            onChange={(e) => setSelectedClass({ ...selectedClass, phase: e.target.value })}
                            InputProps={{
                                style: {
                                    backgroundColor: '#4a5568', // Tailwind's bg-gray-700
                                    color: 'white',
                                },
                            }}
                            InputLabelProps={{
                                style: { color: 'white' },
                            }}
                        >
                            <option value="morning" style={{ backgroundColor: '#4a5568', color: 'white' }}>Morning</option>
                            <option value="afternoon" style={{ backgroundColor: '#4a5568', color: 'white' }}>Afternoon</option>
                            <option value="evening" style={{ backgroundColor: '#4a5568', color: 'white' }}>Evening</option>
                        </TextField>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} style={{ color: 'white', backgroundColor: '#6b7280' }}>
                            Cancel
                        </Button>
                        <Button onClick={handleSave} style={{ color: 'white', backgroundColor: '#3b82f6' }}>
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </div>
    );
}
