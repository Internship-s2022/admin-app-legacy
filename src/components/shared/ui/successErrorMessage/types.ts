import { ErrorFormat } from 'src/redux/types';

export interface SuccessErrorMessageProps {
  error: ErrorFormat;
  open: boolean;
  setOpen: (boolean) => void;
  resource: string;
  operation: string;
}
