import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';

import EmptyDataHandler from 'src/components/shared/common/emptyDataHandler';
import { Button, SuccessErrorMessage, Table } from 'src/components/shared/ui';
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
import { checkboxData } from './employeeForm/constants';
import { MappedEmployeeData, Projects, SearchEmployeeData } from './types';

const filterData = (list, filters) => {
  let filterDataList;

  filterDataList = list.filter((item) => item.active === filters.isActive);

  filterDataList = filterDataList.filter((item) => item.potentialRole.includes(filters.role));

  if (filters.search) {
    filterDataList = filterDataList?.filter((d) =>
      employeeFilterOptions.some((field) =>
        d[field]?.toLowerCase().includes(filters.search?.toLowerCase()),
      ),
    );
  }

  return filterDataList;
};

const Employees = () => {
  const dispatch: AppDispatch<null> = useAppDispatch();
  const navigate = useNavigate();
  const employeeError = useAppSelector((state: RootState) => state.employee.error);
  const showAlert = useAppSelector((state: RootState) => state.ui.showSuccessErrorAlert);
  const [dataList, setDataList] = useState([]);

  const employee = useAppSelector((state: RootState) => state.employee?.list);
  const [filters, setFilters] = React.useState({
    isActive: true,
    role: '',
    search: '',
  });
  const [checked, setChecked] = React.useState(false);

  const listEmployee = useMemo(() => {
    const mappedEmployees = employee.reduce((acc, item) => {
      acc.push({
        _id: item?._id,
        name: `${item?.user?.firstName} ${item?.user?.lastName}`,
        projects: formattedTableData<Projects>(item?.projectHistory, 'project', 'projectName'),
        email: item?.user?.email,
        active: item?.user?.isActive,
        careerPlan: item?.careerPlan,
        notes: item?.notes,
        skills: item?.skills?.join('-'),
        potentialRole: item?.potentialRole?.join('-'),
        seniority: item?.seniority || '-',
        availability: item?.availability ? 'Disponible' : 'No disponible',
      });
      return acc;
    }, []);
    const filteredData = filterData(mappedEmployees, filters);
    return filteredData;
  }, [employee, filters.isActive, filters.role, filters.search]);

  console.log('listEmployee', listEmployee);
  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  useEffect(() => {
    setDataList(listEmployee);
  }, [employee, filters.isActive, filters.role, filters.search]);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleDataList = (data) => {
    setDataList(data);
  };

  const showErrorMessage = employeeError?.networkError || !employee.length;

  useEffect(() => {
    dispatch(getEmployees());
    return () => {
      dispatch(closeMessageAlert());
    };
  }, []);

  const buttonsArray: TableButton<MappedEmployeeData>[] = [
    {
      active: true,
      label: 'EDITAR',
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
      isEmployee
    />
  ) : (
    <>
      <div className={styles.tableContainer}>
        <div className={styles.welcomeMessage}>
          <Typography variant="h1">Lista de Empleados</Typography>
        </div>
        <div className={styles.searchInput}>
          <SearchBar<SearchEmployeeData>
            setFilter={(stringValue) => setFilters({ ...filters, search: stringValue })}
            filter={filters.search}
          />
        </div>
        <div className={styles.checkboxInput}>
          <div className={styles.filterButtons}>
            {checked ? (
              <Button
                materialVariant={Variant.CONTAINED}
                onClick={() => {
                  setFilters({ ...filters, isActive: !filters.isActive });
                  setChecked(!checked);
                }}
                label={'Inactivos'}
                testId={'inactiveButtons'}
                color={'warning'}
              />
            ) : (
              <Button
                materialVariant={Variant.TEXT}
                onClick={() => {
                  setFilters({ ...filters, isActive: !filters.isActive });
                  setChecked(!checked);
                }}
                label={'Inactivos'}
                testId={'inactiveButtons'}
              />
            )}
          </div>
          <select
            className={styles.filterDropdown}
            onChange={(e) => {
              setFilters({ ...filters, role: e.target.value });
            }}
          >
            <option value={''} disabled selected={filters.role === ''} className={styles.option}>
              {'Role'}
            </option>
            {checkboxData?.map((item) => (
              <option key={item.value} value={item.value} className={styles.option}>
                {item.label}
              </option>
            ))}
          </select>
          <div className={styles.filterButtons}>
            <Button
              materialVariant={Variant.TEXT}
              onClick={() => {
                setFilters({ isActive: true, role: '', search: '' });
                setChecked(false);
              }}
              label={'Resetear filtros'}
              testId={'resetFilter'}
            />
          </div>
        </div>
        {dataList?.length ? (
          <div className={styles.tableContainer}>
            <Table<MappedEmployeeData>
              showButtons
              testId={'userTable'}
              headers={header}
              value={dataList}
              setDataList={handleDataList}
              profileIcon={true}
              buttons={buttonsArray}
              isActive={filters.isActive}
            />
            <SuccessErrorMessage
              open={showAlert}
              error={employeeError}
              resource={Resources.Empleados}
              operation={'editado'}
            />
          </div>
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
