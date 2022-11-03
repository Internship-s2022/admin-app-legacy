import { AccessRoleType } from 'src/constants';

export interface PrivateRouteProps {
  role?: AccessRoleType;
  redirectPath?: string;
  children?: JSX.Element;
}
