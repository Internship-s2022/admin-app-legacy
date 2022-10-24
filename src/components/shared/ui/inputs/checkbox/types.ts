import { FieldValues, UseControllerProps } from 'react-hook-form';
import { CheckboxProps } from '@mui/material';

import { PotentialRole } from 'src/components/pages/storybook/types';

export type CheckProps<Form extends FieldValues> = {
  label?: string;
  styles?: string;
  onChange?: () => void;
  options: PotentialRole[];
  config: Config;
  testId: string;
} & UseControllerProps<Form> &
  CheckboxProps;

interface Config {
  label: string;
  value: string;
}
