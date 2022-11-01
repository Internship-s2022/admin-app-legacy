import { Headers } from 'src/components/shared/ui/table/types';

import { PotentialRole } from '../../storybook/types';

export const projectHeadersEmp: Headers[] = [
  { header: 'Proyecto', key: 'projects' },
  { header: 'Rol', key: 'Rol' },
  { header: 'Inicio', key: 'name' },
  { header: 'Fin', key: 'name' },
];

export const seniority = [
  { value: 'JR', label: 'JR' },
  { value: 'SSR', label: 'SSR' },
  { value: 'SR', label: 'SR' },
];

export const arraySkills: string[] = ['React', 'Redux', 'CSS', 'Vue'];

export const checkboxData: PotentialRole[] = [
  { label: 'TL', value: 'TL' },
  { label: 'PM', value: 'PM' },
  { label: 'DEV', value: 'DEV' },
  { label: 'QA', value: 'QA' },
  { label: 'UXUI', value: 'UXUI' },
];
