import Navbar from '../Navbar.jsx';
import Footer from '../Footer.jsx';
import { Outlet } from 'react-router-dom';

export default function RootLayout() {
    return (
        <main className='dark:bg-black overflow-hidden min-h-screen flex flex-col'>
            <div className="flex-grow">
                <Navbar />
                <Outlet />
            </div>
            <Footer />
        </main>
    )
}
