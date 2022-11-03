import { Headers } from 'src/components/shared/ui/table/types';

import { PotentialRole } from '../../storybook/types';

export const projectHeadersEmp: Headers[] = [
  { header: 'Proyecto', key: 'name' },
  { header: 'Rol', key: 'role' },
  { header: 'Inicio', key: 'startDate' },
  { header: 'Fin', key: 'endDate' },
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
