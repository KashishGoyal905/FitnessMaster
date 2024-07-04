import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './components/layouts/RootLayout';
import Home from './components/pages/Home';
import AboutMe from './components/pages/AboutMe';
import Classes from './components/pages/Classes';
import Login from './components/pages/Login';
import Dashboard from './components/pages/Dashboard';
import SignUp from './components/pages/SignUp';
import './index.css';

// Toast Container
import { ToastContainer, Bounce } from 'react-toastify';
import { AuthContextProvider } from './context/AuthContext';


const router = createBrowserRouter([
  {
    path: '/', element: <RootLayout />,
    children: [
      { path: '/', element: <Home />, },
      { path: '/instructor', element: <AboutMe />, },
      { path: '/classes', element: <Classes />, },
    ]
  },
  { path: '/dashboard', element: <Dashboard />, },
  { path: '/user/login', element: <Login /> },
  { path: '/user/signup', element: <SignUp /> }
]);


function App() {
  return (
    <AuthContextProvider>
      <ToastContainer autoClose={1500} position="top-center" theme="colored" transition={Bounce} />
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
}

export default App;
