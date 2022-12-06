import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { RootState } from 'src/redux/store';

import { Header } from '../shared/common';
import { Loader } from '../shared/ui';
import styles from './layout.module.css';

const Layout = (): JSX.Element => {
  const isLoading = useSelector((state: RootState) => state.ui.isLoading);
  const role = localStorage.getItem('role');

  return (
    <div className={styles.container}>
      {isLoading && <Loader />}
      {role && <Header />}
      <Outlet />
    </div>
  );
};

export default Layout;
