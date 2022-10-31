import { PotentialRole } from '../storybook/types';

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

export type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  seniority: Seniority;
  skills: string[];
  potentialRole: PotentialRole[];
  availability: boolean;
  historyProjects: Projects[];
  careerPlan: string;
  notes: string;
};

export enum Seniority {
  JR = 'JR',
  SSR = 'SSR',
  SR = 'SR',
}
