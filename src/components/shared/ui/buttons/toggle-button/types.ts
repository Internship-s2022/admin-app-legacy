import { FieldValues, UseControllerProps } from 'react-hook-form';
import { SwitchProps } from '@mui/material';

export type ToggleButtonProps<Form extends FieldValues> = {
  testId: string;
  styles?: string;
} & UseControllerProps<Form> &
  SwitchProps;
