import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';

import EmptyDataHandler from 'src/components/shared/common/emptyDataHandler';
import {
  Button,
  ConfirmationMessage,
  Modal,
  SuccessErrorMessage,
  Table,
} from 'src/components/shared/ui';
import { Variant } from 'src/components/shared/ui/buttons/button/types';
import SearchBar from 'src/components/shared/ui/searchbar';
import { UiRoutes } from 'src/constants';
import { deleteClient, getClients } from 'src/redux/client/thunks';
import { RootState } from 'src/redux/store';
import {
  closeConfirmationModal,
  closeMessageAlert,
  closeModal,
  openConfirmationModal,
} from 'src/redux/ui/actions';
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
  const [row, setRow] = React.useState({} as ClientsData);
  const showConfirmModal = useSelector((state: RootState) => state.ui.showConfirmModal);
  const dispatch: AppDispatch<null> = useDispatch();

  const clientsList = useSelector((state: RootState) => state.client?.list);
  const clientError = useSelector((state: RootState) => state.client?.error);
  const showAlert = useSelector((state: RootState) => state.ui.showSuccessErrorAlert);

  const navigate = useNavigate();

  const [dataList, setDataList] = useState([]);
  const [filters, setFilters] = React.useState({
    isActive: true,
    search: '',
  });
  const [checked, setChecked] = React.useState(false);

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
    setDataList(activeClientsList);
  }, [clientsList, filters.isActive, filters.search]);

  useEffect(() => {
    dispatch(getClients());
    return () => {
      dispatch(closeMessageAlert());
    };
  }, []);

  const handleDelete = async (id) => {
    await dispatch(deleteClient(id));
    dispatch(closeConfirmationModal());
    dispatch(closeModal());
  };

  const handleEdit = (row) => {
    navigate(`${UiRoutes.ADMIN}${UiRoutes.CLIENTS_FORM}/${row._id}`);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleDataList = (data) => {
    setDataList(data);
  };

  const buttonsArray = [
    {
      active: true,
      label: 'EDITAR',
      testId: 'editButton',
      variant: Variant.CONTAINED,
      onClick: (row) => {
        return handleEdit(row);
      },
    },
    {
      active: true,
      label: 'X',
      testId: 'deleteButton',
      variant: Variant.CONTAINED,
      onClick: (data) => {
        dispatch(openConfirmationModal());
        setRow(data);
      },
    },
  ];

  const showErrorMessage = clientError?.networkError || !clientsList.length;

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
            onClick={() => navigate(`${UiRoutes.ADMIN}${UiRoutes.CLIENTS_FORM}`)}
            label={'+ Agregar cliente'}
            testId={'addClientButton'}
            styles={'addButton'}
          />
        </div>
      </div>
      <div className={styles.checkboxInput}>
        <div className={styles.filterButtons}>
          {checked ? (
            <div className={styles.filterButtonsPressed}>
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
            </div>
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
      </div>
      <div className={styles.tableContainer}>
        {dataList?.length ? (
          <Table<ClientsData>
            showButtons
            testId={'clientsTable'}
            headers={header}
            value={dataList}
            setDataList={handleDataList}
            buttons={buttonsArray}
            isActive={filters.isActive}
          />
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
      <SuccessErrorMessage
        open={showAlert}
        error={clientError}
        resource={Resources.Clientes}
        operation={'borrado'}
      />
      <Modal
        testId="deleteModal"
        styles={styles.modal}
        isOpen={showConfirmModal}
        onClose={() => dispatch(closeConfirmationModal())}
      >
        <ConfirmationMessage
          description={`¿Desea eliminar al cliente ${row.name}?`}
          title={'Eliminar Cliente'}
          handleConfirm={() => handleDelete(row._id)}
          handleClose={() => dispatch(closeConfirmationModal())}
        />
      </Modal>
    </div>
  );
};

export default Clients;
