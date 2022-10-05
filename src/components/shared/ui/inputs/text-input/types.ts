import { FieldValues, UseControllerProps } from 'react-hook-form';
import { TextFieldProps } from '@mui/material';

export type InputProps<Form extends FieldValues> = {
  testId: string;
  onChange?: () => void;
  styles?: string;
} & UseControllerProps<Form> &
  TextFieldProps;
