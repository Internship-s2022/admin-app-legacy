import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import { RootState } from 'src/redux/store';

import { PrivateRouteProps } from './types';

const PrivateRoute = ({
  role,
  redirectPath = '/not-allowed',
  children,
}: PrivateRouteProps): JSX.Element => {
  const { error, isLoading } = useSelector((state: RootState) => state.auth);

  if (isLoading) {
    return null;
  }

  const accessRole = localStorage.getItem('role');
  const token = localStorage.getItem('token');

  if (role !== accessRole || error || !token) {
    return <Navigate to={redirectPath} />;
  }
  return children ? children : <Outlet />;
};

export default PrivateRoute;
