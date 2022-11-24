export enum ApiRoutes {
  USER = '/users',
  EMPLOYEE = '/employees',
  PROJECTS = '/projects',
  CLIENT = '/clients',
  AUTH = '/auth',
  MEMBER = '/members',
}

//Navbar

export const adminNavbar = [
  { path: '/admin/', name: 'Dashboard' },
  { path: '/admin/employees', name: 'Empleados' },
  { path: '/admin/projects', name: 'Proyectos' },
  { path: '/admin/clients', name: 'Clientes' },
];

export const navbarItems = {
  ADMIN: adminNavbar,
};

export const formattedRoleType = {
  SUPER_ADMIN: 'Super Admin',
  ADMIN: 'Admin',
  EMPLOYEE: 'Employee',
  MANAGER: 'Manager',
};

export enum AccessRoleType {
  MANAGER = 'MANAGER',
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE',
}

export const dropdownAccessRoles = [
  { value: 'MANAGER', label: 'Manager' },
  { value: 'ADMIN', label: 'Admin' },
  { value: 'SUPER_ADMIN', label: 'Super Admin' },
  { value: 'EMPLOYEE', label: 'Employee' },
];

//ROUTES

export enum UiRoutes {
  LOGIN = '/login',
  STORYBOOK = '/storybook',
  NOT_ALLOWED = '/not-allowed',
  ADMIN = '/admin',
  SUPER_ADMIN = '/super-admin/*',
  EMPLOYEES = '/employees',
  EDIT_EMPLOYEES = '/employees/edit',
  PROJECTS = '/projects',
  PROJECTS_FORM = '/projects/form',
  CLIENTS = '/clients',
  CLIENTS_FORM = '/clients/form',
}
