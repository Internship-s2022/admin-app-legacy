import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';

import EmptyDataHandler from 'src/components/shared/common/emptyDataHandler';
import { Table } from 'src/components/shared/ui';
import { Variant } from 'src/components/shared/ui/buttons/button/types';
import SearchBar from 'src/components/shared/ui/searchbar';
import { TableButton } from 'src/components/shared/ui/table/types';
import { getEmployees } from 'src/redux/employee/thunk';
import { RootState, useAppDispatch, useAppSelector } from 'src/redux/store';
import { AppDispatch, Resources } from 'src/types';
import { formattedTableData } from 'src/utils/formatters';

import { employeeArray, header } from './constants';
import styles from './employee.module.css';
import { MappedEmployeeData, Projects, SearchEmployeeData } from './types';

const Employees = () => {
  const dispatch: AppDispatch<null> = useAppDispatch();
  const navigate = useNavigate();
  const listEmployee = useAppSelector((state: RootState) =>
    state.employee?.list.map((employee) => ({
      _id: employee?._id,
      name: `${employee?.user?.firstName} ${employee?.user?.lastName}`,
      projects: formattedTableData<Projects>(employee?.projectHistory, 'project', 'projectName'),
      email: employee?.user?.email,
      active: employee?.user?.isActive.toString(),
      careerPlan: employee?.careerPlan,
      notes: employee?.notes,
      skills: employee?.skills?.join('-'),
      potentialRole: employee?.potentialRole?.join('-'),
    })),
  );

  const employeeError = useAppSelector((state: RootState) => state.employee?.error);
  const [filteredList, setFilteredList] = useState(listEmployee);

  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  const buttonsArray: TableButton<MappedEmployeeData>[] = [
    {
      active: true,
      label: 'editar',
      testId: 'editButton',
      variant: Variant.CONTAINED,
      onClick: (row) => navigate(`/admin/employees/edit/${row._id}`),
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
        <div className={styles.searchInput}>
          <SearchBar<SearchEmployeeData>
            setFilteredList={setFilteredList}
            details={listEmployee}
            mainArray={employeeArray}
          />
        </div>
        {filteredList.length ? (
          <Table<MappedEmployeeData>
            showButtons
            testId={'userTable'}
            headers={header}
            value={filteredList}
            profileIcon={true}
            buttons={buttonsArray}
          />
        ) : (
          <>
            <div>No encontró nada</div>
          </>
        )}
      </div>
      <div></div>
    </>
  );
};

export default Employees;
