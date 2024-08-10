import React, { useContext, useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import authContext from '../../context/AuthContext';

export default function UserWelcomeDashboard() {
  const { user } = useContext(authContext);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [attendanceMarked, setAttendanceMarked] = useState(false);

  // Fetch the attendance status for today when the component mounts
  useEffect(() => {
    const fetchAttendanceStatus = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/check-attendance/${user._id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ date: new Date().toDateString() })
        });

        const data = await response.json();
        if (response.ok) {
          setAttendanceMarked(data.attendanceMarked);
        } else {
          console.error('Failed to fetch attendance status:', data.message);
        }
      } catch (err) {
        console.error('Error fetching attendance status:', err.message);
      }
    };

    fetchAttendanceStatus();
  });

  // Function to handle attendance marking
  const markAttendance = async (date) => {
    // Allow marking attendance only for today
    if (new Date().toDateString() === date.toDateString()) {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/mark-attendance/${user._id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ date: date.toDateString(), status: 'present' }) // Include status
        });

        const data = await response.json();
        if (response.ok) {
          setAttendanceMarked(true);
          alert(`Attendance marked for ${date.toDateString()}`);
        } else {
          throw new Error(data.message || 'Failed to mark attendance');
        }
      } catch (err) {
        console.error(err.message);
        alert('Error marking attendance');
      }
    } else {
      alert('You can only mark attendance for today.');
    }
  };

  return (
    <div className="container mx-auto p-4 bg-gray-900 text-white min-h-screen">
      <div className="text-center">
        <h1 className="text-5xl">Welcome, {user.username}</h1>
        <p className="text-xl mt-2 mb-2 text-purple-500">Make the most of today!</p>
        <hr className="mb-8" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Calendar for Attendance */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-4 text-center">Your Attendance</h2>
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            className="bg-white rounded-lg text-black"
            onClickDay={(date) => markAttendance(date)}
          />
        </div>

        {/* Mark Attendance & Message */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-3xl font-bold mb-4">Mark Attendance</h2>
          {new Date().toDateString() === selectedDate.toDateString() ? (
            attendanceMarked ? (
              <p className="text-green-500 text-xl">Attendance already marked for today!</p>
            ) : (
              <button
                onClick={() => markAttendance(selectedDate)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition duration-300 transform hover:scale-105"
              >
                Mark Attendance for Today
              </button>
            )
          ) : (
            <p className="text-red-500 text-xl">You can only mark attendance for today.</p>
          )}
        </div>
      </div>
    </div>
  );
}