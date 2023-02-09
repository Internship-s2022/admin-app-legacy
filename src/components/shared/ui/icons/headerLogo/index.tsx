import React from 'react';

import styles from './headerLogo.module.css';
import { HeaderLogoProps } from './types';

const HeaderLogo = (props: HeaderLogoProps): JSX.Element => {
  const { testId } = props;
  return (
    <div className={styles.logoContainer} data-testid={testId} color="primary">
      <img src={`${process.env.PUBLIC_URL}/assets/images/headerLogo2.png`} alt="radium logo" />
    </div>
  );
};

export default HeaderLogo;
