export interface FormValues {
  employee: string;
  role: Role;
  memberDedication: number;
  helper: string;
  dependency: number;
  helperDedication: number;
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
