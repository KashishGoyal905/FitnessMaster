import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import authContext from "../../context/AuthContext";
import Navbar from "../Navbar";
import Footer from "../Footer";
import ResponsiveSidebar from "../Sidebar";

export default function Dashboard() {
    const { isAuthenticated, user } = useContext(authContext);

    if (!isAuthenticated) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center justify-start pt-[4.8rem]" >
                    <div className="bg-cover bg-center w-full h-[50vh]" style={{ backgroundImage: `url('https://plus.unsplash.com/premium_photo-1661962342128-505f8032ea45?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGZpdG5lc3MlMjBnaXJsfGVufDB8MHwwfHx8MA%3D%3D')` }}>
                        <header className="text-center mb-8 p-4 rounded-md">
                            <img
                                className="mx-auto h-16 w-16 mb-4"
                                src="https://img.icons8.com/color/96/yoga-skin-type-1.png"
                                alt="NeelamFitness Logo"
                            />
                            <h1 className="text-2xl md:text-4xl font-bold mb-2">Welcome to NeelamFitness</h1>
                            <p className="md:text-lg">Join us and start your fitness journey today!</p>
                        </header>
                        <div className="flex flex-row justify-around md:space-y-0 md:space-x-4 mt-20">
                            <Link to="/user/signup" className="bg-primary text-white px-6 py-3 rounded-md text-lg hover:bg-indigo-500 transition duration-300">
                                Sign Up
                            </Link>
                            <Link to="/user/login" className="bg-secondary text-white px-6 py-3 rounded-md text-lg hover:bg-indigo-500 transition duration-300">
                                Log In
                            </Link>
                        </div>
                    </div>
                    <section className="h-auto max-w-4xl text-center m-6 md:m-8">
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">Why Join Us?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
                            <div className="bg-white text-black rounded-md p-6 shadow-lg">
                                <img src="https://img.icons8.com/emoji/96/woman-in-lotus-position.png" alt="Fitness ClassNamclassNamees" className="mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-2">Variety of Fitness ClassNamclassNamees</h3>
                                <p className="text-lg">Access a wide range of classNamees to suit your fitness level and goals.</p>
                            </div>
                            <div className="bg-white text-black rounded-md p-6 shadow-lg">
                                <img src="https://img.icons8.com/color/96/personal-trainer.png" alt="Certified Instructors" className="mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-2">Certified Instructors</h3>
                                <p className="text-lg">Learn from experienced and certified fitness professionals.</p>
                            </div>
                            <div className="bg-white text-black rounded-md p-6 shadow-lg">
                                <img src="https://img.icons8.com/arcade/96/healthy-food-calories-calculator.png" alt="Personalized Plans" className="mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-2">Personalized Diet Plans</h3>
                                <p className="text-lg">Get a fitness plan tailored to your needs and goals.</p>
                            </div>
                            <div className="bg-white text-black rounded-md p-6 shadow-lg">
                                <img src="https://img.icons8.com/arcade/96/group.png" alt="Community Support" className="mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-2">Community Support</h3>
                                <p className="text-lg">Join a supportive community to keep you motivated.</p>
                            </div>
                        </div>
                    </section>
                </div>
                <Footer />
            </>
        );
    }

    if (isAuthenticated && user.userRole === 'user') {
        return (
            <div>
                <Navbar />
                <div style={{ display: 'flex' }}>
                    <div style={{ position: 'fixed', zIndex: 1000 }} className="relative top-[4.5rem] h-screen">
                        <ResponsiveSidebar />
                    </div>
                    <div style={{ width: 'calc(100% - 215px)', overflowY: 'auto', height: '100vh' }} className="relative top-[4.5rem] left-[215px] p-4">
                        <Outlet />
                    </div>
                </div>
            </div>
        )
    }

    if (isAuthenticated && user.userRole === 'admin') {
        return (
            <div className="flex h-screen bg-gray-100 pt-16">
                <aside className="w-64 bg-gray-800 text-white">
                    <div className="p-4">
                        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
                    </div>
                    <nav className="p-4">
                        <ul>
                            <li className="mb-2">
                                <Link to="/admin" className="hover:bg-gray-700 p-2 block">Dashboard Overview</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/admin/classNamees" className="hover:bg-gray-700 p-2 block">Manage ClassNamclassNamees</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/admin/instructors" className="hover:bg-gray-700 p-2 block">Manage Instructors</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/admin/users" className="hover:bg-gray-700 p-2 block">Manage Users</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/admin/reports" className="hover:bg-gray-700 p-2 block">Reports</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/admin/settings" className="hover:bg-gray-700 p-2 block">Settings</Link>
                            </li>
                        </ul>
                    </nav>
                </aside>
                <main className="flex-1 p-6">
                    <h1 className="text-3xl font-bold mb-4">Dashboard Overview</h1>
                    {/* Admin-specific content */}
                </main>
            </div>
        );
    }

    return null;
}
