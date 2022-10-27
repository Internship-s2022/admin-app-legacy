import React from 'react';

import styles from './radiumLogo.module.css';

const RadiumLogo = (): JSX.Element => {
  return (
    <div className={styles.svgIcon} color="primary">
      <img src="assets/images/Logo.png" alt="radium logo" />
    </div>
  );
};

export default RadiumLogo;
