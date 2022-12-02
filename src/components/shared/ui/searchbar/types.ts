export interface SearchBarProps<T> {
  details?: T[];
  setFilteredList?: (data: T[]) => void;
  mainArray?: string[];
  setFilter?: (filter: string) => void;
}

export interface SearchData {
  _id?: string;
}
