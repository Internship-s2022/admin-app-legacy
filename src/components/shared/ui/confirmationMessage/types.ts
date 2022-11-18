import { ErrorFormat } from 'src/redux/types';

export interface ConfirmationMessageProps {
  error: ErrorFormat;
  open: boolean;
  setOpen: (boolean) => void;
  resource: string;
  operation: string;
}
