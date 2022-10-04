import { FieldValues, UseControllerProps } from 'react-hook-form';
import { TextFieldProps } from '@mui/material';

interface selectOption {
  value: string;
  label: string;
}

export type DropdownProps<Form extends FieldValues> = {
  testId: string;
  options: selectOption[];
  onChange?: () => void;
} & UseControllerProps<Form> &
  TextFieldProps;
