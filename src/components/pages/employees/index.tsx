import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@mui/material';

import { Loader, Table } from 'src/components/shared/ui';
import { Variant } from 'src/components/shared/ui/button/types';
import SearchIcon from 'src/components/shared/ui/icons/searchIcon/searchIcon';
import { TableButton } from 'src/components/shared/ui/table/types';
import { getEmployees } from 'src/redux/employee/thunk';
import { RootState } from 'src/redux/store';
import { AppDispatch } from 'src/types';
import { formattedTableData } from 'src/utils/formatters';

import { header, projects } from './constants';
import styles from './employee.module.css';
import { MappedEmployeeData } from './types';

const Employees = () => {
  const dispatch: AppDispatch<null> = useDispatch();
  const listEmployee = useSelector((state: RootState) => state.employee?.employees);
  const isLoading = useSelector((state: RootState) => state.employee?.isLoading);

  const matchedEmployee = listEmployee.map((employee) => ({
    id: employee._id,
    name: `${employee.user.firstName} ${employee.user.lastName}`,
    projects: formattedTableData(projects, 'name'),
  }));

  useEffect(() => {
    dispatch(getEmployees());
  }, []);

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
      {isLoading && <Loader />}
      <div className={styles.tableContainer}>
        <div className={styles.welcomeMessage}>
          <Typography variant="h1">Lista de Empleados</Typography>
        </div>
        <div className={styles.searchInputContainer}>
          <div className={styles.iconContainer}>
            <SearchIcon />
          </div>
          <input className={styles.searchInput} placeholder="Search"></input>
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
