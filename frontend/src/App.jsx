import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './components/layouts/RootLayout';
import Home from './components/pages/Home';
import AboutMe from './components/pages/AboutMe';
import Classes from './components/pages/Classes';
import Login from './components/pages/Login';
import Dashboard from './components/pages/Dashboard';


const router = createBrowserRouter([
  {
    path: '/', element: <RootLayout />,
    children: [
      { path: '/', element: <Home />, },
      { path: '/instructor', element: <AboutMe />, },
      { path: '/classes', element: <Classes />, },
      { path: '/dashboard', element: <Dashboard />, },
    ]
  },
  {
    path: '/login', element: <Login />,
  }
]);


function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
