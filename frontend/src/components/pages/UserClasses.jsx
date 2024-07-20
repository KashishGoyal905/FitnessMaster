import React from 'react'

export default function UserClasses() {
  const classes = [
    { id: 1, name: 'Yoga Class', date: '27th June' },
    { id: 2, name: 'Cardio Class', date: '28th June' },
    { id: 3, name: 'Strength Training', date: '29th June' },
  ];

  return (
    <div className="p-4">
      <div className="w-full min-h-8 mb-4">
        <h1 className="text-5xl text-center font-bold text-primary">Your Classes</h1>
        <hr className="mt-2 border-primary" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {classes.map((cls) => (
          <div key={cls.id} className="bg-white p-4 rounded shadow">
            <h2 className="text-2xl font-bold mb-2">{cls.name}</h2>
            <p>{cls.date}</p>
            <button
              className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => console.log(`Unenroll from ${cls.name}`)}
            >
              Unenroll
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
