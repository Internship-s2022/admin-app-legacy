import { DropdownProps } from 'src/components/shared/ui/inputs/dropdown/types';
import { Employee } from 'src/redux/employee/types';

export interface Helper {
  _id: string;
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
  helper: Helper[];
  employee: string;
  project: string;
  role: Role;
  memberDedication: number;
  startDate: Date;
  endDate: Date;
  active: boolean;
}

interface DropdownData {
  value: string;
  label: string;
}

export interface MemberFormProps {
  projectId: string;
  memberData?: Member;
  dropdownData?: Employee[];
  setMemberId?: React.Dispatch<React.SetStateAction<any>>;
}
