import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from './store/session.js';
import Navigation from './components/Navigation/Navigation.jsx';
import Spots from './components/Spots/Spots.jsx';
import SpotDetail from './components/Spots/SpotDetail.jsx';
import SpotForm from './components/Spots/SpotForm.jsx';
import ManageSpots from './components/Spots/ManageSpots.jsx';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Spots />
      },
      {
        path: '/spots/:spotId',
        element: <SpotDetail />
      },
      {
        path: '/spots/new',
        element: <SpotForm />
      },
      {
        path: '/spots/current',
        element: <ManageSpots />
      },
      {
        path: '*',
        element: <h2>Page Not Found</h2>
      }
    ]
  }
]);

function Layout() {
  const dispatch = useDispatch();
  const [ isLoaded, setIsLoaded ] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

function App() {
  return <RouterProvider router={router} />
}

export default App;
