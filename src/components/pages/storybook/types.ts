import { AccessRoleType } from 'src/constants';

export type FormValues = {
  firebaseUid: string;
  accessRole?: AccessRoleType;
  email: string;
  firstName: string;
  lastName: string;
  location: string;
  birthDate: Date;
  isActive: boolean;
};

export interface MappedUserList {
  id?: string;
  firstName: string;
  lastName: string;
  accessRoleType: string;
}
