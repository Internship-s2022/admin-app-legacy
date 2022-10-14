import React from 'react';

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
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
          </svg>
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
