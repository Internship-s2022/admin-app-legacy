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
  isActive: boolean;
  projectId?: string;
}

export enum Role {
  DEV = 'DEV',
  QA = 'QA',
  UX_UI = 'UX/UI',
  TL = 'TL',
  PM = 'PM',
}

export interface AddMemberFormProps {
  projectId: string;
}
