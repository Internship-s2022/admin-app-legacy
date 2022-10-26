export interface ToggleButtonProps {
  testId: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  styles?: string;
}
