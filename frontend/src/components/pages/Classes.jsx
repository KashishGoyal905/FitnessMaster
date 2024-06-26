import ClassCard from "../utils/ClassCard";

export default function Classes() {
  const classes = {
    morning: [
      {
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG1lZGl0YXRpb258ZW58MHx8MHx8fDA%3D',
        title: 'Morning Yoga',
        description: 'Start your day with a refreshing yoga session.',
        time: '6:00 AM - 7:00 AM',
        instructor: 'Neelam',
      },
      {
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG1lZGl0YXRpb258ZW58MHx8MHx8fDA%3D',
        title: 'Morning Yoga',
        description: 'Start your day with a refreshing yoga session.',
        time: '6:00 AM - 7:00 AM',
        instructor: 'Neelam',
      },
      {
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG1lZGl0YXRpb258ZW58MHx8MHx8fDA%3D',
        title: 'Morning Yoga',
        description: 'Start your day with a refreshing yoga session.',
        time: '6:00 AM - 7:00 AM',
        instructor: 'Neelam',
      },
      // Add more morning classes here
    ],
    afternoon: [
      {
        image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGlsYXRlc3xlbnwwfHwwfHx8MA%3D%3D',
        title: 'Afternoon Pilates',
        description: 'Strengthen your core with our pilates class.',
        time: '12:00 PM - 1:00 PM',
        instructor: 'Neelam',
      },
      {
        image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGlsYXRlc3xlbnwwfHwwfHx8MA%3D%3D',
        title: 'Afternoon Pilates',
        description: 'Strengthen your core with our pilates class.',
        time: '12:00 PM - 1:00 PM',
        instructor: 'Neelam',
      },
      // Add more afternoon classes here
    ],
    evening: [
      {
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNhcmRpb3xlbnwwfHwwfHx8MA%3D%3D',
        title: 'Evening Cardio',
        description: 'Boost your endurance with evening cardio.',
        time: '6:00 PM - 7:00 PM',
        instructor: 'Neelam',
      },
      {
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNhcmRpb3xlbnwwfHwwfHx8MA%3D%3D',
        title: 'Evening Cardio',
        description: 'Boost your endurance with evening cardio.',
        time: '6:00 PM - 7:00 PM',
        instructor: 'Neelam',
      },
      // Add more evening classes here
    ],
  };

  return (
    <div className="classes-page pt-[5rem]">
      <div className="container mx-auto py-6 md:py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">Our All Classes</h2>
        <p className='text-2xl text-center mb-2 md:mb-8'>Choose a time that suits you best</p>
      </div>

      <div className="class-section bg-gray-800 py-8">
        <h3 className="text-2xl font-bold text-center mb-4">Morning Classes</h3>
        <div className="flex px-4 md:px-12 my-4 md:my-12 justify-around flex-wrap">
          {classes.morning.map((classInfo, index) => (
            <ClassCard key={index} {...classInfo} />
          ))}
        </div>
      </div>

      <div className="class-section py-8">
        <h3 className="text-2xl font-bold text-center mb-4">Afternoon Classes</h3>
        <div className="flex px-4 md:px-12 my-4 md:my-12 justify-around flex-wrap">
          {classes.afternoon.map((classInfo, index) => (
            <ClassCard key={index} {...classInfo} />
          ))}
        </div>
      </div>

      <div className="class-section bg-gray-800 py-8">
        <h3 className="text-2xl font-bold text-center mb-4">Evening Classes</h3>
        <div className="flex px-4 md:px-12 my-4 md:my-12 justify-around flex-wrap">
          {classes.evening.map((classInfo, index) => (
            <ClassCard key={index} {...classInfo} />
          ))}
        </div>
      </div>
    </div>
  );
}
