import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const handleMenuClick = () => {
        setIsOpen(false);
    };

    return (
        <div className="navbar bg-gray-800 sticky top-0 z-20">
            <div className="navbar-start">
                <Link to='/' className="btn btn-ghost text-2xl">Neelam Fitness</Link>
            </div>
            <div className="navbar-center hidden md:flex">
                <ul className="menu menu-horizontal px-1 text-xl">
                    <li><NavLink to="/" className="mr-2 hover:bg-primary hover:text-primary-content">Home</NavLink></li>
                    <li><NavLink to="/instructor" className="mr-2 hover:bg-primary hover:text-primary-content">About Me</NavLink></li>
                    <li><NavLink to="/classes" className="mr-2 hover:bg-primary hover:text-primary-content">Classes</NavLink></li>
                </ul>
            </div>
            <div className="navbar-end">
                <div className="dropdown">
                    <button tabIndex={0} className="btn btn-ghost md:hidden" onClick={() => setIsOpen(!isOpen)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </button>
                    <div className={`lg:flex lg:items-center lg:w-auto ${isOpen ? 'block' : 'hidden'} absolute lg:static top-16 right-0 bg-gray-800 w-full lg:w-auto z-30`}>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li><NavLink to="/" className="mr-2 hover:bg-primary hover:text-primary-content" onClick={handleMenuClick}>Home</NavLink></li>
                            <li><NavLink to="/instructor" className="mr-2 hover:bg-primary hover:text-primary-content" onClick={handleMenuClick}>About Me</NavLink></li>
                            <li><NavLink to="/classes" className="mr-2 hover:bg-primary hover:text-primary-content" onClick={handleMenuClick}>Classes</NavLink></li>
                            <li><NavLink to="/login" className="mr-2 hover:bg-primary hover:text-primary-content" onClick={handleMenuClick}>Login</NavLink></li>
                        </ul>
                    </div>
                </div>
                <Link to='/login' className="hidden md:btn md:text-lg md:mr-2">Login</Link>
            </div>
        </div>
    );
}
