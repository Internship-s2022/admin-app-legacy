import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Home, Login } from '../pages';
import StoryBook from '../pages/storybook';
import { Footer, Header } from '../shared/common';
import styles from './layout.module.css';

const Layout = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login/*" element={<Login />} />
          <Route path="storybook/*" element={<StoryBook />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
};

export default Layout;
