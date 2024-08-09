import React, { useContext, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import authContext from '../../context/AuthContext';

export default function UserWelcomeDashboard() {
  const { user } = useContext(authContext);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Function to handle attendance marking
  const markAttendance = (date) => {
    // Add logic to mark attendance (API call, etc.)
    alert(`Attendance marked for ${date.toDateString()}`);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="text-center">
        <h1 className="text-5xl">Welcome, {user.username}</h1>
        <p className="text-xl mt-2 mb-2 text-purple-500">Make the most of today!</p>
        <hr className="mb-8" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Calendar for Attendance */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-2xl font-bold mb-4">Your Attendance</h2>
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            onClickDay={markAttendance}
          />
        </div>

        {/* Upcoming Classes */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-2xl font-bold mb-4">Upcoming Classes</h2>
          <ul>
            {/* Fetch and map over upcoming classes */}
            <li>Yoga Class - 27th June</li>
            <li>Cardio Class - 28th June</li>
            <li>Strength Training - 29th June</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
