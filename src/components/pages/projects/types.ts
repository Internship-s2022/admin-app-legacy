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
