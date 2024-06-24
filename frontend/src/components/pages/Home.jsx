// import { Link } from "react-router-dom";
import Chopper from '../../images/Chopper.jpg';
import Franky from '../../images/Franky.jpg';
import luffy from '../../images/luffy.jpg';
import luffy2 from '../../images/luffy2.jpg';
import Zoro1 from '../../images/Zoro1.jpg';
import luffy5 from '../../images/luffy5.jpg';

export default function Home() {
  return (
    <div>
      <div className="relative bg-cover bg-center h-screen" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')` }}>
        <div className="absolute inset-0 bg-gray-900 bg-opacity-50"></div>
        <div className="container mx-auto h-full flex flex-col md:flex-row items-center justify-between px-4 md:px-8 relative z-10">
          <div className="text-white max-w-md mt-40 text-center md:text-left md:mt-0">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Welcome to <br></br><span className="text-4xl md:text-6xl">Neelam Fitness</span></h1>
            <p className="text-lg md:text-xl mb-6">Transform your body and mind with personalized training programs.</p>
            <div className="flex mt-8 space-x-4 justify-center md:justify-start">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <img width="32" height="32" src="https://img.icons8.com/material-outlined/48/ffffff/instagram-new--v1.png" alt="Instagram" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <img width="32" height="32" src="https://img.icons8.com/material-outlined/48/ffffff/youtube-play.png" alt="YouTube" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <img width="32" height="32" src="https://img.icons8.com/material-outlined/48/ffffff/facebook-new.png" alt="Facebook" />
              </a>
              <a href="mailto:support@neelamfitness.com">
                <img width="32" height="32" src="https://img.icons8.com/material-outlined/48/ffffff/gmail-new.png" alt="gmail-new" />
              </a>
            </div>
          </div>
          <div className="md:block hidden">
            {/* <img src={image} alt="YourImage" className="rounded-lg shadow-lg" /> */}
          </div>
        </div>
      </div>

      {/* Future Photo Gallery Section */}
      <div className="container mx-auto py-6 md:py-12">
        <h2 className="text-3xl font-bold text-center mb-2">Photo Gallery</h2>
        <p className='text-2xl text-center mb-2 md:mb-8'>Our Best Images from Studio</p>
        <div className="grid grid-cols-1 p-4 md:p-0 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-gray-200 h-64 rounded-lg shadow-lg">
            <img src={Chopper} alt="" className='h-full w-full' />
          </div>
          <div className="bg-gray-200 h-64 rounded-lg shadow-lg">
            <img src={Franky} alt="" className='h-full w-full ' />
          </div>
          <div className="bg-gray-200 h-64 rounded-lg shadow-lg">
            <img src={luffy} alt="" className='h-full w-full ' />
          </div>
          <div className="bg-gray-200 h-64 rounded-lg shadow-lg">
            <img src={Zoro1} alt="" className='h-full w-full ' />
          </div>
          <div className="bg-gray-200 h-64 rounded-lg shadow-lg">
            <img src={luffy2} alt="" className='h-full w-full ' />
          </div>
          <div className="bg-gray-200 h-64 rounded-lg shadow-lg">
            <img src={luffy5} alt="" className='h-full w-full ' />
          </div>
        </div>
      </div>

      <hr />
      {/* Popular Classes */}
      <div className="container mx-auto py-6 md:py-12">
        <h2 className="text-3xl font-bold text-center mb-2">Our Popular Classes</h2>
        <p className='text-2xl text-center mb-2 md:mb-8'>The Most Affordable and Beginner Friendly</p>
        <div className="grid grid-cols-1 px-4 md:px-auto sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="card glass w-full md:w-96 h-[34rem]">
            <figure>
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                alt="car!" />
            </figure>
            <div className="card-body">
              <h2 className="text-xl md:text-2xl font-bold text-center">Morning</h2>
              <p>How to park your car at your garage?</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Learn now!</button>
              </div>
            </div>
          </div>
          <div className="card glass w-full md:w-96 h-[34rem]">
            <figure>
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                alt="car!" />
            </figure>
            <div className="card-body">
              <h2 className="text-xl md:text-2xl font-bold text-center">Evening</h2>
              <p>How to park your car at your garage?</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Learn now!</button>
              </div>
            </div>
          </div>
          <div className="card glass w-full md:w-96 h-[34rem]">
            <figure>
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                alt="car!" />
            </figure>
            <div className="card-body">
              <h2 className="text-xl md:text-2xl font-bold text-center">Afternoon</h2>
              <p>How to park your car at your garage?</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Learn now!</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >

  );
}
