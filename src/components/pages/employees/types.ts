export interface EmployeeData {
  id: string;
  name: string;
  projects: Projects[];
}

export interface Projects {
  name: string;
}

export interface User {
  birthDate: Date;
  email: string;
  firstName: string;
  lastName: string;
  _id: string;
}

export interface MappedEmployeeData extends Omit<EmployeeData, 'projects'> {
  projects: string;
}
