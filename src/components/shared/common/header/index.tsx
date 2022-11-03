import React from 'react';
import { useNavigate } from 'react-router-dom';

import firebaseApp from 'src/helper/firebase';

import LogOutIcon from '../../ui/icons/logOutIcons';
import Navbar from '../navbar';
import styles from './header.module.css';

const Header = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await firebaseApp.auth().signOut();
    navigate('/login');
  };

  return (
    <header>
      <div className={styles.container}>
        <div className={styles.brand}>
          <span>Radium</span>
          <span>Admin</span>
        </div>
        <nav className={styles.navbarContainer}>
          <Navbar />
        </nav>
        <div className={styles.logout}>
          <span>Salir</span>
          <LogOutIcon onClick={() => handleLogout()} />
        </div>
      </div>
    </header>
  );
};

export default Header;
