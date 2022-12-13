import { FieldValues, UseControllerProps } from 'react-hook-form';

export type AutocompleteInputProps<Form extends FieldValues> = {
  name: string;
  options: any[];
  label: string;
} & UseControllerProps<Form>;

// TODO: Type de options
