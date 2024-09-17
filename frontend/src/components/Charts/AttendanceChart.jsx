import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';

export default function AttendanceChart({ userId }) {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/${userId}/attendance`);
        const data = await response.json();

        if (response.ok) {
          const presentCount = data.filter(item => item.status === 'present').length;
          const absentCount = data.filter(item => item.status === 'absent').length;

          setChartData({
            labels: ['Present', 'Absent'],
            datasets: [
              {
                data: [presentCount, absentCount],
                backgroundColor: ['#4ADE80', '#F87171'], // Updated green and red
                hoverBackgroundColor: ['#22C55E', '#EF4444'], 
                borderWidth: 0,
              }
            ]
          });
          setLoading(false);
        } else {
          setError('Unable to fetch attendance data');
          setLoading(false);
        }
      } catch (err) {
        setError('Server error');
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [userId]);

  if (loading) {
    return <p className="text-white">Loading chart...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="chart-container bg-gray-800 p-6 rounded-lg shadow-lg text-white">
      <h2 className="text-center text-lg mb-4 text-purple-500">Attendance Summary</h2>
      <div className="chart-wrapper mx-auto mt-8">
        <Pie
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: true,
                position: 'bottom',
                labels: {
                  color: '#D1D5DB', // Light gray for legend text
                  padding: 20,
                  boxWidth: 12,
                  boxHeight: 12,
                  usePointStyle: true,
                }
              }
            }
          }}
        />
      </div>
    </div>
  );
}
