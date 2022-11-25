import React from 'react';

import styles from './headerLogo.module.css';
import { HeaderLogoProps } from './types';
const HeaderLogo = (props: HeaderLogoProps): JSX.Element => {
  const { testId } = props;
  return (
    <div data-testid={testId} color="primary">
      <img
        className={styles.logoImg}
        src={`${process.env.PUBLIC_URL}/assets/images/headerLogo.png`}
        alt="radium logo"
      />
    </div>
  );
};

export default HeaderLogo;
