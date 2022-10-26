import { Headers } from 'src/components/shared/ui/table/types';
import { formattedRoleType } from 'src/constants';

import { MappedUserList } from './types';

export const storybookHeaders: Headers[] = [
  { header: 'Nombre', key: 'firstName' },
  { header: 'Rol de acceso', key: 'accessRoleType' },
];

export const tableValues: MappedUserList[] = [
  { id: '1', firstName: 'Nicolas Lobos', accessRoleType: formattedRoleType.SUPER_ADMIN },
  { id: '2', firstName: 'Samuel Trillo', accessRoleType: formattedRoleType.ADMIN },
  { id: '3', firstName: 'Karen Soto', accessRoleType: formattedRoleType.EMPLOYEE },
  { id: '4', firstName: 'Luciano Alarcon', accessRoleType: formattedRoleType.EMPLOYEE },
  { id: '5', firstName: 'Juan Moreira', accessRoleType: formattedRoleType.EMPLOYEE },
  { id: '6', firstName: 'Paula Rinaldi', accessRoleType: formattedRoleType.EMPLOYEE },
  { id: '7', firstName: 'Alex Galindo', accessRoleType: formattedRoleType.EMPLOYEE },
];
