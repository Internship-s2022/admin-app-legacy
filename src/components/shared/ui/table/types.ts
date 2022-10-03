export interface TableProps<Data extends RowData> {
  headers: Headers[];
  value: Data[];
  showButtons?: boolean;
  buttons?: TableButton[];
  testId: string;
}
export interface RowData {
  _id?: string;
}
export interface Headers {
  header: string;
  key: string;
}
export interface TableButton {
  active: boolean;
  icon: JSX.Element;
  title: string;
  onClick: () => void;
}
