import React, { lazy, Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import Layout from 'src/components/layout';
import { Loader } from 'src/components/shared/ui';
import { AccessRoleType } from 'src/constants';
import { tokenListener } from 'src/helper/firebase';

const Login = lazy(() => import('src/components/pages/login'));
const InvalidEmail = lazy(() => import('src/components/pages/invalidEmail'));

const PrivateRoute = lazy(() => import('src/components/shared/common/privateRoute'));
const Admin = lazy(() => import('./admin'));
const NotAllowed = lazy(() => import('src/components/pages/notAllowed'));
const SuperAdmin = lazy(() => import('./superAdmin'));
const Storybook = lazy(() => import('src/components/pages/storybook'));

const AppRoutes = (): JSX.Element => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const role = localStorage.getItem('role');
  const token = localStorage.getItem('token');

  const redirectPath = (role) => {
    let path = '/login';
    switch (role) {
      case AccessRoleType.ADMIN:
        path = '/admin';
        break;
      case AccessRoleType.SUPER_ADMIN:
        path = '/super-admin';
        break;
      default:
        path = '/login';
    }
    return path;
  };

  useEffect(() => {
    tokenListener();
    if (token) {
      pathname !== '/' ? navigate(pathname) : redirectPath(role);
    }
  }, []);

  // console.log('session role:', localStorage.getItem('role'));
  // console.log('token:', localStorage.getItem('token'));

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/storybook" element={<Storybook />} />
          <Route element={<PrivateRoute role={AccessRoleType.ADMIN} />}>
            <Route path="/admin/*" element={<Admin />} />
          </Route>
          <Route element={<PrivateRoute role={AccessRoleType.SUPER_ADMIN} />}>
            <Route path="/super-admin" element={<SuperAdmin />} />
          </Route>
          <Route path="/not-allowed" element={<NotAllowed />} />
          <Route path="/invalid-email" element={<InvalidEmail />} />
          <Route path="/*" element={<Navigate to={'/login'} />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
