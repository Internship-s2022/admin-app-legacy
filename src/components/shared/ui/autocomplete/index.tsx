import * as React from 'react';
import { useController } from 'react-hook-form';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';

const SkillsAutocomplete = (props) => {
  const handleDelete = (chipToDelete: string) => {
    onChange((value) => value.filter((value) => value !== chipToDelete));
  };

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController(props);

  return (
    <div>
      <Autocomplete
        multiple
        value={value}
        id="tags-filled"
        // eslint-disable-next-line react/prop-types
        options={props.skills.map((option) => option)}
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
      />
      {value?.map((option) => (
        <Chip
          key={option}
          variant="outlined"
          label={option}
          onDelete={() => handleDelete(option)}
        />
      ))}
    </div>
  );
};

export default SkillsAutocomplete;
