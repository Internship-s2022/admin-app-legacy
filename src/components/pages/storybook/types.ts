export enum AccessRoleTypes {
  MANAGER = 'MANAGER',
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE',
}

export type FormValues = {
  FirstName: string;
  LastName: string;
  AccessRole: AccessRoleTypes;
};
