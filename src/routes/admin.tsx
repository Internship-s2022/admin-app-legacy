import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import {
  Clients,
  ClientsForm,
  EditEmployee,
  Employees,
  Home,
  ProjectMembersLayout,
  Projects,
} from 'src/components/pages';
import { UiRoutes } from 'src/constants';

const Admin = (): JSX.Element => {
  return (
    <Routes>
      <Route path={'/home'} element={<Home />} />
      <Route path={UiRoutes.EMPLOYEES} element={<Employees />} />
      <Route path={`${UiRoutes.EDIT_EMPLOYEES}/:id`} element={<EditEmployee />} />
      <Route path={UiRoutes.CLIENTS} element={<Clients />} />
      <Route path={UiRoutes.CLIENTS_FORM} element={<ClientsForm />} />
      <Route path={`${UiRoutes.CLIENTS_FORM}/:id`} element={<ClientsForm />} />
      <Route path={UiRoutes.PROJECTS} element={<Projects />} />
      <Route path={UiRoutes.PROJECTS_FORM} element={<ProjectMembersLayout />} />
      <Route path={`${UiRoutes.PROJECTS_FORM}/:id`} element={<ProjectMembersLayout />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default Admin;
