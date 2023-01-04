import { ErrorFormat } from 'src/redux/types';

export interface SuccessErrorMessageProps {
  error: ErrorFormat;
  open: boolean;
  resource?: string;
  operation: string;
}
