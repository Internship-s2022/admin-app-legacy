import React, { lazy, Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import Layout from 'src/components/layout';
import { Loader } from 'src/components/shared/ui';
import { AccessRoleType, UiRoutes } from 'src/constants';
import { tokenListener } from 'src/helper/firebase';
import { RootState } from 'src/redux/store';

const Login = lazy(() => import('src/components/pages/login'));

const PrivateRoute = lazy(() => import('src/components/shared/common/privateRoute'));
const Admin = lazy(() => import('./admin'));
const NotAllowed = lazy(() => import('src/components/pages/notAllowed'));
const SuperAdmin = lazy(() => import('./superAdmin'));
const Storybook = lazy(() => import('src/components/pages/storybook'));

const AppRoutes = (): JSX.Element => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const roleFromStore = useSelector((state: RootState) => state.auth.authUser.accessRoleType);
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);

  const redirectPath = (role) => {
    let path = '/login';
    switch (role) {
      case AccessRoleType.ADMIN:
        path = '/admin/home';
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
    if (roleFromStore) {
      pathname !== '/' ? navigate(pathname) : redirectPath(roleFromStore);
    }
  }, [roleFromStore]);

  useEffect(() => {
    tokenListener();
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path={UiRoutes.LOGIN} element={<Login />} />
          <Route path={UiRoutes.STORYBOOK} element={<Storybook />} />
          <Route element={<PrivateRoute role={AccessRoleType.ADMIN} />}>
            <Route path={`${UiRoutes.ADMIN}/*`} element={<Admin />} />
          </Route>
          <Route element={<PrivateRoute role={AccessRoleType.SUPER_ADMIN} />}>
            <Route path={UiRoutes.SUPER_ADMIN} element={<SuperAdmin />} />
          </Route>
          <Route path={UiRoutes.NOT_ALLOWED} element={<NotAllowed />} />
          <Route path="/*" element={<Navigate to={redirectPath(roleFromStore)} />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
