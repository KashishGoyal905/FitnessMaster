import { Link } from "react-router-dom";
import image from '../../images/a.jpeg'
export default function Home() {
  return (
    <div className="relative bg-cover bg-center h-screen" style={{ backgroundImage: `url('https://plus.unsplash.com/premium_photo-1663047321304-fd30b8fc1dcc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTd8fGNvbG9ycyUyMGJhY2tncm91bmQlMjBmaXRuZXNzfGVufDB8MHwwfHx8MA%3D%3D')` }}>
      <div className="absolute inset-0 bg-gray-900 bg-opacity-50"></div>
      <div className="container mx-auto h-full flex flex-col md:flex-row items-center justify-between px-4 md:px-8 relative z-10">
        <div className="text-white max-w-md">
          <h1 className="text-5xl font-bold mb-4">Welcome to <span className="text-6xl">Neelam Fitness</span></h1>
          <p className="text-xl mb-6">Transform your body and mind with personalized training programs.</p>
          <Link to="/classes" className="btn bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark">Get Started</Link>
        </div>
        <div className="md:block">
          <img src={image} alt="YourImage" className="rounded-lg shadow-lg" />
        </div>
      </div>
    </div>
  )
}
