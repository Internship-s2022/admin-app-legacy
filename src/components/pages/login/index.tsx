import React from 'react';
import GoogleButton from 'react-google-button';

import { capitalizeFirstLetter } from 'src/utils/formatters';

import styles from './login.module.css';

const Login = () => {
  const handleGoogleSignIn = () => {
    alert('Aca se habre el modal');
  };

  return (
    <div className={styles.container}>
      <h2>{capitalizeFirstLetter('login')}</h2>
      <GoogleButton onClick={handleGoogleSignIn} />
    </div>
  );
};

// REMINDER:
// CARGAR EL LOGO Y RENDERIZARLO
// ARRANCAR TICKET 33 (REDUX)

export default Login;
