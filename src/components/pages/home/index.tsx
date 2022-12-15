import { format } from 'date-fns';
import esLocale from 'date-fns/locale/es';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from 'src/components/shared/ui';
import { Variant } from 'src/components/shared/ui/buttons/button/types';
import Card from 'src/components/shared/ui/card';
import { getNotifications } from 'src/redux/notifications/thunk';
import { RootState } from 'src/redux/store';
import { AppDispatch } from 'src/types';
import { capitalizeFirstLetter } from 'src/utils/formatters';

import { entities, notificationsFilterOptions } from './constants';
import styles from './home.module.css';

const filterData = (list, filters) => {
  let filterDataList;

  if (filters.newest) {
    filterDataList = list.sort((a, b) => {
      return Date.parse(b.date) - Date.parse(a.date);
    });
  } else {
    filterDataList = list.sort((a, b) => {
      return Date.parse(a.date) - Date.parse(b.date);
    });
  }

  filterDataList = filterDataList.filter((item) => item.resource.includes(filters.role));

  if (filters.search) {
    filterDataList = filterDataList?.filter((d) =>
      notificationsFilterOptions.some((field) =>
        d[field]?.toLowerCase().includes(filters.search?.toLowerCase()),
      ),
    );
  }

  return filterDataList;
};

const Home = () => {
  const dispatch: AppDispatch<null> = useDispatch();
  const user = useSelector((state: RootState) => state.auth.authUser);
  const notifications = useSelector((state: RootState) => state.notification.list);
  console.log({ notifications });
  const today = capitalizeFirstLetter(
    format(new Date(Date.now()), 'eeee, d LLL', { locale: esLocale }),
  );
  const [filters, setFilters] = React.useState({
    newest: true,
    role: '',
    search: '',
  });
  const [checked, setChecked] = React.useState(false);
  const [dataList, setDataList] = React.useState([]);

  const listNotifications = useMemo(() => {
    const mappedNotifications = notifications.reduce((acc, item) => {
      acc.push({
        id: item?._id,
        resource: item.notificationType,
        projectId: item.project?._id,
        projectName: item.project?.projectName || '',
        projectCriticality: item.project?.isCritic || '',
        members: item.project?.members || [],
        employeeName: item.employee?.user?.firstName + ' ' + item.employee?.user?.lastName || '',
        employeeId: item.employee?._id,
        clientName: item.client?.clientContact?.name || '',
        clientId: item.client?._id,
        date: item.date,
        customMessage: item.customMessage || '',
        notification: item.reasonType || '',
        isCustom: item.isCustom,
        active: item.isActive,
      });
      return acc;
    }, []);
    const filteredData = filterData(mappedNotifications, filters);
    return filteredData;
  }, [notifications, filters.newest, filters.role, filters.search]);

  useEffect(() => {
    dispatch(getNotifications());
  }, []);

  useEffect(() => {
    setDataList(listNotifications);
  }, [notifications, filters.newest, filters.role, filters.search]);

  return (
    <>
      <section className={styles.container}>
        <div className={styles.welcomeMessage}>
          {user.name.length ? <p className={styles.welcomeMessage}>Bienvenido {user.name}</p> : ''}
          <div className={styles.filterContainer}>
            <div className={styles.checkboxInput}>
              <div className={styles.filterButtons}>
                {checked ? (
                  <Button
                    materialVariant={Variant.CONTAINED}
                    onClick={() => {
                      setFilters({ ...filters, newest: !filters.newest });
                      setChecked(!checked);
                    }}
                    label={'Menos recientes'}
                    testId={'oldest-button'}
                    color={'warning'}
                  />
                ) : (
                  <Button
                    materialVariant={Variant.TEXT}
                    onClick={() => {
                      setFilters({ ...filters, newest: !filters.newest });
                      setChecked(!checked);
                    }}
                    label={'Más recientes'}
                    testId={'newest-button'}
                  />
                )}
              </div>
              <select
                className={styles.filterDropdown}
                onChange={(e) => {
                  setFilters({ ...filters, role: e.target.value });
                }}
              >
                <option
                  value={''}
                  disabled
                  selected={filters.role === ''}
                  className={styles.option}
                >
                  {'Entidad'}
                </option>
                {entities?.map((item) => (
                  <option key={item.value} value={item.value} className={styles.option}>
                    {item.label}
                  </option>
                ))}
              </select>
              <div className={styles.filterButtons}>
                <Button
                  materialVariant={Variant.TEXT}
                  onClick={() => {
                    setFilters({ newest: true, role: '', search: '' });
                    setChecked(false);
                  }}
                  label={'Resetear filtros'}
                  testId={'reset-filters'}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.todayDate}>{today.toString()}</div>
      </section>
      <div className={styles.cardContainer}>
        {dataList?.map((item) => {
          switch (item.resource) {
            case 'PROJECT':
              return (
                <Card
                  key={item.id}
                  id={item.projectId}
                  name={item.projectName}
                  resource={item.resource}
                  criticality={item.projectCriticality}
                  members={item.members}
                  customMessage={item.customMessage}
                  isCustom={item.isCustom}
                />
              );
            case 'EMPLOYEE':
              return (
                <Card
                  id={item.employeeId}
                  key={item.id}
                  name={item.employeeName}
                  resource={item.resource}
                  customMessage={item.customMessage}
                  isCustom={item.isCustom}
                />
              );
            case 'CLIENT':
              return (
                <Card
                  id={item.clientId}
                  key={item.id}
                  name={item.clientName}
                  resource={item.resource}
                  customMessage={item.customMessage}
                  isCustom={item.isCustom}
                />
              );
            default:
              return (
                <Card
                  id={item.id}
                  key={item.id}
                  name={item.clientName || item.projectName || item.employeeName}
                  resource={item.notificationType}
                  notification={item.notification}
                />
              );
              break;
          }
        })}
      </div>
    </>
  );
};

export default Home;
