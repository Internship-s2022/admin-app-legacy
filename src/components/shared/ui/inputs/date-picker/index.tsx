import React from 'react';
import { FieldValues, useController } from 'react-hook-form';
import { TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { DPickerProps } from './types';

const DatePickerInput = <Form extends FieldValues>(props: DPickerProps<Form>): JSX.Element => {
  const {
    field: { value, onChange, onBlur },
    fieldState: { error },
  } = useController(props);

  const { label, testId, styles } = props;
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        onChange={onChange}
        value={value}
        label={label}
        className={styles}
        renderInput={(params) => (
          <TextField
            {...params}
            color="info"
            data-testid={testId}
            onBlur={onBlur}
            error={Boolean(error)}
            helperText={error?.message || ' '}
          />
        )}
        inputFormat={'yyyy/MM/dd'}
      />
    </LocalizationProvider>
  );
};

export default DatePickerInput;
