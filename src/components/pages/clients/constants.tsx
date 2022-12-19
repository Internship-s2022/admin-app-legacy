import { Headers } from 'src/components/shared/ui/table/types';

export const header: Headers[] = [
  { header: 'Cliente', key: 'name' },
  { header: 'Proyectos', key: 'projects' },
  { header: 'Contacto cliente', key: 'clientContact' },
  { header: 'Contacto Radium', key: 'localContact' },
];

export const clientFilterOptions = [
  'name',
  'projects',
  'clientContact',
  'email',
  'localContact',
  'localContactEmail',
  'relationshipEnd',
  'relationshipStart',
  'notes',
];
