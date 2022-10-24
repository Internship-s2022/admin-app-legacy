import React from 'react';
import { FieldValues, useController, useWatch } from 'react-hook-form';
import { Checkbox, FormControl, FormControlLabel, FormGroup } from '@mui/material';

import { CheckProps } from './types';

const CheckboxInput = <Form extends FieldValues>(props: CheckProps<Form>): JSX.Element => {
  const { control, name, options, config, testId, ...rest } = props;
  const {
    field: { ref, value, onChange, ...inputProps },
  } = useController({
    name,
    control,
  });

  const checkboxIds = useWatch({ control, name: name }) || [];

  const handleChange = (value) => {
    const newArray = [...checkboxIds];
    const item = value;

    if (newArray.length > 0) {
      const index = newArray.findIndex((x) => x === item);
      if (index === -1) {
        newArray.push(item);
      } else {
        newArray.splice(index, 1);
      }
    } else {
      newArray.push(item);
    }
    onChange(newArray);
  };

  return (
    <div>
      <FormControl className={rest?.className}>
        <FormGroup>
          {options.map((option) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={value?.some((checked) => checked === option[config.value])}
                  {...inputProps}
                  inputRef={ref}
                  onChange={() => handleChange(option[config.value])}
                  disabled={rest?.disabled}
                  data-testid={option[config.value]}
                />
              }
              label={<p>{option[config.label]}</p>}
              key={option[config.value]}
              data-testid={testId}
            />
          ))}
        </FormGroup>
      </FormControl>
    </div>
  );
};

export default CheckboxInput;
