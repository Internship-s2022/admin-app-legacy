import { AccessRoleType } from 'src/constants';

export type FormValues = {
  firstName: string;
  lastName: string;
  accessRoleType: AccessRoleType;
  email: string;
  date: Date;
  skills: [];
  potentialRole: PotentialRole[];
};
export interface MappedUserList {
  id?: string;
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
  UI_UX = 'UI_UX',
  PM = 'PM',
  TL = 'TL',
}
