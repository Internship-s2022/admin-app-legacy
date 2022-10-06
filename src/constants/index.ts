//Navbar
export const navbarItems = [
  {
    path: '/#',
    name: 'Dashboard',
  },
  {
    path: '/#',
    name: 'Proyectos',
  },
  {
    path: '/#',
    name: 'Empleados',
  },
  {
    path: '/#',
    name: 'Clientes',
  },
];

// export const managerNavbarItems = [
//   {
//     path: '/manager/home',
//     name: 'Dashboard',
//   },
//   {
//     path: '/manager/projects',
//     name: 'Proyectos',
//   },
//   {
//     path: '/manager/employees',
//     name: 'Empleados',
//   },
//   {
//     path: '/manager/clients',
//     name: 'Clientes',
//   },
// ];
//Users
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

export enum ApiRoutes {
  USER = '/users',
}
