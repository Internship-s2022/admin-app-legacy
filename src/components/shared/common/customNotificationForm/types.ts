export type FormValues = {
  customMessage: string;
  limitDate: Date;
};

export interface customNotificationProps {
  resource: Resource;
  id: string;
}

export enum Resource {
  PROJECT = 'PROJECT',
  EMPLOYEE = 'EMPLOYEE',
  CLIENT = 'CLIENT',
}
