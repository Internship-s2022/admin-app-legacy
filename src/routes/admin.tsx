import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Clients, Employees, Home, Projects } from 'src/components/pages';

const Admin = (): JSX.Element => {
  return (
    <Routes>
      <Route path={'/'} element={<Home />} />
      <Route path={'/employees'} element={<Employees />} />
      <Route path={'/clients'} element={<Clients />} />
      <Route path={'/projects'} element={<Projects />} />
      <Route path="/" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default Admin;
