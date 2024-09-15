import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

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
          const dates = data.map(item => item.date.split('T')[0]);
          const statuses = data.map(item => (item.status === 'present' ? 1 : 0));

          setChartData({
            labels: dates,
            datasets: [
              {
                label: 'Attendance Status',
                data: statuses,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                tension: 0.4,
                pointBackgroundColor: statuses.map((status) => status === 1 ? 'rgba(0, 255, 0, 0.7)' : 'rgba(255, 0, 0, 0.7)'),
                pointBorderWidth: 2,
                hoverBorderWidth: 3,
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
    return <p className="text-center text-white">Loading chart...</p>;
  }

  if (error) {
    return <p className="text-center text-red-400">{error}</p>;
  }

  return (
    <div className="attendance-chart bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl text-center text-purple-500 mb-4">Attendance Overview</h2>
      <Line
        data={chartData}
        options={{
          scales: {
            y: {
              ticks: {
                callback: function (value) {
                  return value === 1 ? 'Present' : 'Absent';
                }
              },
              beginAtZero: true,
              suggestedMax: 1,
            }
          },
          plugins: {
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              callbacks: {
                label: function (context) {
                  return context.raw === 1 ? 'Present' : 'Absent';
                }
              }
            }
          },
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            duration: 1000,
            easing: 'easeInOutQuad'
          }
        }}
        height={100}
      />
    </div>
  );
}