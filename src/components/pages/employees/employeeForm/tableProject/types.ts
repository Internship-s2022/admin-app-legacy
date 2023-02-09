export interface TableProjectProps {
  projectList: FormattedProject[];
}

interface FormattedProject {
  id: string;
  name: string;
  role: string;
  startDate: string | Date;
  endDate: string | Date;
}
