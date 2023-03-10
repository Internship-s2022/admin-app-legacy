import { Headers } from 'src/components/shared/ui/table/types';
import { AccessRoleType } from 'src/constants';

export const userHeaders: Headers[] = [
  { header: 'Nombre', key: 'name' },
  { header: 'Rol de acceso', key: 'accessRoleType' },
  { header: 'Email', key: 'email' },
];

export const accessRoles = [
  { value: AccessRoleType.MANAGER, label: 'Manager' },
  { value: AccessRoleType.ADMIN, label: 'Admin' },
  { value: AccessRoleType.EMPLOYEE, label: 'Empleado' },
];

export const userFilterOptions = ['name', 'email'];
