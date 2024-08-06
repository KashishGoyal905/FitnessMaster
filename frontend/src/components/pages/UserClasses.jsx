import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useRoleRedirect from '../../middleware/useRoleRedirect';

export default function UserClasses() {
  // To restrict the user with 'admin' role to acess this page
  useRoleRedirect(['user'], '/');
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    // Fetch enrolled classes from the API
    const fetchEnrolledClasses = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/enrolled-classes`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch enrolled classes');
        }

        setEnrolledClasses(data.enrolledClasses);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        console.error('Failed to fetch enrolled classes:', err.message);
        toast.error(err.message || 'Failed to fetch enrolled classes');
      }
    };

    fetchEnrolledClasses();
  }, [token]);

  // UnEnroll from the class
  async function handleUnEnroll(classId) {
    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/Unenroll/${classId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to Unenroll from the class');
      }

      // Correctly update the state by filtering out the unenrolled class
      setEnrolledClasses(prevEnrolledClasses => prevEnrolledClasses.filter(c => c._id !== classId));  
      toast.success(data.message || 'Successfully Unenrolled from the class');
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.error('Failed to Unenroll from the class:', err.message);
      toast.error(err.message || 'Failed to Unenroll from the class');
    }
  }

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      {isLoading &&
        <div className="loading-overlay">
          <p className="relative">
            <span className="loading loading-dots loading-lg text-primary"></span>
          </p>
        </div>
      }
      <h2 className="text-2xl font-bold mb-6 text-center">My Enrolled Classes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrolledClasses && enrolledClasses.map((classData) => (
          <div key={classData._id} className="card glass my-4 w-full h-[34rem] rounded-lg shadow-lg overflow-hidden md:transform md:transition-transform md:hover:scale-105">
            <figure className="w-full h-64 overflow-hidden">
              <img src={classData.image} alt={classData.title} className="w-full h-full object-cover" />
            </figure>
            <div className="card-body p-4">
              <h2 className="text-xl md:text-2xl font-bold text-center mb-2">{classData.title}</h2>
              <p className="text-center mb-4">{classData.description}</p>
              <p className="text-center font-semibold mb-2">Time: {classData.time}</p>
              <p className="text-center mb-4">Instructor: {classData.instructor}</p>
            </div>
            <button
              onClick={() => handleUnEnroll(classData._id)}
              className="bg-red-700 w-1/2 mx-auto text-white px-6 py-2 rounded-lg hover:bg-red-600 transition duration-200 transform hover:scale-105"
            >
              Unenroll
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}