import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@mui/material';

import { Table } from 'src/components/shared/ui';
import { Variant } from 'src/components/shared/ui/button/types';
import SearchIcon from 'src/components/shared/ui/icons/searchIcon/searchIcon';
import { Headers, TableButton } from 'src/components/shared/ui/table/types';
import { getEmployees } from 'src/redux/employee/thunk';
import { RootState } from 'src/redux/store';
import { AppDispatch } from 'src/types';

import styles from './employee.module.css';
import { MappedEmployeeData, Projects } from './types';

const Employees = () => {
  const dispatch: AppDispatch<null> = useDispatch();
  const listEmployee = useSelector((state: RootState) => state.employee?.employees);

  const projects: Projects[] = [
    {
      name: 'Radium Admin',
    },
    {
      name: 'Qira',
    },
  ];
  const matchedEmployee = listEmployee.map((employee) => ({
    id: employee._id,
    name: `${employee.user.firstName} ${employee.user.lastName}`,
    projects:
      projects.length > 1
        ? `${projects[0].name} y ${(projects.length - 1).toString()} más`
        : projects[0].name,
  }));

  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  const header: Headers[] = [
    { header: 'Nombre', key: 'name' },
    { header: 'Proyectos', key: 'projects' },
  ];

  const buttonsArray: TableButton<MappedEmployeeData>[] = [
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
        <Typography variant="h1">¡Lista de Empleados!</Typography>
      </div>
      <div className={styles.tableContainer}>
        <div className={styles.searchInputContainer}>
          <div className={styles.iconContainer}>
            <SearchIcon />
          </div>
          <input className={styles.searchInput}></input>
        </div>
        <Table<MappedEmployeeData>
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
