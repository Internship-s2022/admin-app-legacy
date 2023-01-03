import { format } from 'date-fns';
import esLocale from 'date-fns/locale/es';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import EmptyDataHandler from 'src/components/shared/common/emptyDataHandler';
import { Button } from 'src/components/shared/ui';
import { Variant } from 'src/components/shared/ui/buttons/button/types';
import Card from 'src/components/shared/ui/card';
import { getNotifications } from 'src/redux/notifications/thunk';
import { RootState } from 'src/redux/store';
import { AppDispatch, Resources } from 'src/types';
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

const selectName = (item) => {
  switch (item.resource) {
    case 'PROJECT':
      return { name: item.projectName, id: item.projectId };
    case 'CLIENT':
      return { name: item.clientName, id: item.clientId };
    case 'EMPLOYEE':
      return { name: item.employeeName, id: item.employeeId };
    default:
      return {
        name: item.projectName || item.clientName || item.employeeName,
        id: item.projectId || item.clientId || item.employeeId,
      };
  }
};

const Home = () => {
  const dispatch: AppDispatch<null> = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.authUser);
  const notifications = useSelector((state: RootState) => state.notification.list);
  const notificationError = useSelector((state: RootState) => state.notification.error);
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

  const indexNameUser = user.name.indexOf(' ');

  const firstNameUser = user.name.substring(0, indexNameUser);

  const listNotifications = useMemo(() => {
    const mappedNotifications = notifications.reduce((acc, item) => {
      if (item.isActive) {
        acc.push({
          id: item?._id,
          resource: item.notificationType,
          projectId: item.project?._id,
          projectName: item.project?.projectName || '',
          projectCriticality: item.project?.isCritic || '',
          members: item.project?.members || [],
          employeeName: item.employee?.user?.firstName + ' ' + item.employee?.user?.lastName || '',
          employeeId: item.employee?._id,
          clientName: item.client?.name || '',
          clientId: item.client?._id,
          date: item.date,
          customMessage: item.customMessage || '',
          notification: item.reasonType || '',
          isCustom: item.isCustom,
          active: item.isActive,
        });
      }
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

  const handleNavigation = (path) => {
    navigate(path);
  };

  const showErrorMessage = notificationError?.networkError || !listNotifications.length;

  return (
    <>
      <div className={styles.containerPage}>
        <section className={styles.container}>
          <div className={styles.welcomeMessageContainer}>
            {user.name.length ? (
              <p className={styles.welcomeMessage}>¡Bienvenido {firstNameUser}!</p>
            ) : (
              ''
            )}
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
      </div>
      {showErrorMessage ? (
        <EmptyDataHandler
          resource={Resources.Notificaciones}
          handleReload={() => handleNavigation(0)}
          error={notificationError}
        />
      ) : (
        <div className={styles.containerPage}>
          <div className={styles.cardContainer}>
            {dataList?.map((item) => {
              return (
                <>
                  <Card
                    id={item.id}
                    key={item.id}
                    resourceId={selectName(item).id}
                    name={selectName(item).name}
                    resource={item.resource}
                    criticality={item.projectCriticality}
                    members={item.members}
                    customMessage={item.customMessage}
                    isCustom={item.isCustom}
                    notification={item.notification}
                    date={item.date}
                  />
                </>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
