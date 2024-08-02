import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useRoleRedirect from '../../middleware/useRoleRedirect';

export default function CreateClass() {
  // Restrict access to this page to admin users only
  useRoleRedirect(['admin'], '/');

  const [isLoading, setIsLoading] = useState(false);

  const handleCreateClass = async (e) => {
    e.preventDefault();

    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());
    console.log('New Class Details: ', data);

    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/class/create`, {
        method: 'POST',
        body: fd,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      const resData = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        throw new Error(resData.message || 'Failed to create class');
      }

      toast.success('Class created successfully!');
      setIsLoading(false);
      // navigate('/dashboard/manage-classes'); // Redirect to a classes management page if you have one
    } catch (error) {
      console.error('Error creating class:', error);
      setIsLoading(false);
      toast.error(error.message || 'Failed to create class');
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
      <h2 className="text-2xl font-bold mb-6 text-center">Create Class</h2>
      <form onSubmit={handleCreateClass} method='post' encType="multipart/form-data" className="max-w-2xl mx-auto p-4 bg-gray-800 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            name="title"
            className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Description</label>
          <input
            type="text"
            name="description"
            className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Instructor Name</label>
          <input
            type="text"
            name="instructor"
            className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Time</label>
          <input
            type="time"
            name="time"
            className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Cost</label>
          <input
            type="number"
            name="cost"
            className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Phase of Day</label>
          <select
            name="phase"
            className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Class Image</label>
          <input
            type="file"
            name="image"
            className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Create Class
          </button>
        </div>
      </form>
    </div>
  );
}
