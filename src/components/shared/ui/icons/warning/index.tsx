import React from 'react';
import { SvgIcon } from '@mui/material';

const WarningIcon = () => {
  return (
    <SvgIcon>
      <svg
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="10" y="9" width="5" height="10" fill="black" />
        <path
          d="M1.0415 21.5H23.9582L12.4998 2.5L1.0415 21.5ZM13.5415 18.5H11.4582V16.5H13.5415V18.5ZM13.5415 14.5H11.4582V10.5H13.5415V14.5Z"
          fill="#FFE91F"
        />
        <path d="M1.88709 21L12.5 3.46562L23.1129 21H1.88709Z" stroke="black" />
      </svg>
    </SvgIcon>
  );
};

export default WarningIcon;
