import { useContext, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import authContext from "../../context/AuthContext";
import Navbar from "../Navbar";
import Footer from "../Footer";
import ResponsiveSidebar from "../Sidebar";

export default function Dashboard() {
    const { isAuthenticated, user } = useContext(authContext);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    if (!isAuthenticated) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-start pt-[4.8rem]">
                    <div
                        className="bg-cover bg-center w-full h-[50vh]"
                        style={{ backgroundImage: `url('https://plus.unsplash.com/premium_photo-1661962342128-505f8032ea45?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGZpdG5lc3MlMjBnaXJsfGVufDB8MHwwfHx8MA%3D%3D')` }}
                    >
                        <header className="text-center mb-8 p-4 rounded-md">
                            <img
                                className="mx-auto h-16 w-16 mb-4"
                                src="https://img.icons8.com/color/96/yoga-skin-type-1.png"
                                alt="NeelamFitness Logo"
                            />
                            <h1 className="text-2xl md:text-4xl font-bold mb-2 text-gray-300">
                                Welcome to <span className="text-purple-500">NeelamFitness</span>
                            </h1>
                            <p className="md:text-lg text-gray-300">
                                Join us and start your fitness journey today!
                            </p>
                        </header>
                        <div className="flex flex-row justify-around md:space-y-0 md:space-x-4 mt-20">
                            <Link to="/user/signup" className="bg-purple-600 text-white px-6 py-3 rounded-md text-lg hover:bg-purple-700 transition duration-300">
                                Sign Up
                            </Link>
                            <Link to="/user/login" className="bg-red-600 text-white px-6 py-3 rounded-md text-lg hover:bg-red-700 transition duration-300">
                                Log In
                            </Link>
                        </div>
                    </div>
                    <section className="h-auto max-w-4xl text-center m-6 md:m-8">
                        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-purple-500">
                            Why Join Us?
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
                            <div className="bg-gray-800 text-white rounded-md p-6 shadow-lg">
                                <img src="https://img.icons8.com/emoji/96/woman-in-lotus-position.png" alt="Fitness Classes" className="mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-2 text-gray-300">Variety of Fitness Classes</h3>
                                <p className="text-lg text-gray-300">Access a wide range of classes to suit your fitness level and goals.</p>
                            </div>
                            <div className="bg-gray-800 text-white rounded-md p-6 shadow-lg">
                                <img src="https://img.icons8.com/color/96/personal-trainer.png" alt="Certified Instructors" className="mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-2 text-gray-300">Certified Instructors</h3>
                                <p className="text-lg text-gray-300">Learn from experienced and certified fitness professionals.</p>
                            </div>
                            <div className="bg-gray-800 text-white rounded-md p-6 shadow-lg">
                                <img src="https://img.icons8.com/arcade/96/healthy-food-calories-calculator.png" alt="Personalized Plans" className="mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-2 text-gray-300">Personalized Diet Plans</h3>
                                <p className="text-lg text-gray-300">Get a fitness plan tailored to your needs and goals.</p>
                            </div>
                            <div className="bg-gray-800 text-white rounded-md p-6 shadow-lg">
                                <img src="https://img.icons8.com/arcade/96/group.png" alt="Community Support" className="mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-2 text-gray-300">Community Support</h3>
                                <p className="text-lg text-gray-300">Join a supportive community to keep you motivated.</p>
                            </div>
                        </div>
                    </section>
                </div>
                <Footer />
            </>
        );
    }

    if (isAuthenticated && user && user.userRole === 'user') {
        return (
            <div>
                <Navbar />
                <div className="flex w-full overflow-x-hidden">
                    <div style={{ position: 'fixed', zIndex: 1000 }} className="fixed z-1000 top-[3.5rem] md:top-[4.7rem] h-screen w-[14vw]">
                        <ResponsiveSidebar open={sidebarOpen} setOpen={setSidebarOpen} />
                    </div>
                    <div className="relative top-14 md:top-20 md:left-[230px] p-4 w-full md:w-[84vw] h-screen overflow-auto">
                        <Outlet />
                    </div>
                </div>
                {/* <button
                        onClick={() => setSidebarOpen(true)}
                        className="md:hidden fixed top-[4.5rem] left-4 z-50 bg-primary text-white p-2 rounded-md"
                    >
                        <MenuIcon />
                    </button> */}
            </div>
        )
    }

    if (isAuthenticated && user && user.userRole === 'admin') {
        return (
            <div>
                <Navbar />
                <div className="flex w-full overflow-x-hidden">
                    <div style={{ position: 'fixed', zIndex: 1000 }} className="fixed z-1000 top-[3.5rem] md:top-[4.7rem] h-screen w-[14vw]">
                        <ResponsiveSidebar open={sidebarOpen} setOpen={setSidebarOpen} />
                    </div>
                    <div className="relative top-14 md:top-20 md:left-[230px] p-4 w-full md:w-[84vw] h-screen overflow-auto">
                        <Outlet />
                    </div>
                </div>
            </div>
        );
    }

    return null;
}
