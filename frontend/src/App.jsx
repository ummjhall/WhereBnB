import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage/LoginFormPage.jsx';

const router = createBrowserRouter([
    {
      path: '/',
      element: <><h1>Welcome</h1><Outlet /></>,
      children: [
        // {
        //   path: 'login',
        //   element: <LoginFormPage />
        // }
      ]
    },
    {
      path: 'login',
      element: <LoginFormPage />
    }
]);

function App() {
  return <RouterProvider router={router} />
}

export default App;
