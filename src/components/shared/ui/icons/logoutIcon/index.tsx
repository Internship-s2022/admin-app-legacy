import React from 'react';
import { SvgIcon } from '@mui/material';

import { LogoutIconProps } from './types';

const LogoutIcon = (props: LogoutIconProps) => {
  const { color } = props;
  return (
    <SvgIcon>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.3583 5L13.8613 6.41L15.5388 8H6.86451V10H15.5388L13.8613 11.58L15.3583 13L19.6053 9L15.3583 5ZM2.6176 2H10.0497V0H2.6176C1.4497 0 0.494141 0.9 0.494141 2V16C0.494141 17.1 1.4497 18 2.6176 18H10.0497V16H2.6176V2Z"
          fill={color}
          fillOpacity="0.82"
        />
      </svg>
    </SvgIcon>
  );
};

export default LogoutIcon;
