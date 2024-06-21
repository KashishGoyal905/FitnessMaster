import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './components/layouts/RootLayout';
import Home from './components/pages/Home';


const router = createBrowserRouter([
  {
    path: '/', element: <RootLayout />,
    children: [
      { path: '/', element: <Home />, },
    ]
  }
]);


function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
