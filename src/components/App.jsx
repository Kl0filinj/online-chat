import Login from './Auth/Login';
// import socket from 'utils/socketConnection';
import { Route, Routes } from 'react-router-dom';
import { RedirectedRoute } from './SecureRoutes/RedirectedRoute';
import { PrivateRoute } from './SecureRoutes/PrivateRoute';
import RoomsHub from './RoomsHub/RoomsHub';
import Register from './Auth/Register';
import Layout from './sheared/Layout.jsx';

export const App = () => {
  return (
    <>
      {/* {!isLoading && ( */}
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route index element={<Home />} /> */}
          <Route
            index
            element={
              <RedirectedRoute redirectTo="/rooms" component={<Login />} />
            }
          />
          <Route
            path="register"
            element={
              <RedirectedRoute redirectTo="/rooms" component={<Register />} />
            }
          />
          <Route
            path="rooms"
            element={<PrivateRoute redirectTo="/" component={<RoomsHub />} />}
          />
          <Route
            path="rooms/:roomId"
            element={
              <PrivateRoute
                redirectTo="/"
                component={<div>Current room</div>}
              />
            }
          />
          <Route path="*" element={<h1>Page Not Found 🥶</h1>} />
        </Route>
      </Routes>
      {/* )} */}
    </>
  );
};