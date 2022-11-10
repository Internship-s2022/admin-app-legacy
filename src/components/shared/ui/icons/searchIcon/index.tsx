import React from 'react';
import { SvgIcon } from '@mui/material';

import styles from './searchIcon.module.css';

const SearchIcon = (): JSX.Element => {
  return (
    <SvgIcon className={styles.svgIcon} color="primary">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.5">
          <path
            d="M15.4834 14.1865L15.2381 14.531L15.5371 14.8301L19.3535 18.6465C19.5488 18.8417 19.5488 19.1583 19.3535 19.3535C19.1583 19.5488 18.8417 19.5488 18.6465 19.3535L14.8301 15.5371L14.531 15.2381L14.1865 15.4834C13.2875 16.1236 12.1885 16.5 11 16.5C7.96243 16.5 5.5 14.0376 5.5 11C5.5 7.96243 7.96243 5.5 11 5.5C14.0376 5.5 16.5 7.96243 16.5 11C16.5 12.1885 16.1236 13.2875 15.4834 14.1865ZM11 6.5C8.51472 6.5 6.5 8.51472 6.5 11C6.5 13.4852 8.51471 15.5 11 15.5C13.4852 15.5 15.5 13.4852 15.5 11C15.5 8.51471 13.4852 6.5 11 6.5Z"
            fill="#2C2C2C"
            stroke="#373867"
          />
        </g>
      </svg>
    </SvgIcon>
  );
};

export default SearchIcon;
