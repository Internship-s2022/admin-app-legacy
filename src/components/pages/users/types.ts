import { AccessRoleType } from 'src/constants';

export type FormValues = {
  firebaseUid: string;
  accessRoleType?: AccessRoleType;
  email: string;
  firstName: string;
  lastName: string;
  location: string;
  birthDate: Date;
  isActive: boolean;
};

export interface UserData {
  id?: string;
  name: string;
  accessRoleType: string;
  email?: string;
  photo?: string;
}
