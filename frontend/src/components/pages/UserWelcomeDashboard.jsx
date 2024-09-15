import React, { useContext, useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import authContext from '../../context/AuthContext';
import AttendanceChart from '../Charts/AttendanceChart.jsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaCalendarAlt, FaCheckCircle } from 'react-icons/fa';

export default function UserWelcomeDashboard() {
  const { user } = useContext(authContext);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/attendance/${user._id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setAttendance(data.attendance);
        } else {
          console.error('Failed to fetch attendance:', data.message);
        }
      } catch (err) {
        console.error('Error fetching attendance:', err.message);
      }
    };

    fetchAttendance();
  }, [user._id]);

  const markAttendance = async (date) => {
    if (new Date().toDateString() === date.toDateString()) {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/mark-attendance/${user._id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({ date: date.toDateString(), status: 'present' }),
        });

        const data = await response.json();
        if (response.ok) {
          setAttendance([...attendance, { date: date.toDateString(), status: 'present' }]);
          toast.success(`Attendance marked for ${date.toDateString()}`);
        } else {
          throw new Error(data.message || 'Failed to mark attendance');
        }
      } catch (err) {
        console.error(err.message);
        toast.error(err.message || 'Error marking attendance');
      }
    } else {
      alert('You can only mark attendance for today.');
    }
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const attendanceForDate = attendance.find(
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
        return <div className="flex justify-center items-center rounded-full w-2 h-2 mx-auto mt-1 bg-red-400"></div>;
      }
    }
    return null;
  };

  return (
    <div className="container mx-auto p-8 bg-gray-900 text-white min-h-screen">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-purple-500">
          Welcome, {user.username}
        </h1>
        <p className="md:text-xl mt-4 mb-2 text-gray-300 italic">
          "Success is the sum of small efforts, repeated day in and day out."
        </p>
        <hr className="border-t-2 border-purple-600 mx-auto w-3/4" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Calendar for Attendance */}
        <div className="bg-gray-800 p-8 rounded-lg shadow-xl hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1">
          <h2 className="text-3xl font-bold mb-6 text-center flex items-center justify-center">
            <FaCalendarAlt className="mr-2" /> Your Attendance
          </h2>
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            className="bg-gray-700 text-white rounded-lg calendar-dark mx-auto shadow-md"
            tileContent={tileContent}
          />
        </div>

        {/* Mark Attendance & Message */}
        <div className="bg-gray-800 p-8 rounded-lg shadow-xl hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1 text-center">
          <h2 className="text-3xl font-bold mb-6 flex items-center justify-center">
            <FaCheckCircle className="mr-2" /> Mark Attendance
          </h2>
          {new Date().toDateString() === selectedDate.toDateString() ? (
            attendance.find((att) => new Date(att.date).toDateString() === selectedDate.toDateString()) ? (
              <p className="text-green-400 text-xl md:text-2xl">Attendance already marked for today!</p>
            ) : (
              <button
                onClick={() => markAttendance(selectedDate)}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-200 ease-in-out"
              >
                Mark Attendance for Today
              </button>
            )
          ) : (
            <p className="text-red-400 text-xl md:text-2xl">You can only mark attendance for today.</p>
          )}
        </div>
      </div>

      {/* Attendance Chart */}
      <div className="mt-10 bg-gray-800 p-8 rounded-lg shadow-xl">
        <AttendanceChart userId={user._id} />
      </div>
    </div>
  );
} 