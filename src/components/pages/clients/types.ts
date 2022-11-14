export interface ClientsData {
  _id?: string;
  name: string;
  projects: string;
  localContact: string;
  clientContact: string;
}

export interface Project {
  _id: string;
  projectName: string;
  description: string;
  startDate: Date;
  endDate: Date;
  isCritic: string;
}

export interface ContactData {
  _id?: string;
  name: string;
  email: string;
}

export type FormValues = {
  id: string;
  name: string;
  localContact: ContactData;
  clientContact: ContactData;
  notes?: string;
  relationshipStart?: Date;
  relationshipEnd?: Date;
  isActive: boolean;
};

export interface SearchClientData {
  _id: string;
  name: string;
  projects: string;
  clientContact: string;
  email: string;
  localContact: string;
  localEmail: string;
  relationshipStart: string;
  relationshipEnd: string;
  notes: string;
  active: string;
}
