import { Link } from "react-router-dom";

export default function Dashboard() {
    return (
        <div className="flex h-screen bg-gray-100 pt-16">
            <aside className="w-64 bg-gray-800 text-white">
                <div className="p-4">
                    <h2 className="text-2xl font-bold">Admin Dashboard</h2>
                </div>
                <nav className="p-4">
                    <ul>
                        <li className="mb-2"><Link to="/admin" className="hover:bg-gray-700 p-2 block">Dashboard Overview</Link></li>
                        <li className="mb-2"><Link to="/admin/classes" className="hover:bg-gray-700 p-2 block">Manage Classes</Link></li>
                        <li className="mb-2"><Link to="/admin/instructors" className="hover:bg-gray-700 p-2 block">Manage Instructors</Link></li>
                        <li className="mb-2"><Link to="/admin/users" className="hover:bg-gray-700 p-2 block">Manage Users</Link></li>
                        <li className="mb-2"><Link to="/admin/reports" className="hover:bg-gray-700 p-2 block">Reports</Link></li>
                        <li className="mb-2"><Link to="/admin/settings" className="hover:bg-gray-700 p-2 block">Settings</Link></li>
                    </ul>
                </nav>
            </aside>
            <main className="flex-1 p-6">
                <h1 className="text-3xl font-bold mb-4">Dashboard Overview</h1>
                {/* Overview content */}
            </main>
        </div>
    )
}
