import React from 'react';
import { FieldValues, useController } from 'react-hook-form';
import { TextField } from '@mui/material';

import { InputProps } from './types';

const Input = <Form extends FieldValues>(props: InputProps<Form>): JSX.Element => {
  const {
    field,
    fieldState: { error },
  } = useController(props);

  return (
    <div>
      <TextField
        {...field}
        label={props.label}
        placeholder={props.name}
        helperText={error?.message}
        fullWidth
      />
    </div>
  );
};

export default Input;
