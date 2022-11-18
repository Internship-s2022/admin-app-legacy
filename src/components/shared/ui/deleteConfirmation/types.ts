export interface deleteConfirmationProps {
  resource: string;
  handleDelete: (data) => void;
  onClose: () => void;
  id: string;
  name: string;
}
