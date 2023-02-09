import { Headers } from 'src/components/shared/ui/table/types';

export const header: Headers[] = [
  { header: 'Nombre', key: 'name' },
  { header: 'Proyectos', key: 'projects' },
  { header: 'Seniority', key: 'seniority' },
  { header: 'Disponibilidad', key: 'availability' },
];

export const employeeFilterOptions = ['name', 'projects', 'skills', 'potentialRole'];
