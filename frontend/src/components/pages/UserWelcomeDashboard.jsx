import React, { useContext, useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import authContext from '../../context/AuthContext';

// Toast messages
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UserWelcomeDashboard() {
  const { user } = useContext(authContext);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [attendance, setAttendance] = useState([]);

  // Fetch attendance history on component mount
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

          // Check if today’s attendance is already marked or not
          const today = new Date().toDateString();
          const attendanceToday = data.attendance.find(att => new Date(att.date).toDateString() === today);
          if (!attendanceToday) {
            // If no attendance marked today, add a red dot (absent) entry
            setAttendance(prev => [...prev, { date: today, status: 'absent' }]);
          }
        } else {
          console.error('Failed to fetch attendance:', data.message);
        }
      } catch (err) {
        console.error('Error fetching attendance:', err.message);
      }
    };

    fetchAttendance();
  }, [user._id]);

  // Mark attendance for today
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

  // Determine tile content based on attendance
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
        // Mark missed days with a red dot
        return (
          <div className="flex justify-center items-center rounded-full w-2 h-2 mx-auto mt-1 bg-red-400"></div>
        );
      }
    }
    return null;
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
            className="bg-slate-950 rounded-lg text-white calendar-dark mx-auto"
            tileContent={tileContent}
          // onClickDay={(date) => markAttendance(date)}
          />
        </div>

        {/* Mark Attendance & Message */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-3xl font-bold mb-4">Mark Attendance</h2>
          {new Date().toDateString() === selectedDate.toDateString() ? (
            attendance.find((att) => new Date(att.date).toDateString() === selectedDate.toDateString()) ? (
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