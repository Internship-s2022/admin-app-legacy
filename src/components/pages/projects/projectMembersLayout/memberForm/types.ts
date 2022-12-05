import { Employee } from 'src/redux/employee/types';
import { Project } from 'src/redux/project/types';

export interface Helper {
  helperReference: string;
  dependency: number;
  dedication: number;
  isActive: boolean;
}

export interface FormValues {
  employee: string;
  project: string;
  role: Role;
  memberDedication: number;
  helper: Helper;
  startDate: Date;
  endDate: Date;
  active: boolean;
  projectId?: string;
}

export enum Role {
  DEV = 'DEV',
  QA = 'QA',
  UX_UI = 'UX/UI',
  TL = 'TL',
  PM = 'PM',
}

export interface Member {
  _id: string;
  helper: Helper;
  employee: string;
  project: string;
  role: Role;
  memberDedication: number;
  startDate: Date;
  endDate: Date;
  active: boolean;
}

export interface AddMemberFormProps {
  projectId: string;
  memberData?: Member;
  setMemberId?: React.Dispatch<React.SetStateAction<any>>;
}
