import React from 'react';
// import { Link } from "react-router-dom";
// import aboutImage from '../../images/aboutImage.png';
import Chopper from '../../images/Chopper.jpg';


export default function AboutMe() {
  return (
    <div className="about-me-page relative top-26 pt-16">

      {/* Hero Section */}
      <div className="relative bg-cover bg-center h-[50vh]" style={{ backgroundImage: `url('https://plus.unsplash.com/premium_photo-1661962342128-505f8032ea45?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGZpdG5lc3MlMjBnaXJsfGVufDB8MHwwfHx8MA%3D%3D')` }}>
        <div className="absolute inset-0 bg-gray-900 bg-opacity-60"></div>
        <div className="container mx-auto h-full flex flex-col items-center justify-center relative z-10 text-white">
          <img src={Chopper} alt="MyImage" className="rounded-full w-32 h-32 md:w-36 md:h-36 mb-4 shadow-lg border-4 border-white" />
          <h1 className="text-4xl font-bold mb-2">Neelam Bindal</h1>
          <p className="text-xl mb-4">Find Your Strong</p>
        </div>
      </div>

      {/* Bio Section */}
      <div className="container mx-auto py-6 md:py-12 px-4 md:px-8 h-auto md:h-[41.9vh]">
        <h2 className="text-3xl font-bold mb-4 text-center">About Me</h2>
        <p className="text-lg mb-6 text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Vivamus vestibulum ex nec orci malesuada, sit amet pharetra massa tincidunt. Suspendisse potenti. In consequat massa in enim vehicula gravida.</p>
        <p className="text-lg mb-6 text-center">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p>
      </div>

      {/* Skills & Expertise */}
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">Skills & Expertise</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white shadow-lg p-6 rounded-lg w-72">
              <h3 className="text-xl font-bold mb-2">Diet Training</h3>
              <p className="text-md">Customized diet plans to meet your fitness goals.</p>
            </div>
            <div className="bg-white shadow-lg p-6 rounded-lg w-72">
              <h3 className="text-xl font-bold mb-2">Nutrition Planning</h3>
              <p className="text-md">Personalized nutrition advice to complement your fitness routine.</p>
            </div>
            <div className="bg-white shadow-lg p-6 rounded-lg w-72">
              <h3 className="text-xl font-bold mb-2">Group Classes</h3>
              <p className="text-md">Engaging and energetic group classes to keep you motivated.</p>
            </div>
            <div className="bg-white shadow-lg p-6 rounded-lg w-72">
              <h3 className="text-xl font-bold mb-2">Yoga & Meditation</h3>
              <p className="text-md">Holistic approach to fitness with yoga and meditation sessions.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Philosophy & Approach */}
      <div className="container mx-auto py-12 px-4 md:px-8">
        <h2 className="text-3xl font-bold mb-4 text-center">My Philosophy</h2>
        <p className="text-lg mb-6 text-center">"Fitness is not just about the body, but also about the mind and soul. My approach is to create a balanced, healthy lifestyle that you can maintain for life."</p>
      </div>

      {/* Testimonials */}
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">Testimonials</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white shadow-lg p-6 rounded-lg w-72">
              <p className="text-md italic">"Neelam has been a game changer in my fitness journey. Her personalized approach and constant motivation have helped me achieve my goals."</p>
              <p className="text-sm font-bold mt-4">- John Doe</p>
            </div>
            <div className="bg-white shadow-lg p-6 rounded-lg w-72">
              <p className="text-md italic">"The best trainer I've ever had! Neelam's expertise in fitness and nutrition is unparalleled."</p>
              <p className="text-sm font-bold mt-4">- Jane Smith</p>
            </div>
            <div className="bg-white shadow-lg p-6 rounded-lg w-72">
              <p className="text-md italic">"I love the group classes! They are fun, engaging, and effective. Highly recommend Neelam."</p>
              <p className="text-sm font-bold mt-4">- Alex Brown</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
