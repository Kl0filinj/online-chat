import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { isLoggedInSelector } from 'redux/auth/auth-selector';

export const RedirectedRoute = ({ component: Component, redirectTo = '/' }) => {
  const isLoggedIn = useSelector(isLoggedInSelector);

  return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
};
