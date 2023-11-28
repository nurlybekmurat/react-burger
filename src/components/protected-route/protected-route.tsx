import { Navigate, Outlet } from 'react-router-dom';
import { FC } from 'react';

interface IProps {
  isAllowed?: boolean;
  link?: string;
  children: React.JSX.Element
}
export const ProtectedRoute: FC<IProps> = ({ isAllowed, link, children }) => {
  if (!isAllowed) {
    return <Navigate to={`/${link}`} replace />;
  }

  return children ? children : <Outlet />;
};