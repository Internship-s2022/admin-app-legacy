import { ListUserData } from '../types';

export interface AccessRoleModalProps {
  row: ListUserData;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
