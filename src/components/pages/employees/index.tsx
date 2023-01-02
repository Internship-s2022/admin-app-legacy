import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';

import EmptyDataHandler from 'src/components/shared/common/emptyDataHandler';
import { Button, SuccessErrorMessage, Table } from 'src/components/shared/ui';
import { Variant } from 'src/components/shared/ui/buttons/button/types';
import EditIcon from 'src/components/shared/ui/icons/tableIcons/editIcon';
import SearchBar from 'src/components/shared/ui/searchbar';
import { TableButton } from 'src/components/shared/ui/table/types';
import { UiRoutes } from 'src/constants';
import { setSelectedEmployee } from 'src/redux/employee/actions';
import { getEmployees } from 'src/redux/employee/thunk';
import { RootState, useAppDispatch, useAppSelector } from 'src/redux/store';
import { closeMessageAlert, setSnackbarOperation } from 'src/redux/ui/actions';
import { AppDispatch, Resources } from 'src/types';
import { formattedTableData } from 'src/utils/formatters';

import { employeeFilterOptions, header } from './constants';
import styles from './employee.module.css';
import { checkboxData, seniority } from './employeeForm/constants';
import { MappedEmployeeData, Projects, SearchEmployeeData } from './types';

const filterData = (list, filters) => {
  let filterDataList;

  filterDataList = list.filter((item) => item.active === filters.isActive);

  filterDataList = filterDataList.filter((item) => item.potentialRole.includes(filters.role));

  filterDataList =
    filters.seniority === ''
      ? filterDataList
      : filterDataList.filter((item) => filters.seniority === item.seniority);

  filterDataList =
    filters.availability === ''
      ? filterDataList
      : filterDataList.filter((item) => filters.availability === item.availability);

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
  const snackbarOperation = useAppSelector((state: RootState) => state.ui.snackbarOperation);
  const employeeList = useAppSelector((state: RootState) => state.employee?.list);
  const [checked, setChecked] = React.useState(false);
  const [filters, setFilters] = React.useState({
    isActive: true,
    role: '',
    search: '',
    seniority: '',
    availability: '',
  });

  const listEmployee = useMemo(() => {
    const mappedEmployees = employeeList.reduce((acc, item) => {
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
  }, [employeeList, filters.role, filters.search, filters.seniority, filters.availability]);

  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  useEffect(() => {
    setDataList(listEmployee);
  }, [employeeList, filters.role, filters.search, filters.seniority, filters.availability]);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleDataList = (data) => {
    setDataList(data);
  };

  const showErrorMessage = employeeError?.networkError || !employeeList.length;

  useEffect(() => {
    dispatch(getEmployees());
    return () => {
      dispatch(closeMessageAlert());
    };
  }, []);

  const buttonsArray: TableButton<MappedEmployeeData>[] = [
    {
      active: true,
      testId: 'editButton',
      variant: Variant.CONTAINED,
      onClick: (row) => {
        const selectedEmployee = employeeList.find((employee) => employee._id === row._id);
        dispatch(setSnackbarOperation('editado'));
        dispatch(setSelectedEmployee(selectedEmployee));
        navigate(`${UiRoutes.ADMIN}${UiRoutes.EDIT_EMPLOYEES}/${row._id}`);
      },
      icon: <EditIcon />,
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
          <Typography variant="h1">Empleados</Typography>
        </div>
        <div className={styles.searchInput}>
          <SearchBar<SearchEmployeeData>
            setFilter={(stringValue) => setFilters({ ...filters, search: stringValue })}
            filter={filters.search}
          />
        </div>
        <div className={styles.checkboxInput}>
          <select
            className={styles.filterDropdown}
            onChange={(e) => {
              setFilters({ ...filters, role: e.target.value });
            }}
          >
            <option value={''} disabled selected={filters.role === ''} className={styles.option}>
              {'Rol'}
            </option>
            {checkboxData?.map((item) => (
              <option key={item.value} value={item.value} className={styles.option}>
                {item.label}
              </option>
            ))}
          </select>
          <select
            className={styles.filterDropdown}
            onChange={(e) => {
              setFilters({ ...filters, seniority: e.target.value });
            }}
          >
            <option
              value={''}
              disabled
              selected={filters.seniority === ''}
              className={styles.option}
            >
              {'Seniority'}
            </option>
            {seniority?.map((item) => (
              <option key={item.value} value={item.value} className={styles.option}>
                {item.label}
              </option>
            ))}
          </select>
          <div className={styles.filterButtons}>
            {checked ? (
              <div className={styles.filterButtonsPressed}>
                <Button
                  materialVariant={Variant.CONTAINED}
                  onClick={() => {
                    setFilters({ ...filters, availability: '' });
                    setChecked(!checked);
                  }}
                  label={'Disponibles'}
                  testId={'disponibility-button'}
                  color={'warning'}
                />
              </div>
            ) : (
              <Button
                materialVariant={Variant.TEXT}
                onClick={() => {
                  setFilters({ ...filters, availability: 'Disponible' });
                  setChecked(!checked);
                }}
                label={'Disponibles'}
                testId={'disponibility-button'}
              />
            )}
          </div>
          <div className={styles.filterButtons}>
            <Button
              materialVariant={Variant.TEXT}
              onClick={() => {
                setFilters({
                  ...filters,
                  role: '',
                  search: '',
                  seniority: '',
                  availability: '',
                });
                setChecked(!checked);
              }}
              label={'Resetear filtros'}
              testId={'reset-filter'}
            />
          </div>
        </div>
        {dataList?.length ? (
          <div className={styles.tableContainer}>
            <Table<MappedEmployeeData>
              showButtons
              testId={'employee-table'}
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
              operation={snackbarOperation}
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
