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
