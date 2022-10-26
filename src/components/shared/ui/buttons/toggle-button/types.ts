import { SwitchProps } from '@mui/material';

export type ToggleButtonProps = {
  testId: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  styles?: string;
} & SwitchProps;
