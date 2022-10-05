import { Variant } from '../button/types';

export interface TableProps<Data extends RowData> {
  headers: Headers[];
  value: Data[];
  showButtons?: boolean;
  testId: string;
  buttonVariant: Variant;
  buttonLabel: string;
  buttonTestId: string;
  onClick: (row: any) => void;
}
export interface RowData {
  _id?: string;
}
export interface Headers {
  header: string;
  key: string;
}
