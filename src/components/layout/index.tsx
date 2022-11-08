import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { tokenListener } from 'src/helper/firebase';
import { RootState } from 'src/redux/store';

import { Header } from '../shared/common';
import { Loader } from '../shared/ui';
import styles from './layout.module.css';

const Layout = (): JSX.Element => {
  const isLoading = useSelector((state: RootState) => state.ui.isLoading);
<<<<<<< HEAD
  const role = localStorage.getItem('role');

  useEffect(() => {
    tokenListener();
  }, []);

=======
  console.log(process.env.REACT_APP_USER);
>>>>>>> 9114dd7 (RA-XX: Adding logic to e2e)
  return (
    <div className={styles.container}>
      {isLoading && <Loader />}
      {role && <Header />}
      <Outlet />
    </div>
  );
};

export default Layout;
