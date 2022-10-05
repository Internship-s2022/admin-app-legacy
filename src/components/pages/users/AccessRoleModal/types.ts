import { UserData } from '../types';

export interface AccessRoleModalProps {
  row: UserData;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
