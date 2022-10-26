import React from 'react';
import { Switch } from '@mui/material';

import { ToggleButtonProps } from './types';

const ToggleButton = (props: ToggleButtonProps): JSX.Element => {
  const { styles, handleChange } = props;

  return <Switch onChange={handleChange} />;
};

export default ToggleButton;
