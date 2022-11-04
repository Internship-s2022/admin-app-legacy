import { SwitchProps } from '@mui/material';

export type ToggleButtonProps = {
  testId: string;
  handleChange: (checked: boolean) => void;
  styles?: string;
} & SwitchProps;
