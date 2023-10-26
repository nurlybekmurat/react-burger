import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';

export const ProtectedRoute = ({ isAllowed, children, link }) => {
  if (!isAllowed) {
    return <Navigate to={`/${link}`} replace />;
  }

  return children ? children : <Outlet />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.element,
  isAllowed: PropTypes.bool,
  link: PropTypes.string
};