import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import {
  AddClients,
  AddProjects,
  Clients,
  EditEmployee,
  Employees,
  Home,
  Projects,
} from 'src/components/pages';

const Admin = (): JSX.Element => {
  return (
    <Routes>
      <Route path={'/'} element={<Home />} />
      <Route path={'/employees'} element={<Employees />} />
      <Route path={'/employees/edit/:id'} element={<EditEmployee />} />
      <Route path={'/clients'} element={<Clients />} />
      <Route path={'/clients/add'} element={<AddClients />} />
      <Route path={'/projects'} element={<Projects />} />
      <Route path={'/projects/add'} element={<AddProjects />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default Admin;
