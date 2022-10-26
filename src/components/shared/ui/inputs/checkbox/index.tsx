import React from 'react';
import { FieldValues, useController, useWatch } from 'react-hook-form';
import { Checkbox, FormControl, FormControlLabel, FormGroup } from '@mui/material';

import { CheckProps } from './types';

const CheckboxInput = <Form extends FieldValues>(props: CheckProps<Form>): JSX.Element => {
  const { control, name, options, testId, className } = props;
  const {
    field: { ref, onChange },
  } = useController({
    name,
    control,
  });

  const checkboxIds = useWatch({ control, name: name }) || [];

  const handleChange = (change) => {
    const newArray = [...checkboxIds];
    const item = change;

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
      <FormControl className={className}>
        <FormGroup>
          {options.map((option) => (
            <FormControlLabel
              control={
                <Checkbox
                  inputRef={ref}
                  onChange={() => handleChange(option['value'])}
                  data-testid={option['value']}
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
