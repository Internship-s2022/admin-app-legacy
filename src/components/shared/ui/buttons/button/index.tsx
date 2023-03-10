import React from 'react';
import { Button as MaterialButton } from '@mui/material';

import { ButtonProps } from './types';

const Button = (props: ButtonProps): JSX.Element => {
  const { onClick, label, disabled, materialVariant, styles, testId, color } = props;
  return (
    <MaterialButton
      data-testid={testId}
      variant={materialVariant}
      onClick={onClick}
      disabled={disabled}
      className={styles}
      color={color || 'info'}
    >
      {label}
    </MaterialButton>
  );
};

export default Button;
