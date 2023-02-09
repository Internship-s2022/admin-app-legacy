import { AccessRoleType } from 'src/constants';

export type FormValues = {
  firstName: string;
  lastName: string;
  accessRoleType: AccessRoleType;
  email: string;
  date: Date;
  skills: [];
  potentialRole: PotentialRole[];
  availability: boolean;
};
export interface MappedUserList {
  _id?: string;
  firstName: string;
  accessRoleType: string;
}

export interface PotentialRole {
  label: string;
  value: string;
}

export enum RoleType {
  DEV = 'DEV',
  QA = 'QA',
  UX_UI = 'UX/UI',
  PM = 'PM',
  TL = 'TL',
}
