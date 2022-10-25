import { AccessRoleType } from 'src/constants';

export type FormValues = {
  firstName: string;
  lastName: string;
  accessRoleType: AccessRoleType;
  email: string;
  date: Date;
  skills: [];
};
export interface MappedUserList {
  id?: string;
  firstName: string;
  accessRoleType: string;
}
