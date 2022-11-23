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
  closeModal,
  openConfirmationModal,
  openModal,
  showMessageModal,
} from 'src/redux/ui/actions';
import { AppDispatch, Resources } from 'src/types';
import { formattedTableData } from 'src/utils/formatters';

import styles from './clients.module.css';
import { clientFilterOptions, header } from './constants';
import { ClientsData, SearchClientData } from './types';

const Clients = () => {
  const [row, setRow] = React.useState({} as ClientsData);
  const showConfirmModal = useSelector((state: RootState) => state.ui.showConfirmModal);
  const dispatch: AppDispatch<null> = useDispatch();

  const clientsList = useSelector((state: RootState) => state.client?.list);
  const clientError = useSelector((state: RootState) => state.client?.error);
  const navigate = useNavigate();

  const activeClientsList = useMemo(
    () =>
      clientsList.reduce((acc, item) => {
        if (item.isActive) {
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
            active: item?.isActive.toString(),
          });
        }
        return acc;
      }, []),
    [clientsList],
  );

  const [dataList, setDataList] = useState(activeClientsList);
  const messageModal = useSelector((state: RootState) => state.ui.showConfirmationModal);

  useEffect(() => setDataList(activeClientsList), [clientsList]);

  useEffect(() => {
    dispatch(getClients());
  }, []);

  const handleDelete = async (id) => {
    await dispatch(deleteClient(id));
    dispatch(closeConfirmationModal());
    dispatch(showMessageModal());
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
      label: 'Editar',
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

  const showErrorMessage = clientError?.networkError || !activeClientsList.length;

  return showErrorMessage ? (
    <EmptyDataHandler
      resource={Resources.Clientes}
      handleReload={() => handleNavigation(0)}
      handleAdd={() => handleNavigation(`${UiRoutes.ADMIN}${UiRoutes.CLIENTS_FORM}`)}
      error={clientError}
    />
  ) : (
    <div className={styles.container}>
      <div className={styles.welcomeMessage}>
        <Typography variant="h1">Lista de Clientes</Typography>
      </div>
      <div className={styles.inputsContainer}>
        <div className={styles.searchBar}>
          <SearchBar<SearchClientData>
            setFilteredList={handleDataList}
            details={activeClientsList}
            mainArray={clientFilterOptions}
          />
        </div>
        <div className={styles.addUserButton}>
          <Button
            materialVariant={Variant.CONTAINED}
            onClick={() => navigate(`${UiRoutes.ADMIN}${UiRoutes.CLIENTS_FORM}`)}
            label={'+ Agregar cliente'}
            testId={'addClientButton'}
            styles={'addButton'}
          />
        </div>
      </div>
      <div className={styles.tableContainer}>
        {dataList.length ? (
          <Table<ClientsData>
            showButtons
            testId={'clientsTable'}
            headers={header}
            value={dataList}
            setDataList={handleDataList}
            buttons={buttonsArray}
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
      <div>
        <SuccessErrorMessage
          open={messageModal}
          error={clientError}
          resource={Resources.Clientes}
          operation={'borrado'}
        />
      </div>
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
