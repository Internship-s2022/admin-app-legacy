import React from 'react';
import { FieldValues, useController, useWatch } from 'react-hook-form';
import { Checkbox, FormControl, FormControlLabel, FormGroup } from '@mui/material';

import { CheckProps } from './types';

const CheckboxInput = <Form extends FieldValues>(props: CheckProps<Form>): JSX.Element => {
  const { control, name, options, testId, className } = props;
  const {
    field: { ref, onChange, value },
  } = useController({
    name,
    control,
  });
  const checkboxValues = useWatch({ control, name: name }) || [];

  const handleChange = (changedValues) => {
    const selectedValues = [...checkboxValues];

    if (selectedValues.length > 0) {
      const index = selectedValues.findIndex((item) => item === changedValues);
      if (index === -1) {
        selectedValues.push(changedValues);
      } else {
        selectedValues.splice(index, 1);
      }
    } else {
      selectedValues.push(changedValues);
    }
    onChange(selectedValues);
  };

  return (
    <div>
      <FormControl className={className}>
        <FormGroup>
          {options.map((option) => (
            <FormControlLabel
              value={value['value']}
              control={
                <Checkbox
                  inputRef={ref}
                  onChange={() => handleChange(option['value'])}
                  data-testid={option['value']}
                  checked={value.some((item) => item === option['value'])}
                />
              }
              label={<p>{option['label']}</p>}
              key={option['value']}
              data-testid={testId}
            />
          ))}
        </FormGroup>
      </FormControl>
    </div>
  );
};

export default CheckboxInput;
