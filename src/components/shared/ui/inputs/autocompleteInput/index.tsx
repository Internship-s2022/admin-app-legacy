import React from 'react';
import { FieldValues, useController } from 'react-hook-form';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import { AutocompleteInputProps } from './types';

const AutocompleteInput = <Form extends FieldValues>(
  props: AutocompleteInputProps<Form>,
): JSX.Element => {
  const { control, options, name, label } = props;
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name, control });

  return (
    <Autocomplete
      disableClearable
      disablePortal
      id="combo-box-demo"
      value={value}
      options={options || []}
      getOptionLabel={(option) => options.find((item) => item.value === option)?.label ?? ''}
      isOptionEqualToValue={(option, value) => option.value === value}
      renderOption={(props, option) => {
        return (
          <li {...props} key={option.value}>
            {option.label}
          </li>
        );
      }}
      renderInput={(params) => (
        <TextField
          helperText={error?.message || ' '}
          {...params}
          label={label}
          error={Boolean(error)}
          color="info"
        />
      )}
      onChange={(_, value) => {
        onChange(value.value);
      }}
    />
  );
};

export default AutocompleteInput;
