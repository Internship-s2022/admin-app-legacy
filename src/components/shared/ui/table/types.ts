import { Variant } from '../button/types';
export interface TableProps<Data> {
  headers: Headers[];
  value: Data[];
  showButtons?: boolean;
  testId: string;
  buttons?: TableButton<Data>[];
  profileIcon?: boolean;
}
export interface RowData {
  id?: string;
}
export interface Headers {
  header: string;
  key: string;
}
export interface TableButton<Data> {
  active: boolean;
  testId: string;
  label: string;
  onClick: (row: Data) => void;
  variant: Variant;
}
