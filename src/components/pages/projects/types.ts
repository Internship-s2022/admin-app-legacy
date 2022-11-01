export interface Member {
  firstName: string;
  lastName: string;
}

interface Client {
  _id: string;
  name: string;
}

export interface ProjectData {
  id?: string;
  projectName: string;
  projectType: string;
  clientName: Client;
  members: Member[];
}

export interface MappedProjectData extends Omit<ProjectData, 'members' | 'clientName'> {
  members: string;
  clientName: string;
}

export enum ProjectType {
  ProductBuilding = 'Product Building',
  StaffAugmentation = 'Staff Augmentation',
}

export enum Criticality {
  Alta = 'Alta',
  Media = 'Media',
  Baja = 'Baja',
}

export type ProjectFormValues = {
  id?: string;
  projectName: string;
  projectType: ProjectType;
  clientName: string;
  startDate: string;
  endDate?: string;
  criticality: Criticality;
  members: Member[];
  description: string;
  notes: string;
};
