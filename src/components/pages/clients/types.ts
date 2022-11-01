export interface ClientsData {
  id?: string;
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
  localContact: string;
  localEmail: string;
  clientContact: string;
  clientEmail: string;
  notes: string;
  relationshipStart: Date;
  relationshipEnd: Date;
};
