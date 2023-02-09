import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';

import EmptyDataHandler from 'src/components/shared/common/emptyDataHandler';
import { Button, SuccessErrorMessage, Table } from 'src/components/shared/ui';
import { Variant } from 'src/components/shared/ui/buttons/button/types';
import EditIcon from 'src/components/shared/ui/icons/tableIcons/editIcon';
import SearchBar from 'src/components/shared/ui/searchbar';
import { UiRoutes } from 'src/constants';
import { clearSelectedClient } from 'src/redux/client/actions';
import { getClients } from 'src/redux/client/thunks';
import { RootState, useAppDispatch, useAppSelector } from 'src/redux/store';
import { ErrorType } from 'src/redux/types';
import { closeMessageAlert } from 'src/redux/ui/actions';
import { AppDispatch, Resources } from 'src/types';
import { formattedTableData } from 'src/utils/formatters';

import styles from './clients.module.css';
import { clientFilterOptions, header } from './constants';
import { ClientsData, SearchClientData } from './types';

const filterData = (list, filters) => {
  let filterDataList;

  filterDataList = list.filter((item) => item.active === filters.isActive);

  if (filters.search) {
    filterDataList = filterDataList?.filter((d) =>
      clientFilterOptions.some((field) =>
        d[field]?.toLowerCase().includes(filters.search?.toLowerCase()),
      ),
    );
  }

  return filterDataList;
};

const Clients = () => {
  const dispatch: AppDispatch<null> = useAppDispatch();
  const navigate = useNavigate();

  const clientsList = useAppSelector((state: RootState) => state.client?.list);
  const clientError = useAppSelector((state: RootState) => state.client?.error);
  const showAlert = useAppSelector((state: RootState) => state.ui.showSuccessErrorAlert);
  const snackbarOperation = useAppSelector((state: RootState) => state.ui.snackbarOperation);

  const [dataList, setDataList] = useState([]);
  const [filters, setFilters] = React.useState({
    isActive: true,
    search: '',
  });

  const activeClientsList = useMemo(() => {
    const mappedClients = clientsList.reduce((acc, item) => {
      acc.push({
        _id: item?._id,
        name: item?.name,
        projects: formattedTableData(item.projects, 'projectName'),
        clientContact: item?.clientContact?.name,
        email: item?.clientContact?.email,
        localContact: item?.localContact?.name,
        localEmail: item?.localContact?.name,
        relationshipEnd: item?.relationshipEnd?.toString(),
        relationshipStart: item?.relationshipStart?.toString(),
        notes: item?.notes,
        active: item?.isActive,
      });
      return acc;
    }, []);
    const filteredData = filterData(mappedClients, filters);
    return filteredData;
  }, [clientsList, filters.isActive, filters.search]);

  useEffect(() => {
    dispatch(getClients());
    dispatch(clearSelectedClient());
    return () => {
      dispatch(closeMessageAlert());
    };
  }, []);

  useEffect(() => {
    setDataList(activeClientsList);
  }, [clientsList, filters.isActive, filters.search]);

  const handleEdit = (row) => {
    navigate(`${UiRoutes.ADMIN}${UiRoutes.CLIENTS_FORM}/${row._id}`);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const buttonsArray = filters.isActive && [
    {
      active: true,
      testId: 'edit-button',
      variant: Variant.CONTAINED,
      onClick: (row) => {
        return handleEdit(row);
      },
      icon: <EditIcon />,
    },
  ];

  const showErrorMessage =
    clientError?.errorType === ErrorType.NETWORK_ERROR || !clientsList.length;

  return showErrorMessage ? (
    <EmptyDataHandler
      resource={Resources.Clientes}
      handleReload={() => handleNavigation(0)}
      handleAdd={() => handleNavigation(`${UiRoutes.ADMIN}${UiRoutes.CLIENTS_FORM}`)}
      error={clientError}
    />
  ) : (
    <div className={styles.tableContainer}>
      <div className={styles.welcomeMessage}>
        <Typography variant="h1">Clientes</Typography>
      </div>
      <div className={styles.inputsContainer}>
        <div className={styles.searchBar}>
          <SearchBar<SearchClientData>
            setFilter={(stringValue) => setFilters({ ...filters, search: stringValue })}
          />
        </div>
        <div className={styles.addClientButton}>
          <Button
            materialVariant={Variant.CONTAINED}
            onClick={() => {
              navigate(`${UiRoutes.ADMIN}${UiRoutes.CLIENTS_FORM}`);
            }}
            label={'+ Agregar cliente'}
            testId={'add-client-button'}
            styles={'addButton'}
          />
        </div>
      </div>
      <div className={styles.tableContainer}>
        {dataList?.length ? (
          <Table<ClientsData>
            showButtons
            testId={'client-table'}
            headers={header}
            value={dataList}
            setDataList={setDataList}
            buttons={buttonsArray}
            isActive={filters.isActive}
          />
        ) : (
          <>
            <div className={styles.notFound}>
              <div className={styles.notFoundTitle}>
                No se han encontrado resultados que coincidan con tu búsqueda
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
      <SuccessErrorMessage
        open={showAlert}
        error={clientError}
        resource={Resources.Clientes}
        operation={snackbarOperation}
      />
    </div>
  );
};

export default Clients;
