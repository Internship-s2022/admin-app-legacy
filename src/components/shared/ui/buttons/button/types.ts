export enum Variant {
  CONTAINED = 'contained',
  TEXT = 'text',
  OUTLINED = 'outlined',
}
export interface ButtonProps {
  onClick: () => void;
  label: string;
  disabled?: boolean;
  materialVariant: Variant;
  type?: string;
  testId: string;
  styles?: string;
  color?: 'error' | 'inherit' | 'warning' | 'info' | 'primary' | 'secondary' | 'success';
}
