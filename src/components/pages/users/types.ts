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
