import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UserDetails() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/${userId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setUser(data);
        } else {
          toast.error('Failed to fetch user details.');
        }
      } catch (error) {
        toast.error('Error fetching user details.');
      }
    };

    fetchUserDetails();
  }, [userId]);

  const calculateBMI = (weight, height) => {
    if (weight && height) {
      const heightInMeters = height * 0.3048;
      return (weight / (heightInMeters * heightInMeters)).toFixed(1);
    }
    return 'N/A';
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month' && user) {
      const attendanceForDate = user.attendance.find(
        (att) => new Date(att.date).toDateString() === date.toDateString()
      );

      if (attendanceForDate) {
        return (
          <div
            className={`flex justify-center items-center rounded-full w-2 h-2 mx-auto mt-1 
              ${attendanceForDate.status === 'present' ? 'bg-green-400' : 'bg-red-400'}
            `}
          ></div>
        );
      } else if (date < new Date()) {
        // Mark missed days with a red dot
        return (
          <div className="flex justify-center items-center rounded-full w-2 h-2 mx-auto mt-1 bg-red-400"></div>
        );
      }
    }
    return null;
  };

  return user ? (
    <div className="container mx-auto p-4 sm:p-6 bg-gray-900 text-white min-h-screen">
      {/* Profile Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div className="flex items-center space-x-4 sm:space-x-6">
          <img
            src={user.image || '/default-profile.png'}
            alt="Profile"
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full shadow-lg"
          />
          <div>
            <h1 className="text-2xl sm:text-4xl font-bold">{user.username}</h1>
            <p className="text-lg sm:text-xl text-gray-400">{user.email}</p>
          </div>
        </div>

        {/* Badges for Active/Inactive and Role */}
        <div className="flex flex-row items-end space-x-4 sm:space-x-6 mt-4 sm:mt-0">
          <span className={`px-2 py-1 sm:px-3 sm:py-1 rounded-full text-sm font-semibold ${user.isActive ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
            {user.isActive ? 'Active' : 'Inactive'}
          </span>
          <span className="px-2 py-1 sm:px-3 sm:py-1 rounded-full text-sm font-semibold bg-purple-600 text-white">
            {user.userRole}
          </span>
        </div>
      </div>

      {/* Last Login with subtle styling */}
      <div className="flex items-center mt-4 text-gray-400">
        <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path d="M13 7h5l-6 6-6-6h5V3h2v4z" />
        </svg>
        <p>Last Login: {new Date(user.lastLogin).toLocaleString()}</p>
      </div>

      {/* Personal Information */}
      <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Personal Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <p><strong>Contact Number:</strong> {user.contactNumber || 'N/A'}</p>
            <p><strong>Gender:</strong> {user.gender || 'N/A'}</p>
            <p><strong>Age:</strong> {user.age || 'N/A'}</p>
          </div>
          <div>
            <p><strong>Address:</strong> {user.address || 'N/A'}</p>
            <p><strong>City:</strong> {user.city || 'N/A'}</p>
            <p><strong>State:</strong> {user.state || 'N/A'}</p>
            <p><strong>Postal Code:</strong> {user.postalcode || 'N/A'}</p>
          </div>
        </div>
      </div>

      {/* Fitness Information */}
      <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Fitness Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <p><strong>Weight:</strong> {user.weight || 'N/A'} kg</p>
            <p><strong>Height:</strong> {user.height || 'N/A'} feet</p>
            <p><strong>BMI:</strong> {calculateBMI(user.weight, user.height)}</p>
          </div>
          <div>
            <p><strong>Fitness Goals:</strong> {user.goals || 'N/A'}</p>
            <p><strong>Enrolled Classes:</strong></p>
            <ul className="list-disc ml-5">
              {user.enrolledClasses.length > 0 ? (
                user.enrolledClasses.map((cls) => (
                  <li key={cls._id} className='text-white'>{cls.title}</li>
                ))
              ) : (
                <p>No classes enrolled.</p>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Attendance Calendar */}
      <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center">Attendance</h2>
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          className="bg-slate-950 rounded-lg text-white calendar-dark mx-auto"
          tileContent={tileContent}
        />
      </div>

      {/* Admin Actions */}
      <div className="mt-6 sm:mt-8 text-center">
        <button
          disabled
          className="bg-red-600 hover:bg-red-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg mr-4"
          onClick={() => {/* Deactivate user */ }}
        >
          Delete User
        </button>
        <button
          disabled
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg"
          onClick={() => {/* Reset Password */ }}
        >
          Change Role
        </button>
      </div>
    </div>
  ) : (
    <p>Loading user details...</p>
  );
}
