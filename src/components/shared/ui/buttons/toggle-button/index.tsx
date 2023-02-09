import React from 'react';
import { FieldValues, useController } from 'react-hook-form';
import { Switch } from '@mui/material';

import { ToggleButtonProps } from './types';

const ToggleButton = <Form extends FieldValues>(props: ToggleButtonProps<Form>): JSX.Element => {
  const { styles, testId, color, name, control } = props;
  const {
    field: { onChange, value },
  } = useController({ name, control });

  return (
    <Switch
      value={value}
      onChange={onChange}
      color={color}
      data-testid={testId}
      className={styles}
      checked={value}
    />
  );
};

export default ToggleButton;
