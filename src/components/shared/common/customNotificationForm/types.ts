export type FormValues = {
  customMessage: string;
  date: Date;
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