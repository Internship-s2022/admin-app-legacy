import React from 'react';
import { Button as MaterialButton } from '@mui/material';

import { ButtonProps } from './types';

const Button = (props: ButtonProps): JSX.Element => {
  const { onClick, label, disabled } = props;
  return (
    <MaterialButton variant="contained" onClick={onClick} disabled={disabled}>
      {label}
    </MaterialButton>
  );
};

export default Button;
