import React from 'react';
import GoogleButton from 'react-google-button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import LoginLogo from 'src/components/shared/ui/icons/loginLogo';
import { login } from 'src/redux/auth/thunk';
import { AppDispatch } from 'src/types';

import styles from './login.module.css';

const Login = () => {
  const dispatch: AppDispatch<null> = useDispatch();

  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    await dispatch(login());
    const role = await localStorage.getItem('role');
    if (role === 'ADMIN') {
      navigate('/admin');
    } else if (role === 'SUPER_ADMIN') {
      navigate('/super-admin');
    }
  };

  return (
    <div className={styles.container}>
      <LoginLogo testId="radium-logo" />
      <GoogleButton
        label="Continuar con Google"
        className={styles.googleButton}
        type="light"
        test-id="google-button"
        onClick={handleGoogleSignIn}
      />
    </div>
  );
};

export default Login;
