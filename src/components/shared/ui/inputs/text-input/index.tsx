import React from 'react';
import { FieldValues, useController } from 'react-hook-form';
import { TextField } from '@mui/material';

import { InputProps } from './types';

const Input = <Form extends FieldValues>(props: InputProps<Form>): JSX.Element => {
  const {
    field,
    fieldState: { error },
  } = useController(props);

  const { label, type } = props;
  return (
    <div>
      <TextField
        {...field}
        label={label}
        helperText={error?.message}
        type={type}
        fullWidth
        error={Boolean(error)}
      />
    </div>
  );
};

export default Input;
