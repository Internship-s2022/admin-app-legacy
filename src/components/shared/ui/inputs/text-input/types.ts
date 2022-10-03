import { FieldValues, UseControllerProps } from 'react-hook-form';
import { TextFieldProps } from '@mui/material';

export type InputProps<Form extends FieldValues> = {
  testId: string;
  onChange?: () => void;
} & UseControllerProps<Form> &
  TextFieldProps;
