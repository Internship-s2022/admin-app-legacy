import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@mui/material';

import { Table } from 'src/components/shared/ui';
import SearchIcon from 'src/components/shared/ui/icons/searchIcon/searchIcon';
import { getEmployees } from 'src/redux/employee/thunk';
import { RootState } from 'src/redux/store';
import { AppDispatch } from 'src/types';

import { buttonsArray, header, projects } from './constants';
import styles from './employee.module.css';
import { MappedEmployeeData } from './types';

const Employees = () => {
  const dispatch: AppDispatch<null> = useDispatch();
  const listEmployee = useSelector((state: RootState) => state.employee?.employees);

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
