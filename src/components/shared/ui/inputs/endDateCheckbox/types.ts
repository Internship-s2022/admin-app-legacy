export interface EndDateCheckboxProps {
  handleEndDateDisable: (boolean) => void;
  endDateDisabled: boolean;
  resource: string;
  changed?: boolean;
  setChanged?: (data) => void;
}
