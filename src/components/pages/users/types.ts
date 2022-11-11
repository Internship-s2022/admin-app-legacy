import { AccessRoleType } from 'src/constants';

export type FormValues = {
  id?: string;
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
  _id?: string;
  name: string;
  accessRoleType: string;
  email?: string;
  photo?: string;
}

export interface SearchUserData {
  _id: string;
  firebaseUid: string;
  accessRoleType: string;
  email: string;
  name: string;
  location: string;
  birthDate: string;
  active: string;
}
