import { Variant } from 'src/components/shared/ui/button/types';
import { Headers, TableButton } from 'src/components/shared/ui/table/types';

import { MappedEmployeeData, Projects } from './types';

export const header: Headers[] = [
  { header: 'Nombre', key: 'name' },
  { header: 'Proyectos', key: 'projects' },
];

export const buttonsArray: TableButton<MappedEmployeeData>[] = [
  {
    active: true,
    label: 'editar',
    testId: 'editButton',
    variant: Variant.CONTAINED,
    onClick: (data) => {
      console.log(data, 'edit employee');
    },
  },
];

export const projects: Projects[] = [
  {
    name: 'Radium Admin',
  },
  {
    name: 'Qira',
  },
];
