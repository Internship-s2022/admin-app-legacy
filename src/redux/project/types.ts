import { ActionType } from 'typesafe-actions';

import { Role } from 'src/components/pages/projects/projectMembersLayout/memberForm/types';
import { Criticality, ProjectType } from 'src/components/pages/projects/types';
import { State } from 'src/redux/types';

import * as actions from './actions';

interface Client {
  _id: string;
  name: string;
}
export interface Project {
  isCritic: Criticality;
  _id?: string;
  clientName: Client;
  projectName: string;
  description: string;
  notes: string;
  startDate: Date;
  endDate: Date;
  members: Member[];
  isUpdated: boolean;
  projectType: ProjectType;
  isActive: boolean;
}

export interface Member {
  _id?: string;
  employee: Employee;
  project?: Project;
  role?: Role;
  memberDedication?: number;
  startDate?: Date;
  endDate?: Date;
  helper?: Helper[];
  active?: boolean;
}

export interface Helper {
  helperReference?: Employee;
  dependency?: number;
  dedication?: number;
  isActive?: boolean;
}
export interface Employee {
  _id: string;
  user: User;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
}
export interface ProjectState extends State<Project> {
  selectedProject?: Project;
}

export type ActionsType = ActionType<typeof actions>;
