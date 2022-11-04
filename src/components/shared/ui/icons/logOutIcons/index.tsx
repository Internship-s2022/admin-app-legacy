import React from 'react';
import { SvgIcon } from '@mui/material';

import styles from './logOutIcon.module.css';

const LogOutIcon = (props: any): JSX.Element => {
  return (
    <SvgIcon className={styles.logOutIcon} onClick={props.onClick} color="secondary">
      <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
      </svg>
    </SvgIcon>
  );
};

export default LogOutIcon;
