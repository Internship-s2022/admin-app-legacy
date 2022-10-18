export interface ClientsData {
  id?: string;
  name: string;
  projects: string[];
  clientContact: ContactData;
  localContact: ContactData;
}

export interface ContactData {
  name: string;
  email: string;
}
