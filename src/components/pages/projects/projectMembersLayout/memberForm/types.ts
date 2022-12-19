import { Employee } from 'src/redux/employee/types';

export interface Helper {
  _id: string;
  helperReference: {
    value: string;
    label: string;
  };
  dependency: number;
  dedication: number;
  isActive: boolean;
}

export interface FormValues {
  employee: {
    value: string;
    label: string;
  };
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
  helper: Helper[];
  employee: {
    value: string;
    label: string;
  };
  project: string;
  role: Role;
  memberDedication: number;
  startDate: Date;
  endDate: Date;
  active: boolean;
}

export interface MemberFormProps {
  projectId: string;
  memberData?: Member;
  dropdownData?: Employee[];
  setMemberId?: React.Dispatch<React.SetStateAction<any>>;
}
