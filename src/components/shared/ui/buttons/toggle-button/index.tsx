import React from 'react';
import { Switch } from '@mui/material';

import { ToggleButtonProps } from './types';

const ToggleButton = (props: ToggleButtonProps): JSX.Element => {
  const { styles, handleChange, testId, color } = props;

  return <Switch onChange={handleChange} color={color} data-testid={testId} className={styles} />;
};

export default ToggleButton;
