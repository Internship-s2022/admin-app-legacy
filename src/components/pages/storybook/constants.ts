import { Headers } from 'src/components/shared/ui/table/types';
import { formattedRoleType } from 'src/constants';

import { MappedUserList } from './types';

export const storybookHeaders: Headers[] = [
  { header: 'Nombre', key: 'firstName' },
  { header: 'Rol de acceso', key: 'accessRoleType' },
];

export const tableValues: MappedUserList[] = [
  { _id: '1', firstName: 'Nicolas Lobos', accessRoleType: formattedRoleType.SUPER_ADMIN },
  { _id: '2', firstName: 'Samuel Trillo', accessRoleType: formattedRoleType.ADMIN },
  { _id: '3', firstName: 'Karen Soto', accessRoleType: formattedRoleType.EMPLOYEE },
  { _id: '4', firstName: 'Luciano Alarcon', accessRoleType: formattedRoleType.EMPLOYEE },
  { _id: '5', firstName: 'Juan Moreira', accessRoleType: formattedRoleType.EMPLOYEE },
  { _id: '6', firstName: 'Paula Rinaldi', accessRoleType: formattedRoleType.EMPLOYEE },
  { _id: '7', firstName: 'Alex Galindo', accessRoleType: formattedRoleType.EMPLOYEE },
];
