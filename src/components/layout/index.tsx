import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Home, Login, Users } from '../pages';
import Clients from '../pages/clients';
import Employees from '../pages/employees';
import Projects from '../pages/projects';
import StoryBook from '../pages/storybook';
import { Header } from '../shared/common';
import styles from './layout.module.css';

const Layout = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login/*" element={<Login />} />
          <Route path="storybook/*" element={<StoryBook />} />
          <Route path="users/*" element={<Users />} />
          <Route path="employees/*" element={<Employees />} />
          <Route path="projects/*" element={<Projects />} />
          <Route path="clients/*" element={<Clients />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Layout;
