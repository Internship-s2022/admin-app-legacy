import { max, min } from 'date-fns';
import React from 'react';
import { FieldValues, useController } from 'react-hook-form';
import { TextField } from '@mui/material';

import { InputProps } from './types';

const Input = <Form extends FieldValues>(props: InputProps<Form>): JSX.Element => {
  const {
    label,
    type,
    variant,
    styles,
    testId,
    multiline,
    rows,
    color = 'info',
    disabled,
    inputProps,
  } = props;

  const {
    field,
    fieldState: { error },
  } = useController(props);

  return (
    <div>
      <TextField
        {...field}
        data-testid={testId}
        className={styles}
        label={label}
        helperText={!disabled && (error?.message || ' ')}
        type={type}
        fullWidth
        error={Boolean(error)}
        variant={variant}
        multiline={multiline}
        rows={rows}
        disabled={disabled}
        color={color}
        inputProps={inputProps}
      />
    </div>
  );
};

export default Input;
