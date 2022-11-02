import React from 'react';
import GoogleButton from 'react-google-button';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import RadiumLogo from 'src/components/shared/ui/icons/radiumLogo/radiumLogo';
import { login } from 'src/redux/auth/thunk';
import { RootState } from 'src/redux/store';
import { AppDispatch } from 'src/types';

import styles from './login.module.css';

const Login = () => {
  const dispatch: AppDispatch<null> = useDispatch();

  const navigate = useNavigate();

  const userMail = useSelector((state: RootState) => state.auth.authUser.email);
  const regex = /^[a-zA-Z]+\.+[a-zA-Z]+@(radiumrocket.com)$/;

  const handleGoogleSignIn = async () => {
    await dispatch(login());
    const role = localStorage.getItem('role');
    if (!regex.test(userMail)) {
      navigate('/invalid-email');
    }
    if (role === 'ADMIN') {
      navigate('/admin/dashboard');
    } else if (role === 'SUPER_ADMIN') {
      navigate('/super-admin');
    }
  };

  return (
    <div className={styles.container}>
      <RadiumLogo />
      <GoogleButton onClick={handleGoogleSignIn} />
    </div>
  );
};

export default Login;
