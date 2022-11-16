export interface SearchBarProps<T> {
  details: T[];
  setFilteredList: (data: T[]) => void;
  mainArray: string[];
}

export interface SearchData {
  _id?: string;
}
