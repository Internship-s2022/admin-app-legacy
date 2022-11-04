import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from 'src/redux/store';

import styles from './home.module.css';

const Home = () => {
  const user = useSelector((state: RootState) => state.auth.authUser);

  return (
    <section className={styles.container}>
      {user.name.length ? <h2>Bienvenido {user.name}</h2> : ''}
    </section>
  );
};

export default Home;
