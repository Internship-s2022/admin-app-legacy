import { Variant } from '../button/types';

export interface TableProps<Data> {
  headers: Headers[];
  value: Data[];
  showButtons?: boolean;
  testId: string;
  buttonVariant: Variant;
  buttonLabel: string;
  buttonTestId: string;
  onClick: (row: Data) => void;
}
export interface RowData {
  id?: string;
}
export interface Headers {
  header: string;
  key: string;
}
