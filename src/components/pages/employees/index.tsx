import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';

import EmptyDataHandler from 'src/components/shared/common/emptyDataHandler/emptyDataHandler';
import { Table } from 'src/components/shared/ui';
import { Variant } from 'src/components/shared/ui/buttons/button/types';
import SearchIcon from 'src/components/shared/ui/icons/searchIcon/searchIcon';
import { TableButton } from 'src/components/shared/ui/table/types';
import { getEmployees } from 'src/redux/employee/thunk';
import { RootState, useAppDispatch, useAppSelector } from 'src/redux/store';
import { AppDispatch } from 'src/types';
import { formattedTableData } from 'src/utils/formatters';

import { header } from './constants';
import styles from './employee.module.css';
import { MappedEmployeeData, Projects } from './types';

const Employees = () => {
  const dispatch: AppDispatch<null> = useAppDispatch();
  const navigate = useNavigate();

  const listEmployee = useAppSelector((state: RootState) => state.employee?.list);
  const employeeError = useAppSelector((state: RootState) => state.employee?.error);
  console.log(listEmployee);

  const matchedEmployee = listEmployee.map((employee) => ({
    id: employee?._id,
    name: `${employee?.user?.firstName} ${employee?.user?.lastName}`,
    projects: formattedTableData<Projects>(employee?.projectHistory, 'project', 'projectName'),
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
      onClick: (row) => navigate(`/admin/employees/edit/${row.id}`),
    },
  ];

  return employeeError || !listEmployee.length ? (
    <EmptyDataHandler
      isEmployee={true}
      resource="Empleados"
      handleReload={() => navigate('admin/employees')}
    />
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
