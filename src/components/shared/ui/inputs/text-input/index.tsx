import React from 'react';
import { FieldValues, useController } from 'react-hook-form';
import { TextField } from '@mui/material';

import { InputProps } from './types';

const Input = <Form extends FieldValues>(props: InputProps<Form>): JSX.Element => {
  const {
    field,
    fieldState: { error },
  } = useController(props);

  const { label, type, variant, styles, testId, multiline, maxRows } = props;
  return (
    <div>
      <TextField
        {...field}
        data-test-id={testId}
        className={styles}
        label={label}
        helperText={error?.message}
        type={type}
        fullWidth
        error={Boolean(error)}
        variant={variant}
        multiline={multiline}
        maxRows={maxRows}
      />
    </div>
  );
};

export default Input;
