import * as React from 'react';
import { FieldValues, useController } from 'react-hook-form';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';

import styles from 'src/components/shared/ui/inputs/autocompleteChip/autocompleteChip.module.css';

import { AutocompleteProps } from './types';

const AutocompleteChip = <Form extends FieldValues>(
  props: AutocompleteProps<Form>,
): JSX.Element => {
  const { control, name, skills } = props;
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name, control });

  const handleDelete = (chipToDelete: string) => {
    onChange(value.filter((options) => options !== chipToDelete));
  };

  return (
    <div>
      <Autocomplete
        multiple
        value={value}
        id="tags-filled"
        options={skills.map((option) => option)}
        freeSolo
        renderTags={() => null}
        defaultValue={value}
        renderInput={(params) => (
          <TextField
            {...params}
            helperText={error?.message || ' '}
            error={Boolean(error)}
            variant="filled"
            label="Skills"
            placeholder="Select or add skill"
            color="info"
          />
        )}
        onChange={(_, values) => {
          onChange(values);
        }}
        data-testid={'autocompleteTestId'}
      />
      {value?.map((option) => (
        <Chip
          key={option}
          variant="outlined"
          label={option}
          onDelete={() => handleDelete(option)}
          className={styles.chips}
          data-testid={option.toLowerCase()}
        />
      ))}
    </div>
  );
};

export default AutocompleteChip;
