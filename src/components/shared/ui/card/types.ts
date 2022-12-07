import { Criticality } from 'src/components/pages/projects/types';
import { Member } from 'src/redux/project/types';
import { Resources } from 'src/types';

export interface CardProps {
  name: string;
  resource: Resources;
  members?: Member[];
  notification?: string;
  criticality?: Criticality;
  customMessage?: string;
  isCustom?: boolean;
}
