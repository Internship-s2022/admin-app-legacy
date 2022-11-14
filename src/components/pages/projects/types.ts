export interface Member {
  firstName: string;
  lastName: string;
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
  PROJECT_BUILDING = 'PROJECT_BUILDING',
  STAFF_AUMENTATION = 'STAFF_AUMENTATION',
  //ARREGLAR EN EL BACK Y LUEGO ACÁ AUGMENTATION
  //CAMBIAR PRODUCT POR PROJECT EN BACK
}

export enum Criticality {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
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
