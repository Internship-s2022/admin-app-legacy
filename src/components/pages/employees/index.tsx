import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@mui/material';

import { Table } from 'src/components/shared/ui';
import { Variant } from 'src/components/shared/ui/button/types';
import { Headers, TableButton } from 'src/components/shared/ui/table/types';
import { getEmployees } from 'src/redux/employee/thunk';
import { RootState } from 'src/redux/store';
import { AppDispatch } from 'src/types';

import styles from './employee.module.css';
import { EmployeeData } from './types';

const Employees = () => {
  const dispatch: AppDispatch<null> = useDispatch();
  const listEmployee = useSelector((state: RootState) => state.employee?.employees);

  const matchedEmployee = listEmployee.map((employee) => ({
    id: employee._id,
    name: `${employee.user.firstName} ${employee.user.lastName}`,
    projects: employee.projectHistory,
  }));

  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  const header: Headers[] = [
    { header: 'Nombre', key: 'name' },
    { header: 'Proyectos', key: 'projectName' },
  ];
  const buttonsArray: TableButton<EmployeeData>[] = [
    {
      active: true,
      label: 'editar',
      testId: 'editButton',
      variant: Variant.CONTAINED,
      onClick: (data) => {
        console.log(data, 'edit employee');
      },
    },
  ];

  return (
    <>
      <div className={styles.welcomeMessage}>
        <Typography variant="h1">¡Bienvenido Admin!</Typography>
        <p>¡Esta es la lista de Empleados! Puedes asignarles el acceso que desees!</p>
      </div>
      <div className={styles.tableContainer}>
        <Table<EmployeeData>
          showButtons={true}
          testId={'userTable'}
          headers={header}
          value={matchedEmployee}
          profileIcon={true}
          buttons={buttonsArray}
        />
      </div>
    </>
  );
};

export default Employees;
