import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const handleMenuClick = () => {
        setIsOpen(false);
    };

    return (
        <div className="navbar bg-gray-900 fixed top-0 z-20">
            <div className="navbar-start">
                <Link to='/' className="btn btn-ghost text-2xl text-white">Neelam Fitness</Link>
            </div>
            <div className="navbar-center hidden md:flex">
                <ul className="menu menu-horizontal px-1 text-xl">
                    <li><NavLink to="/" className="mr-2 text-white hover:bg-primary hover:text-primary-content">Home</NavLink></li>
                    <li><NavLink to="/instructor" className="mr-2 text-white hover:bg-primary hover:text-primary-content">About Me</NavLink></li>
                    <li><NavLink to="/classes" className="mr-2 text-white hover:bg-primary hover:text-primary-content">Classes</NavLink></li>
                    <li><NavLink to="/dashboard" className="mr-2 text-white hover:bg-primary hover:text-primary-content">Dashboard</NavLink></li>
                </ul>
            </div>
            <div className="navbar-end">
                <div className="relative">
                    <button tabIndex={0} className="btn btn-ghost md:hidden" onClick={() => setIsOpen(!isOpen)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </button>
                    <div className={`${isOpen ? 'fixed' : 'hidden'} inset-0 bg-gray-800 bg-opacity-90 z-30 flex flex-col items-center justify-center top-[4rem]`}>
                        <ul tabIndex={0} className="menu menu-vertical text-white text-xl">
                            <li><NavLink to="/" className="mb-2 hover:bg-primary hover:text-primary-content" onClick={handleMenuClick}>Home</NavLink></li>
                            <li><NavLink to="/instructor" className="mb-2 hover:bg-primary hover:text-primary-content" onClick={handleMenuClick}>About Me</NavLink></li>
                            <li><NavLink to="/classes" className="mb-2 hover:bg-primary hover:text-primary-content" onClick={handleMenuClick}>Classes</NavLink></li>
                            <li><NavLink to="/dashboard" className="mb-2 hover:bg-primary hover:text-primary-content" onClick={handleMenuClick}>Dashboard</NavLink></li>
                            <li><NavLink to="/login" className="mb-2 hover:bg-primary hover:text-primary-content" onClick={handleMenuClick}>Login</NavLink></li>
                        </ul>
                    </div>
                </div>
                <Link to='/login' className="hidden md:btn md:text-lg md:mr-2">Login</Link>
            </div>
        </div>
    );
}
