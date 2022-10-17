import React from 'react';

import LogOutIcon from '../../ui/icons/LogOutIcon';
import Navbar from '../navbar';
import styles from './header.module.css';

const Header = () => {
  return (
    <header>
      <div className={styles.container}>
        <div className={styles.brand}>Radium Rocket</div>
        <nav className={styles.navbarContainer}>
          <Navbar />
        </nav>
        <div className={styles.logout}>
          <span>Salir</span>
          <LogOutIcon />
        </div>
      </div>
      <nav className={styles.temporaryNavbar}>
        <div className={styles.appName}>App</div>
        <ul className={styles.routes}>
          <li>
            <a href="/login">login</a>
          </li>
          <li>
            <a href="/storybook">Storybook</a>
          </li>
          <li>
            <a href="/users">Users</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
