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
}
