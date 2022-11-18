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
}

export enum Role {
  DEV = 'DEV',
  QA = 'QA',
  UX_UI = 'UX/UI',
  TL = 'TL',
  PM = 'PM',
}
