import { FieldValues, UseControllerProps } from 'react-hook-form';

export type DateIntervalProps<Form extends FieldValues> = {
  setStart: (data) => void;
  setEnd: (data) => void;
  startDate: Date;
  endDate: Date;
  excludeStartDate?: boolean;
} & UseControllerProps<Form>;
