import { Variant } from '../buttons/button/types';
export interface TableProps<Data> {
  headers: Headers[];
  value: Data[];
  showButtons?: boolean;
  testId: string;
  buttons?: TableButton<Data>[];
  profileIcon?: boolean;
  setDataList?: (data: Data[]) => void;
  isActive?: boolean;
}

export interface RowData {
  _id?: string;
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
export interface SortBy {
  dir: 'asc' | 'desc';
}
