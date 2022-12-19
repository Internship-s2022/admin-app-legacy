import { FieldValues, UseControllerProps } from 'react-hook-form';

export type AutocompleteInputProps<Form extends FieldValues> = {
  name: string;
  options: any[];
  label: string;
  disable?: boolean;
} & UseControllerProps<Form>;
