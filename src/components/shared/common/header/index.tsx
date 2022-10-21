import React from 'react';

import LogOutIcon from '../../ui/icons/logOutIcons';
import Navbar from '../navbar';
import styles from './header.module.css';

const Header = () => {
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
          <LogOutIcon />
        </div>
      </div>
    </header>
  );
};

export default Header;
