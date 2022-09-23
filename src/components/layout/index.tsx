import React, { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Home, Login } from '../pages';
import { Footer, Header } from '../shared/common';
import styles from './layout.module.css';

const Layout: FC = () => {
  return (
    <div className={styles.container}>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login/*" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
};

export default Layout;
