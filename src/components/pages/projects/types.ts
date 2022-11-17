import { Employee } from 'src/redux/employee/types';

export interface Member {
  _id;
  fullName: string;
}

interface Client {
  _id: string;
  name: string;
}

export interface ProjectData {
  _id?: string;
  projectName: string;
  projectType: string;
  clientName: Client;
  members?: Member[];
}

export interface MappedProjectData extends Omit<ProjectData, 'members' | 'clientName'> {
  members: string;
  clientName: string;
}

export enum ProjectType {
  PRODUCT_BUILDING = 'PRODUCT_BUILDING',
  STAFF_AUGMENTATION = 'STAFF_AUGMENTATION',
}

export enum Criticality {
  ALTA = 'ALTA',
  MEDIA = 'MEDIA',
  BAJA = 'BAJA',
}

export type ProjectFormValues = {
  id?: string;
  projectName: string;
  projectType: ProjectType;
  clientName: string;
  startDate: Date;
  endDate?: Date;
  isCritic: Criticality;
  members?: Member[];
  description: string;
  notes: string;
};

export interface SearchProjectData {
  _id: string;
  projectName: string;
  projectType: string;
  clientName: string;
  startDate: string;
  endDate: string;
  criticality: string;
  description: string;
  notes: string;
  active: string;
  members: string;
}
