import { Headers } from 'src/components/shared/ui/table/types';

export const formattedProjectType = {
  PRODUCT_BUILDING: 'Product Building',
  STAFF_AUGMENTATION: 'Staff Augmentation',
};

export const projectHeaders: Headers[] = [
  { header: 'Nombre del proyecto', key: 'projectName' },
  { header: 'Tipo de proyecto', key: 'projectType' },
  { header: 'Cliente', key: 'clientName' },
  { header: 'Involucrados', key: 'members' },
];

export const projectFilterOptions = [
  'projectName',
  'clientName',
  'projectType',
  'startDate',
  'endDate',
  'description',
  'active',
  'members',
  'criticality',
];
