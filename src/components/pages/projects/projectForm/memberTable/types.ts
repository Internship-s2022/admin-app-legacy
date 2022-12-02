import { Member } from 'src/redux/project/types';

export interface MemberTableProps {
  list: Member[];
  setMemberId: React.Dispatch<React.SetStateAction<any>>;
}
