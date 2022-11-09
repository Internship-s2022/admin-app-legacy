import { ErrorFormat } from 'src/redux/types';

export interface EmptyDataProps {
  error?: ErrorFormat;
  handleReload?: () => void;
  handleAdd?: () => void;
  resource: string;
  isEmployee?: boolean;
}
