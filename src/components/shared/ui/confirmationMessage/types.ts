export interface ConfirmationMessageProps {
  title: string;
  handleConfirm: (data?: any) => void;
  handleClose: () => void;
  description: string;
  testIdTitle?: string;
  testIdDescription?: string;
  color?: string;
}
