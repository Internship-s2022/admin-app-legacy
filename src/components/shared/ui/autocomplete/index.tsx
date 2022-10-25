import * as React from 'react';
import { FieldValues, useController } from 'react-hook-form';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';

import styles from 'src/components/shared/ui/autocomplete/autocomplete.module.css';

import { AutocompleteProps } from './types';

const SkillsAutocomplete = <Form extends FieldValues>(
  props: AutocompleteProps<Form>,
): JSX.Element => {
  const { control, name, skills, testId } = props;
  const handleDelete = (chipToDelete: string) => {
    onChange((value) => value.filter((value) => value !== chipToDelete));
  };

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name, control });

  return (
    <div>
      <Autocomplete
        multiple
        value={value}
        id="tags-filled"
        options={skills.map((option) => option)}
        freeSolo
        renderTags={() => null}
        renderInput={(params) => (
          <TextField
            helperText={error?.message}
            error={Boolean(error)}
            {...params}
            variant="filled"
            label="Skills"
            placeholder="Select or add skill"
          />
        )}
        onChange={(_, values) => {
          onChange(values);
        }}
        data-testid={testId}
      />
      {value?.map((option) => (
        <Chip
          key={option}
          variant="outlined"
          label={option}
          onDelete={() => handleDelete(option)}
          className={styles.chips}
        />
      ))}
    </div>
  );
};

export default SkillsAutocomplete;
