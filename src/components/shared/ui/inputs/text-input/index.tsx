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
    placeholder,
    handleOnChange,
  } = props;

  const {
    field: { onChange, ...rest },
    fieldState: { error },
  } = useController(props);

  const cleanCharacters = (value) => {
    for (let i = 0; i < value.length; i++) {
      if (value.charAt(i) != '0') {
        const res = value.substr(i);
        return res;
      }
    }
    return value;
  };
  return (
    <div>
      <TextField
        {...rest}
        value={type === 'number' ? cleanCharacters(rest.value) : rest.value}
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
        placeholder={placeholder}
        onKeyDown={(e) => {
          if (type === 'number' && ['e', 'E', '+', '-'].includes(e.key)) {
            e.preventDefault();
          }
        }}
        onChange={(e) => {
          onChange(e);
          handleOnChange && handleOnChange(e);
        }}
      />
    </div>
  );
};

export default Input;
