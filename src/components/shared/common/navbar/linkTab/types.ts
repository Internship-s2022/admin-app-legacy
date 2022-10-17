export interface LinkTabProps {
  label?: string;
  href?: string;
  handleNavigation: (path: string) => void;
}
