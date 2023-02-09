export interface AbsencesModalProps {
  setAbsence: (data) => void;
  absences: AbsencesData[];
  open: boolean;
}

export interface AbsencesData {
  _id?: string;
  motive: string;
  startDate: string;
  endDate: string;
}

export interface FormAbsencesValue {
  motive: string;
  startDate: string;
  endDate: string;
}

export enum Motives {
  VACATIONS = 'VACATIONS',
  LICENSE = 'LICENSE',
  STUDY = 'STUDY',
}
