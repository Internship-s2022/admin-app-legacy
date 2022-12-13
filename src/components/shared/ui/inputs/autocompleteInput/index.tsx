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
    field: { onChange },
    fieldState: { error },
  } = useController({ name, control });

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      defaultValue={''}
      options={options}
      getOptionLabel={(option) => option.label ?? option}
      isOptionEqualToValue={(option, value) => {
        return option.value === value.value;
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
