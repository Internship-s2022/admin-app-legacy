import { Headers } from 'src/components/shared/ui/table/types';

export const userHeaders: Headers[] = [
  { header: 'Nombre', key: 'name' },
  { header: 'Rol de acceso', key: 'accessRoleType' },
];

export const accessRoles = [
  { value: 'MANAGER', label: 'Manager' },
  { value: 'ADMIN', label: 'Admin' },
  { value: 'SUPER_ADMIN', label: 'Super Admin' },
  { value: 'EMPLOYEE', label: 'Employee' },
];
export const userFilterData = [
  'name',
  'email',
  'firebaseUid',
  'location',
  'birthDate',
  'accessRoleType',
  'active',
];
