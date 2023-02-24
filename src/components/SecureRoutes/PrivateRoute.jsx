import { Navigate } from 'react-router-dom';
// import { useAuth } from 'hooks';
import { useSelector } from 'react-redux';
import {
  isLoggedInSelector,
  isRefreshingSelector,
} from 'redux/auth/auth-selector';

export const PrivateRoute = ({ component: Component, redirectTo = '/' }) => {
  const isRefreshing = useSelector(isRefreshingSelector);
  const isLoggedIn = useSelector(isLoggedInSelector);

  const shouldRedirect = !isLoggedIn && !isRefreshing;
  return shouldRedirect ? <Navigate to={redirectTo} /> : Component;
};
