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
import { UiRoutes } from 'src/constants';

const Admin = (): JSX.Element => {
  return (
    <Routes>
      <Route path={'/'} element={<Home />} />
      <Route path={UiRoutes.EMPLOYEES} element={<Employees />} />
      <Route path={`${UiRoutes.EDIT_EMPLOYEES}/:id`} element={<EditEmployee />} />
      <Route path={UiRoutes.CLIENTS} element={<Clients />} />
      <Route path={UiRoutes.ADD_CLIENTS} element={<AddClients />} />
      <Route path={UiRoutes.PROJECTS} element={<Projects />} />
      <Route path={UiRoutes.ADD_PROJECTS} element={<AddProjects />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default Admin;
