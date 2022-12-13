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
  helper: Helper[]; //TODO: Tipar esto
  employee: string;
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
  setMemberId?: React.Dispatch<React.SetStateAction<any>>;
}
