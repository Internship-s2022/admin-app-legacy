export interface EmployeeData {
  id: string;
  name: string;
  projects: Projects[];
}

interface Project {
  _id: string;
  projectName: string;
}
export interface Projects {
  project: Project;
  role: string;
  startDate?: Date;
  endDate?: Date;
}

export interface User {
  birthDate: Date;
  email: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  _id: string;
}

export interface MappedEmployeeData extends Omit<EmployeeData, 'projects'> {
  projects: string;
}

export type FormValues = {
  id: string;
  user: User;
  seniority: Seniority;
  skills: string[];
  potentialRole: string[];
  availability: boolean;
  projectHistory?: Projects[];
  careerPlan: string;
  notes: string;
};

export enum Seniority {
  JR = 'JR',
  SSR = 'SSR',
  SR = 'SR',
}
