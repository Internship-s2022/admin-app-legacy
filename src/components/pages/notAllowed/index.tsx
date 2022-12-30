import React from 'react';

import styles from './notallowed.module.css';

const NotAllowed = () => {
  return (
    <section className={styles.container}>
      <img src={`${process.env.PUBLIC_URL}/assets/images/notAllowed.png`} alt="Not found"></img>
      <h2>Acceso denegado</h2>
      <p>Usted no posee los permisos necesarios para ingresar</p>
      <p>Por favor contactarse con el equipo de soporte</p>
    </section>
  );
};

export default NotAllowed;
