import { Client } from 'src/redux/client/types';
import { Employee } from 'src/redux/employee/types';

import { Helper, Role } from '../projects/projectMembersLayout/memberForm/types';
import { Criticality, ProjectType } from '../projects/types';

export interface Member {
  _id?: string;
  employee: Employee;
  role?: Role;
  memberDedication?: number;
  helper?: Helper;
  active?: boolean;
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
