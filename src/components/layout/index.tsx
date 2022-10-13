import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { RootState } from 'src/redux/store';

import { Home, Login, Users } from '../pages';
import StoryBook from '../pages/storybook';
import { Header } from '../shared/common';
import { Loader } from '../shared/ui';
import styles from './layout.module.css';

const Layout = (): JSX.Element => {
  const isPending = useSelector((state: RootState) => state.user.isPending);

  return (
    <div className={styles.container}>
      {isPending && <Loader />}
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login/*" element={<Login />} />
          <Route path="storybook/*" element={<StoryBook />} />
          <Route path="users/*" element={<Users />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Layout;
