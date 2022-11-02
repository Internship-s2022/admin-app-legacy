import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import Layout from 'src/components/layout';
import { Login } from 'src/components/pages';
import { RootState } from 'src/redux/store';

const Home = (): JSX.Element => {
  const authenticated = useSelector((state: RootState) => state.auth.authUser); //use this variable to manage logout button
  return (
    <Routes>
      <Route>
        <h1>HOLA ESTO ES EL HOME</h1>
        {/* <Route path="/login" element={<Login />}></Route> */}
      </Route>
    </Routes>
  );
};

export default Home;
