import { FieldValues, UseControllerProps } from 'react-hook-form';
import { TextFieldProps } from '@mui/material';

export type InputProps<Form extends FieldValues> = {
  testId: string;
  onChange?: () => void;
  handleOnChange?: (e) => void;
  styles?: string;
  placeholder?: string;
} & UseControllerProps<Form> &
  TextFieldProps;
