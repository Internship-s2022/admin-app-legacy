import { FieldValues, UseControllerProps } from 'react-hook-form';

export type DPickerProps<Form extends FieldValues> = {
  label: string;
  testId: string;
  styles?: string;
  error?: boolean;
  disabled?: boolean;
  maxDate?: Date;
  minDate?: Date;
} & UseControllerProps<Form>;
