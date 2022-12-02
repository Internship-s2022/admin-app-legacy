export interface SearchBarProps<T> {
  setFilter?: (filter: string) => void;
  filter?: string;
  inputValue?: string;
}

export interface SearchData {
  _id?: string;
}
