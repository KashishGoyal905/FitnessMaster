// import { Link } from "react-router-dom";
import Chopper from '../../images/Home1.webp';
import Franky from '../../images/Home2.webp';
import luffy from '../../images/Home3.avif';
import luffy2 from '../../images/Home4.jpg';
import Zoro1 from '../../images/Home5.jpg';
import luffy5 from '../../images/Home8.avif';
import image from '../../images/Home.png';
import BMICalculator from '../BMICalculator';
import authContext from '../../context/AuthContext';
import { useContext } from 'react';
import { Link } from "react-router-dom";

export default function Home() {
  const {user} = useContext(authContext);
  return (
    <div className='bg-gray-900 text-white'>
      {/* Hero Section */}
      <div className="relative h-screen">
        <div className="absolute inset-0 bg-gray-900 bg-opacity-50"></div>
        <div className="container mx-auto h-full flex flex-col md:flex-row items-center justify-between px-4 md:px-8 relative z-10">
          <div className="text-white max-w-md mt-40 text-center md:text-left md:mt-0">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Welcome to <br />
              <span className="text-4xl md:text-6xl text-purple-600">Fitness Master</span>
            </h1>
            <p className="text-lg md:text-xl mb-6">
              Transform your body and mind with personalized training programs.
            </p>
            <div className="flex mt-8 space-x-4 justify-center md:justify-start">
              {/* Social Media Links */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="shadow-lg overflow-hidden transform transition-transform hover:scale-110"
              >
                <img
                  width="32"
                  height="32"
                  src="https://img.icons8.com/material-outlined/48/ffffff/instagram-new--v1.png"
                  alt="Instagram"
                />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="shadow-lg overflow-hidden transform transition-transform hover:scale-110"
              >
                <img
                  width="32"
                  height="32"
                  src="https://img.icons8.com/material-outlined/48/ffffff/youtube-play.png"
                  alt="YouTube"
                />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="shadow-lg overflow-hidden transform transition-transform hover:scale-110"
              >
                <img
                  width="32"
                  height="32"
                  src="https://img.icons8.com/material-outlined/48/ffffff/facebook-new.png"
                  alt="Facebook"
                />
              </a>
              <a
                href="mailto:support@neelamfitness.com"
                className="shadow-lg overflow-hidden transform transition-transform hover:scale-110"
              >
                <img
                  width="32"
                  height="32"
                  src="https://img.icons8.com/material-outlined/48/ffffff/gmail-new.png"
                  alt="gmail-new"
                />
              </a>
            </div>
          </div>
          <div>
            <img
              src={image}
              alt="Hero Image"
              className="relative p-0 md:p-8 h-[95%] md:h-full w-full md:w-[45vw] rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>

      <hr className="border-gray-600 my-8" />

      {/* BMI Calculator */}
      <BMICalculator />

      {/* Photo Gallery Section */}
      <div className="container mx-auto py-6 md:py-12">
        <h2 className="text-3xl font-bold text-center mb-2">Photo Gallery</h2>
        <p className="text-2xl text-center mb-2 md:mb-8">
          Our Best Images from Studio
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 md:px-0">
          {[Chopper, Franky, luffy, Zoro1, luffy2, luffy5].map((imgSrc, index) => (
            <div
              key={index}
              className="bg-gray-800 h-64 rounded-lg shadow-lg overflow-hidden md:transform md:transition-transform md:hover:scale-105"
            >
              {/* Ensure images are responsive and fit well */}
              <img
                src={imgSrc}
                alt={``}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <hr className="border-gray-600 my-8" />

      {/* Popular Classes Section */}
      <div className="container mx-auto py-6 md:py-12">
        <h2 className="text-3xl font-bold text-center mb-2">Our Popular Classes</h2>
        <p className="text-2xl text-center mb-2 md:mb-8">
          The Most Affordable and Beginner Friendly
        </p>
        <div className="grid grid-cols-1 px-4 md:px-0 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Morning Class Card */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 h-[34rem] flex flex-col justify-between md:transform md:transition-transform md:hover:scale-105">
            <img src={luffy2} alt="Morning Class" className="h-48 w-full object-cover rounded-lg mb-4" />
            <div className="text-center">
              <h2 className="text-xl md:text-2xl font-bold">Morning</h2>
              <h3 className="text-lg font-semibold">Instructor: Neelam Bindal</h3>
              <p className="text-md">Time: 6:00 AM - 7:00 AM</p>
              <p className="text-md">Price: 500Rs/month</p>
              <p className="text-md">Kickstart your day with an energizing workout to boost your metabolism.</p>
              {
                user ? <button className="bg-purple-600 text-white px-4 py-2 mt-4 rounded-lg hover:bg-purple-700 transition">
                Join now!
              </button> :
              <Link to={'/user/login'}> 
              <button className="bg-purple-600 text-white px-4 py-2 mt-4 rounded-lg hover:bg-purple-700 transition">
              Login to join
            </button>
            </Link>
              }
            </div>
          </div>

          {/* Afternoon Class Card */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 h-[34rem] flex flex-col justify-between md:transform md:transition-transform md:hover:scale-105">
            <img src={Zoro1} alt="Afternoon Class" className="h-48 w-full object-cover rounded-lg mb-4" />
            <div className="text-center">
              <h2 className="text-xl md:text-2xl font-bold">Afternoon</h2>
              <h3 className="text-lg font-semibold">Instructor: Neelam Bindal</h3>
              <p className="text-md">Time: 12:00 PM - 1:00 PM</p>
              <p className="text-md">Price: 500Rs/month</p>
              <p className="text-md">A perfect mid-day class to keep your energy levels up and stress levels down.</p>
              {
                user ? <button className="bg-purple-600 text-white px-4 py-2 mt-4 rounded-lg hover:bg-purple-700 transition">
                Join now!
              </button> :
              <Link to={'/user/login'}> 
              <button className="bg-purple-600 text-white px-4 py-2 mt-4 rounded-lg hover:bg-purple-700 transition">
              Login to join
            </button>
            </Link>
              }
            </div>
          </div>

          {/* Evening Class Card */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 h-[34rem] flex flex-col justify-between md:transform md:transition-transform md:hover:scale-105">
            <img src={luffy5} alt="Evening Class" className="h-48 w-full object-cover rounded-lg mb-4" />
            <div className="text-center">
              <h2 className="text-xl md:text-2xl font-bold">Evening</h2>
              <h3 className="text-lg font-semibold">Instructor: Neelam Bindal</h3>
              <p className="text-md">Time: 6:00 PM - 7:00 PM</p>
              <p className="text-md">Price: 500Rs/month</p>
              <p className="text-md">Wind down your day with a challenging workout to build strength and endurance.</p>
              {
                user ? <button className="bg-purple-600 text-white px-4 py-2 mt-4 rounded-lg hover:bg-purple-700 transition">
                Join now!
              </button> :
              <Link to={'/user/login'}> 
              <button className="bg-purple-600 text-white px-4 py-2 mt-4 rounded-lg hover:bg-purple-700 transition">
              Login to join
            </button>
            </Link>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}