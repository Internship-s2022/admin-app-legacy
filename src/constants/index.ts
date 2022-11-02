export enum ApiRoutes {
  USER = '/users',
  EMPLOYEE = '/employees',
  PROJECTS = '/projects',
  CLIENT = '/clients',
  AUTH = '/auth',
}

//Navbar

export const superAdminNavbar = [
  { path: '/super-admin/', name: 'Home' },
  { path: '/super-admin/users', name: 'User' },
];

export const adminNavbar = [
  { path: '/admin/', name: 'Dashboard' },
  { path: '/admin/employees', name: 'Employees' },
  { path: '/admin/projects', name: 'Projects' },
  { path: '/admin/clients', name: 'Clients' },
];

export const navbarItems = {
  SUPERADMIN: superAdminNavbar,
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
