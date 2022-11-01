import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { RootState } from 'src/redux/store';

import { Home, Login, Users } from '../pages';
import Clients from '../pages/clients';
import ClientForm from '../pages/clients/clientForm';
import Employees from '../pages/employees';
import EditEmployee from '../pages/employees/edit-employee';
import Projects from '../pages/projects';
import ProjectForm from '../pages/projects/projectForm';
import StoryBook from '../pages/storybook';
import { Header } from '../shared/common';
import { Loader } from '../shared/ui';
import styles from './layout.module.css';

const Layout = (): JSX.Element => {
  const isLoading = useSelector((state: RootState) => state.ui.isLoading);

  return (
    <div className={styles.container}>
      {isLoading && <Loader />}
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login/*" element={<Login />} />
          <Route path="storybook/*" element={<StoryBook />} />
          <Route path="users/*" element={<Users />} />
          <Route path="employees/*" element={<Employees />} />
          <Route path="employees/edit/*" element={<EditEmployee />} />
          <Route path="projects/*" element={<Projects />} />
          <Route path="projects/add/*" element={<ProjectForm />} />
          <Route path="clients/*" element={<Clients />} />
          <Route path="clients/add/*" element={<ClientForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Layout;
