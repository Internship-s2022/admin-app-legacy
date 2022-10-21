import { Headers } from 'src/components/shared/ui/table/types';
import { formattedRoleType } from 'src/constants';

import { MappedUserList } from './types';

export const storybookHeaders: Headers[] = [
  { header: 'Nombre', key: 'firstName' },
  { header: 'Rol de acceso', key: 'accessRoleType' },
];

export const tableValues: MappedUserList[] = [
  { firstName: 'Nicolas Lobos', accessRoleType: formattedRoleType.SUPER_ADMIN },
  { firstName: 'Samuel Trillo', accessRoleType: formattedRoleType.ADMIN },
  { firstName: 'Karen Soto', accessRoleType: formattedRoleType.EMPLOYEE },
  { firstName: 'Luciano Alarcon', accessRoleType: formattedRoleType.EMPLOYEE },
  { firstName: 'Juan Moreira', accessRoleType: formattedRoleType.EMPLOYEE },
  { firstName: 'Paula Rinaldi', accessRoleType: formattedRoleType.EMPLOYEE },
  { firstName: 'Alex Galindo', accessRoleType: formattedRoleType.EMPLOYEE },
];
