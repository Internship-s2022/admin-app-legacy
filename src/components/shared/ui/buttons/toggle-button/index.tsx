import React from 'react';
import { Switch } from '@mui/material';

import { ToggleButtonProps } from './types';

const ToggleButton = (props: ToggleButtonProps): JSX.Element => {
  const { styles, handleChange, testId, color, checked } = props;

  return (
    <Switch
      onChange={(e) => handleChange(e.target.checked)}
      color={color}
      data-testid={testId}
      className={styles}
      checked={checked}
    />
  );
};

export default ToggleButton;
