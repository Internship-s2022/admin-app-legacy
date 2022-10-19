export enum ApiRoutes {
  USER = '/users',
  EMPLOYEE = '/employees',
  PROJECTS = '/projects',
  CLIENT = '/clients',
}

//Navbar
export const navbarItems = [
  {
    path: '/',
    name: 'Dashboard',
  },
  {
    path: '/projects',
    name: 'Proyectos',
  },
  {
    path: '/employees',
    name: 'Empleados',
  },
  {
    path: '/clients',
    name: 'Clientes',
  },
  {
    path: '/storybook',
    name: 'Storybook',
  },
  {
    path: '/users',
    name: 'Users',
  },
];

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
