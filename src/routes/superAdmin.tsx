import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Home, Users } from 'src/components/pages';

const SuperAdmin = (): JSX.Element => {
  return (
    <Routes>
      <Route path={'/'} element={<Home />} />
      <Route path={'/users'} element={<Users />} />
      <Route path="/" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default SuperAdmin;
