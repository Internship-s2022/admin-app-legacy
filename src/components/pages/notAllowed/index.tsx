import React from 'react';

import styles from './notallowed.module.css';

const NotAllowed = () => {
  return (
    <section className={styles.container}>
      <h2>You don`t have access to this screen</h2>
    </section>
  );
};

export default NotAllowed;
