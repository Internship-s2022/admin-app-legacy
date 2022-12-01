import { Headers } from 'src/components/shared/ui/table/types';
import { AccessRoleType } from 'src/constants';

export const userHeaders: Headers[] = [
  { header: 'Nombre', key: 'name' },
  { header: 'Rol de acceso', key: 'accessRoleType' },
];

export const accessRoles = [
  { value: AccessRoleType.MANAGER, label: 'Manager' },
  { value: AccessRoleType.ADMIN, label: 'Admin' },
  { value: AccessRoleType.SUPER_ADMIN, label: 'Super Admin' },
  { value: AccessRoleType.EMPLOYEE, label: 'Employee' },
];
export const optionsAccessRoleType = [
  { value: AccessRoleType.MANAGER, label: 'Manager' },
  { value: AccessRoleType.ADMIN, label: 'Admin' },
  { value: AccessRoleType.EMPLOYEE, label: 'Employee' },
];

export const userFilterOptions = ['name', 'email', 'firebaseUid', 'location', 'birthDate'];
