import { format } from 'date-fns';
import React from 'react';
import { TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { DPickerProps } from './types';

const DatePickerInput = (props: DPickerProps) => {
  const [value, setValue] = React.useState<string>(format(new Date(Date.now()), 'yyyy/MM/dd'));

  const { label, testId, styles } = props;

  console.log('VALUE:', value);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label={label}
        data-test-id={testId}
        value={value}
        className={styles}
        onChange={(newValue) => setValue(format(new Date(newValue), 'yyyy/MM/dd'))}
        renderInput={(params) => <TextField {...params} />} //set inputs props with TextField props
        inputFormat={'yyyy/MM/dd'}
      />
    </LocalizationProvider>
  );
};

export default DatePickerInput;
