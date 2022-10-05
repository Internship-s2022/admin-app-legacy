import React from 'react';
import { FieldValues, useController } from 'react-hook-form';
import { MenuItem, TextField } from '@mui/material';

import { DropdownProps } from './types';

const Dropdown = <Form extends FieldValues>(props: DropdownProps<Form>): JSX.Element => {
  const {
    field,
    fieldState: { error },
  } = useController(props);

  const { label, options, styles } = props;

  return (
    <TextField
      {...field}
      className={styles}
      label={label}
      helperText={error?.message}
      select
      fullWidth
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default Dropdown;
