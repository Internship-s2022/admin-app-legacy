import { Headers } from 'src/components/shared/ui/table/types';

import { Projects } from './types';

export const header: Headers[] = [
  { header: 'Nombre', key: 'name' },
  { header: 'Proyectos', key: 'projects' },
];

export const projects: Projects[] = [
  {
    name: 'Radium Admin',
  },
  {
    name: 'Qira',
  },
];
