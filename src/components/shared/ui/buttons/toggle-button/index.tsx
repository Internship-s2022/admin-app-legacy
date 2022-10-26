import React from 'react';
import { Switch } from '@mui/material';

import { ToggleButtonProps } from './types';

const ToggleButton = (props: ToggleButtonProps): JSX.Element => {
  const { styles, handleChange, color } = props;

  return <Switch onChange={handleChange} color={color} />;
};

export default ToggleButton;
