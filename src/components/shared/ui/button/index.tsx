import React, { FC } from 'react';
import { Button } from '@mui/material';

import { BtnProps } from './types';
const Buttons: FC<BtnProps> = (props) => {
  const { onClick, btnName, disabled } = props;
  return (
    <Button variant="contained" onClick={onClick} disabled={disabled}>
      {btnName}
    </Button>
  );
};

export default Buttons;
