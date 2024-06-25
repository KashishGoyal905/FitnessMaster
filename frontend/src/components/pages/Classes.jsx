import ClassCard from "../utils/ClassCard";

export default function Classes() {
  const classes = {
    morning: [
      {
        image: 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg',
        title: 'Morning Yoga',
        description: 'Start your day with a refreshing yoga session.',
        time: '6:00 AM - 7:00 AM',
        instructor: 'Neelam',
      },
      {
        image: 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg',
        title: 'Morning Yoga',
        description: 'Start your day with a refreshing yoga session.',
        time: '6:00 AM - 7:00 AM',
        instructor: 'Neelam',
      },
      {
        image: 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg',
        title: 'Morning Yoga',
        description: 'Start your day with a refreshing yoga session.',
        time: '6:00 AM - 7:00 AM',
        instructor: 'Neelam',
      },
      // Add more morning classes here
    ],
    afternoon: [
      {
        image: 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg',
        title: 'Afternoon Pilates',
        description: 'Strengthen your core with our pilates class.',
        time: '12:00 PM - 1:00 PM',
        instructor: 'Neelam',
      },
      {
        image: 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg',
        title: 'Afternoon Pilates',
        description: 'Strengthen your core with our pilates class.',
        time: '12:00 PM - 1:00 PM',
        instructor: 'Neelam',
      },
      // Add more afternoon classes here
    ],
    evening: [
      {
        image: 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg',
        title: 'Evening Cardio',
        description: 'Boost your endurance with evening cardio.',
        time: '6:00 PM - 7:00 PM',
        instructor: 'Neelam',
      },
      {
        image: 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg',
        title: 'Evening Cardio',
        description: 'Boost your endurance with evening cardio.',
        time: '6:00 PM - 7:00 PM',
        instructor: 'Neelam',
      },
      // Add more evening classes here
    ],
  };

  return (
    <div className="classes-page pt-16">
      <div className="container mx-auto py-6 md:py-12">
        <h2 className="text-3xl font-bold text-center mb-2">Our Classes</h2>
        <p className='text-2xl text-center mb-2 md:mb-8'>Choose a time that suits you best</p>

        <div className="class-section">
          <h3 className="text-2xl font-bold mb-4 text-center">Morning Classes</h3>
          <div className="flex px-4 md:px-12 mt-8 justify-around flex-wrap">
            {classes.morning.map((classInfo, index) => (
              <ClassCard key={index} {...classInfo} />
            ))}
          </div>
        </div>

        <div className="class-section mt-8">
          <h3 className="text-2xl font-bold mb-4 text-center">Afternoon Classes</h3>
          <div className="flex px-4 md:px-12 justify-around flex-wrap">
            {classes.afternoon.map((classInfo, index) => (
              <ClassCard key={index} {...classInfo} />
            ))}
          </div>
        </div>

        <div className="class-section mt-8">
          <h3 className="text-2xl font-bold mb-4 text-center">Evening Classes</h3>
          <div className="flex px-4 md:px-12 justify-around flex-wrap">
            {classes.evening.map((classInfo, index) => (
              <ClassCard key={index} {...classInfo} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
