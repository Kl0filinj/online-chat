import Login from './Auth/Login';
// import socket from 'utils/socketConnection';
import RoomsHub from './RoomsHub/RoomsHub';
import Register from './Auth/Register';
import SharedLayout from './sheared/SharedLayout';
import Chat from './Chat/Chat';
import { Route, Routes } from 'react-router-dom';
import { RedirectedRoute } from './SecureRoutes/RedirectedRoute';
import { PrivateRoute } from './SecureRoutes/PrivateRoute';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from 'redux/auth/auth-operations';
import { isRefreshingSelector } from 'redux/auth/auth-selector';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(isRefreshingSelector);
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <>
      {!isLoading && (
        <Routes>
          <Route path="/" element={<SharedLayout />}>
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
            {/* <Route
              path="rooms/:roomId"
              element={<PrivateRoute redirectTo="/" component={<Chat />} />}
            /> */}
            <Route path="rooms/:roomId" element={<Chat />} />
            <Route path="*" element={<h1>Page Not Found 🥶</h1>} />
          </Route>
        </Routes>
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};
