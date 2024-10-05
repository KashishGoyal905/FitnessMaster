import { useEffect, useState } from "react";
import ClassCard from "../utils/ClassCard";

// Toast messages
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Classes() {
  // States to store classes based on phases
  const [morningClasses, setMorningClasses] = useState([]);
  const [afternoonClasses, setAfternoonClasses] = useState([]);
  const [eveningClasses, setEveningClasses] = useState([]);
  // Loading State
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Function to fetch classes based on phase
    const fetchClasses = async (phase, setState) => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/class?phase=${phase}`);
        const data = await response.json();

        if (!response.ok) {
          setIsLoading(false);
          throw new Error(data.message || 'Failed to retrieve the classes');
        }
        
        setIsLoading(false);
        setState(data.classes);
      } catch (error) {
        setIsLoading(false);
        console.error(`Failed to fetch ${phase} classes:`, error);
        toast.error('Failed to retrieve the classes');
      }
    };

    // Fetching classes for all phases
    Promise.all([
      fetchClasses('morning', setMorningClasses),
      fetchClasses('afternoon', setAfternoonClasses),
      fetchClasses('evening', setEveningClasses),
    ]).then(() => setIsLoading(false));
  }, []);

  return (
    <div className="classes-page pt-[5rem] bg-gray-900 text-white min-h-screen">
      {isLoading &&
        <div className="loading-overlay flex justify-center items-center h-[60vh]">
          <p className="relative">
            <span className="loading loading-dots loading-lg text-purple-500"></span>
          </p>
        </div>
      }

      {/* Header */}
      <div className="container mx-auto py-6 md:py-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-purple-500 mb-2">Our All Classes</h2>
        <p className='text-xl md:text-2xl text-gray-300 mb-8'>Choose a time that suits you best</p>
      </div>

      {/* Morning Classes */}
      <div className="class-section bg-gray-800 py-10">
        <h3 className="text-2xl font-bold text-center text-gray-300 mb-6">Morning Classes</h3>
        <div className="flex px-4 md:px-12 my-6 justify-around flex-wrap">
          {morningClasses && morningClasses.map((classInfo, index) => (
            <ClassCard
              key={index}
              image={classInfo.image}
              title={classInfo.title}
              description={classInfo.description}
              time={classInfo.time}
              instructor={classInfo.instructor}
              cost={classInfo.cost}
              id={classInfo._id}
            />
          ))}
        </div>
      </div>

      {/* Afternoon Classes */}
      <div className="class-section bg-gray-900 py-10">
        <h3 className="text-2xl font-bold text-center text-gray-300 mb-6">Afternoon Classes</h3>
        <div className="flex px-4 md:px-12 my-6 justify-around flex-wrap">
          {afternoonClasses && afternoonClasses.map((classInfo, index) => (
            <ClassCard
              key={index}
              image={classInfo.image}
              title={classInfo.title}
              description={classInfo.description}
              time={classInfo.time}
              instructor={classInfo.instructor}
              cost={classInfo.cost}
              id={classInfo._id}
            />
          ))}
        </div>
      </div>

      {/* Evening Classes */}
      <div className="class-section bg-gray-800 py-10">
        <h3 className="text-2xl font-bold text-center text-gray-300 mb-6">Evening Classes</h3>
        <div className="flex px-4 md:px-12 my-6 justify-around flex-wrap">
          {eveningClasses && eveningClasses.map((classInfo, index) => (
            <ClassCard
              key={index}
              image={classInfo.image}
              title={classInfo.title}
              description={classInfo.description}
              time={classInfo.time}
              instructor={classInfo.instructor}
              cost={classInfo.cost}
              id={classInfo._id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
