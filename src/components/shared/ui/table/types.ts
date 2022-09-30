import { Variant } from '../button/types';

export interface TableProps {
  headers: string[];
  value: object[];
  testId: string;
  applyButton?: boolean;
  onClick?: () => void;
  buttonTestId?: string;
  buttonVariant?: Variant;
  buttonLabel?: string;
}
