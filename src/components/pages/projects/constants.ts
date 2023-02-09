import { Headers } from 'src/components/shared/ui/table/types';

import { CriticalType } from './projectMembersLayout/projectForm/types';

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

export const optionsIsCritic = [
  { value: CriticalType.ALTA, label: 'Alta' },
  { value: CriticalType.MEDIA, label: 'Media' },
  { value: CriticalType.BAJA, label: 'Baja' },
];

export const projectFilterOptions = ['projectName', 'projectType', 'clientName', 'members'];
