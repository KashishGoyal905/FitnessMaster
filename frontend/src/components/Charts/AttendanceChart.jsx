import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

// Chart component
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
          // Format attendance data for the chart
          const dates = data.map(item => item.date.split('T')[0]); // Extract just the date part
          const statuses = data.map(item => (item.status === 'present' ? 1 : 0)); // Present = 1, Absent = 0

          setChartData({
            labels: dates, // Dates as x-axis labels
            datasets: [
              {
                label: 'Attendance Status',
                data: statuses, // 1 for present, 0 for absent
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                tension: 0.4, // Smoother curve
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
    return <p>Loading chart...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="attendance-chart">
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
              callbacks: {
                label: function (context) {
                  return context.raw === 1 ? 'Present' : 'Absent';
                }
              }
            }
          }
        }}
      />
    </div>
  );
}
