import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';

import EmptyDataHandler from 'src/components/shared/common/emptyDataHandler';
import { SuccessErrorMessage, Table } from 'src/components/shared/ui';
import { Variant } from 'src/components/shared/ui/buttons/button/types';
import SearchBar from 'src/components/shared/ui/searchbar';
import { TableButton } from 'src/components/shared/ui/table/types';
import { UiRoutes } from 'src/constants';
import { getEmployees } from 'src/redux/employee/thunk';
import { RootState, useAppDispatch, useAppSelector } from 'src/redux/store';
import { closeMessageAlert } from 'src/redux/ui/actions';
import { AppDispatch, Resources } from 'src/types';
import { formattedTableData } from 'src/utils/formatters';

import { employeeFilterOptions, header } from './constants';
import styles from './employee.module.css';
import { MappedEmployeeData, Projects, SearchEmployeeData } from './types';

const Employees = () => {
  const dispatch: AppDispatch<null> = useAppDispatch();
  const navigate = useNavigate();
  const employeeError = useAppSelector((state: RootState) => state.employee.error);

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

  const [dataList, setDataList] = useState(listEmployee);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleDataList = (data) => {
    setDataList(data);
  };
  const showAlert = useAppSelector((state: RootState) => state.ui.showSuccessErrorAlert);

  const showErrorMessage = employeeError?.networkError || !listEmployee.length;

  useEffect(() => {
    dispatch(getEmployees());
    return () => {
      dispatch(closeMessageAlert());
    };
  }, []);

  const buttonsArray: TableButton<MappedEmployeeData>[] = [
    {
      active: true,
      label: 'editar',
      testId: 'editButton',
      variant: Variant.CONTAINED,
      onClick: (row) => navigate(`${UiRoutes.ADMIN}${UiRoutes.EDIT_EMPLOYEES}/${row._id}`),
    },
  ];

  return showErrorMessage ? (
    <EmptyDataHandler
      resource={Resources.Empleados}
      handleReload={() => handleNavigation(0)}
      error={employeeError}
    />
  ) : (
    <>
      <div className={styles.tableContainer}>
        <div className={styles.welcomeMessage}>
          <Typography variant="h1">Lista de Empleados</Typography>
        </div>
        <div className={styles.searchInput}>
          <SearchBar<SearchEmployeeData>
            setFilteredList={handleDataList}
            details={listEmployee}
            mainArray={employeeFilterOptions}
          />
        </div>
        {dataList.length ? (
          <>
            <Table<MappedEmployeeData>
              showButtons
              testId={'userTable'}
              headers={header}
              value={dataList}
              setDataList={handleDataList}
              profileIcon={true}
              buttons={buttonsArray}
            />
            <SuccessErrorMessage
              open={showAlert}
              error={employeeError}
              resource={Resources.Empleados}
              operation={'editado'}
            />
          </>
        ) : (
          <>
            <div className={styles.notFound}>
              <div className={styles.notFoundTitle}>
                No han encontrado resultados que coincidan con tu búsqueda
              </div>
              <div>
                <img
                  src={`${process.env.PUBLIC_URL}/assets/images/searchNotFound.png`}
                  alt="Not found"
                ></img>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Employees;
