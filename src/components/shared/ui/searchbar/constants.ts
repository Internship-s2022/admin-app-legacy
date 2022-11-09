import { Employee } from 'src/redux/employee/types';

export interface SearchBarProps {
  details: any[];
  setFilteredList: (data: any) => void;
}
