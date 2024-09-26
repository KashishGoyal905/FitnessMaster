import React, { useContext, useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import authContext from '../../context/AuthContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend as ChartLegend } from 'chart.js';
import 'react-toastify/dist/ReactToastify.css';

ChartJS.register(ArcElement, ChartTooltip, ChartLegend);

export default function UserWelcomeDashboard() {
  const { user } = useContext(authContext);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [attendance, setAttendance] = useState([]);
  const [metrics, setMetrics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

    const fetchMetrics = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/metrics/${user._id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setMetrics(data.metrics); // Assuming your backend sends a 'metrics' field with the array of metrics data
        } else {
          console.error('Failed to fetch metrics:', data.message);
        }
      } catch (err) {
        console.error('Error fetching metrics:', err.message);
      }
    };

    fetchAttendance();
    fetchMetrics();
  }, [user._id]);

  const markAttendance = async (date) => {
    if (new Date().toDateString() === date.toDateString()) {
      try {
        setIsLoading(true);
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
        } else {
          throw new Error(data.message || 'Failed to mark attendance');
        }
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        console.error(err.message);
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
        return (
          <div className="flex justify-center items-center rounded-full w-2 h-2 mx-auto mt-1 bg-red-400"></div>
        );
      }
    }
    return null;
  };

  const renderChart = (field, label) => {
    if (!metrics.length) {
      return <p className="text-gray-400">No data available for {label}.</p>;
    }

    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={metrics} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={field} stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  const attendanceData = {
    labels: ['Present', 'Absent'],
    datasets: [
      {
        data: [
          attendance.filter((att) => att.status === 'present').length,
          attendance.filter((att) => att.status === 'absent').length,
        ],
        backgroundColor: ['#4CAF50', '#FF5252'],
        hoverBackgroundColor: ['#45a049', '#ff4040'],
      },
    ],
  };

  return (
    <div className="container mx-auto p-8 bg-gray-900 text-white min-h-screen">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-purple-600">
          Welcome, {user.username}
        </h1>
        <p className="mt-4 mb-2 text-gray-300 italic">
          "Success is the sum of small efforts, repeated day in and day out."
        </p>
        <hr className="border-t-2 border-purple-600 mx-auto w-3/4" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {isLoading && (
          <div className="loading-overlay">
            <p className="relative">
              <span className="loading loading-dots loading-lg text-primary"></span>
            </p>
          </div>
        )}

        <div className="bg-gray-800 p-8 rounded-lg shadow-xl transition duration-300 hover:shadow-2xl">
          <h2 className="text-2xl font-bold text-center">Your Attendance</h2>
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            className="bg-gray-700 text-white rounded-lg calendar-dark mx-auto shadow-md mt-6"
            tileContent={tileContent}
          />
          <div className="mt-6 text-center">
            {new Date().toDateString() === selectedDate.toDateString() ? (
              attendance.find((att) => new Date(att.date).toDateString() === selectedDate.toDateString()) ? (
                <p className="text-green-400 text-sm">Attendance already marked for today!</p>
              ) : (
                <button
                  onClick={() => markAttendance(selectedDate)}
                  className="bg-red-700 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition duration-300 transform hover:scale-110 shadow-lg"
                >
                  Mark Attendance for Today
                </button>
              )
            ) : (
              <p className="text-red-500">You can only mark attendance for today.</p>
            )}
          </div>
        </div>

        <div className="bg-gray-800 p-8 rounded-lg shadow-xl transition duration-300 hover:shadow-2xl">
          <h2 className="text-2xl font-bold text-center">Attendance Overview</h2>
          {attendance.length ? (
            <Pie data={attendanceData} />
          ) : (
            <p className="text-gray-400">No attendance data available yet.</p>
          )}
        </div>

        <div className="bg-gray-800 p-8 rounded-lg shadow-xl transition duration-300 hover:shadow-2xl">
          <h2 className="text-2xl font-bold text-center">Weight Progress</h2>
          {renderChart('weight', 'Weight')}
        </div>

        <div className="bg-gray-800 p-8 rounded-lg shadow-xl transition duration-300 hover:shadow-2xl">
          <h2 className="text-2xl font-bold text-center">Waist Size Progress</h2>
          {renderChart('waistSize', 'Waist Size')}
        </div>

        <div className="bg-gray-800 p-8 rounded-lg shadow-xl transition duration-300 hover:shadow-2xl">
          <h2 className="text-2xl font-bold text-center">Thigh Size Progress</h2>
          {renderChart('thighSize', 'Thigh Size')}
        </div>

        <div className="bg-gray-800 p-8 rounded-lg shadow-xl transition duration-300 hover:shadow-2xl">
          <h2 className="text-2xl font-bold text-center">Chest Size Progress</h2>
          {renderChart('chestSize', 'Chest Size')}
        </div>
      </div>
    </div>
  );
}