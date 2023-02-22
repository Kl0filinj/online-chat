import { Navigate } from 'react-router-dom';
// import { useAuth } from 'hooks';
import { useSelector } from 'react-redux';
import { getIsLoggedIn, getIsRefreshing } from 'redux/auth/auth-selector';

export const PrivateRoute = ({ component: Component, redirectTo = '/' }) => {
  const isRefreshing = useSelector(getIsRefreshing);
  const isLoggedIn = useSelector(getIsLoggedIn);

  const shouldRedirect = !isLoggedIn && !isRefreshing;
  return shouldRedirect ? <Navigate to={redirectTo} /> : Component;
};
