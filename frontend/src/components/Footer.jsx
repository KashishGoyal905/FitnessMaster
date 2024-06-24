import { NavLink } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-around">
                    <div className="mb-6 md:mb-0">
                        <h4 className="text-xl font-bold mb-2 text-center md:text-left">About Us</h4>
                        <p className="text-center md:text-left">Neelam Fitness is your ultimate destination for achieving your fitness goals.</p>
                        <div className="flex justify-center md:justify-start mt-4 space-x-2">
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" >
                                <img width="48" height="48" src="https://img.icons8.com/color/48/instagram-new--v1.png" alt="Instagram" />
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" >
                                <img width="48" height="48" src="https://img.icons8.com/color/48/facebook-new.png" alt="Facebook" />
                            </a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                                <img width="48" height="48" src="https://img.icons8.com/color/48/youtube-play.png" alt="YouTube" />
                            </a>
                            <a href="mailto:support@neelamfitness.com">
                                <img width="48" height="48" src="https://img.icons8.com/color/48/gmail-new.png" alt="gmail-new"/>
                            </a>
                        </div>
                    </div>
                    <div className="mb-6 md:mb-0">
                        <h4 className="text-xl font-bold mb-2 text-center md:text-left">Quick Links</h4>
                        <ul className="list-none p-0">
                            <li className="mb-1 text-center md:text-left"><NavLink to="/" className="text-white hover:text-gray-400">Home</NavLink></li>
                            <li className="mb-1 text-center md:text-left"><NavLink to="/instructor" className="text-white hover:text-gray-400">About Me</NavLink></li>
                            <li className="mb-1 text-center md:text-left"><NavLink to="/classes" className="text-white hover:text-gray-400">Classes</NavLink></li>
                            <li className="mb-1 text-center md:text-left"><NavLink to="/dashboard" className="text-white hover:text-gray-400">Dashboard</NavLink></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-xl font-bold mb-2 text-center md:text-left">Contact Us</h4>
                        <p className="text-center md:text-left">Email: support@neelamfitness.com</p>
                        <p className="text-center md:text-left">Phone: +123 456 7890</p>
                    </div>
                </div>
                <div className="text-center mt-8">
                    <p>&copy; 2024 Neelam Fitness. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
