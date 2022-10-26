import { FieldValues, UseControllerProps } from 'react-hook-form';

export type AutocompleteProps<Form extends FieldValues> = {
  name: string;
  skills: string[];
} & UseControllerProps<Form>;
