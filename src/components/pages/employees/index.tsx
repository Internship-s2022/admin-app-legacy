import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';

import { Table } from 'src/components/shared/ui';
import { Variant } from 'src/components/shared/ui/buttons/button/types';
import SearchIcon from 'src/components/shared/ui/icons/searchIcon/searchIcon';
import { TableButton } from 'src/components/shared/ui/table/types';
import { getEmployees } from 'src/redux/employee/thunk';
import { RootState } from 'src/redux/store';
import { AppDispatch } from 'src/types';
import { formattedTableData } from 'src/utils/formatters';

import { header, projects } from './constants';
import styles from './employee.module.css';
import { EmployeeData, MappedEmployeeData, Projects } from './types';

const Employees = () => {
  const dispatch: AppDispatch<null> = useDispatch();
  const navigate = useNavigate();

  const listEmployee = useSelector((state: RootState) => state.employee?.list);
  const employeeError = useSelector((state: RootState) => state.employee?.error);

  const matchedEmployee = listEmployee.map((employee) => ({
    id: employee._id,
    name: `${employee.user?.firstName} ${employee.user?.lastName}`,
    projects: formattedTableData<Projects>(projects, 'name'),
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
      onClick: (row) => navigate(`/employees/edit/${row.id}`),
    },
  ];

  return !listEmployee.length ? (
    <div className={styles.noList}>
      <div className={styles.noListTitle}>
        <span>Lista de Empleados</span>
        <div className={styles.noListMessage}>
          <p>No se ha podido cargar la lista de Empleados</p>
          <p className={styles.error}>Error: {employeeError}</p>
        </div>
      </div>
    </div>
  ) : (
    <>
      <div className={styles.tableContainer}>
        <div className={styles.welcomeMessage}>
          <Typography variant="h1">Lista de Empleados</Typography>
        </div>
        <div className={styles.searchInputContainer}>
          <div className={styles.iconContainer}>
            <SearchIcon />
          </div>
          <input className={styles.searchInput} placeholder="Búsqueda por palabra clave" />
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
      <div></div>
    </>
  );
};

export default Employees;
