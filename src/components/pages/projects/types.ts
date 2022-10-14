export interface Member {
  firstName: string;
  lastName: string;
}

export interface ProjectData {
  id?: string;
  projectName: string;
  projectType: string;
  clientName: string;
  members: Member[];
}

export interface MappedProjectData extends Omit<ProjectData, 'members'> {
  members: string;
}
