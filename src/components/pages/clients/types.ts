export interface ClientsData {
  _id?: string;
  name: string;
  projects: string;
  clientContact: string;
  email: string;
  localContact: string;
}

export interface ContactData {
  _id?: string;
  name: string;
  email: string;
}

export type FormValues = {
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
