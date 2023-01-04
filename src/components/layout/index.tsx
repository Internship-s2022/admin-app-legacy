import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

import firebaseApp from 'src/helper/firebase';
import { RootState } from 'src/redux/store';
import { ErrorType } from 'src/redux/types';

import { Header } from '../shared/common';
import { Loader } from '../shared/ui';
import styles from './layout.module.css';

const Layout = (): JSX.Element => {
  const isLoading = useSelector((state: RootState) => state.ui.isLoading);
  const error = useSelector((state: RootState) =>
    Object.values(state).some((item) => item.error?.errorType === ErrorType.AUTH_ERROR),
  );

  const handleLogout = async () => {
    try {
      await firebaseApp.auth().signOut();
    } catch (error) {
      console.error(error);
    }
  };

  error && handleLogout();

  const roleAuth = useSelector((state: RootState) => state.auth.authUser.accessRoleType);
  return (
    <div className={styles.container}>
      {isLoading && <Loader />}
      {roleAuth && <Header />}
      <Outlet />
    </div>
  );
};

export default Layout;
