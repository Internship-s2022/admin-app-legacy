import { Member } from 'src/components/pages/home/types';
import { Criticality } from 'src/components/pages/projects/types';

export interface CardProps {
  id: string;
  resourceId: string;
  name: string;
  resource: string;
  members?: Member[];
  notification?: string;
  criticality?: Criticality;
  customMessage?: string;
  isCustom?: boolean;
}
