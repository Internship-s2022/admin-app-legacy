import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';

import EmptyDataHandler from 'src/components/shared/common/emptyDataHandler';
import { Button, Modal, Table } from 'src/components/shared/ui';
import { Variant } from 'src/components/shared/ui/buttons/button/types';
import DeleteConfirmation from 'src/components/shared/ui/deleteConfirmation';
import SearchBar from 'src/components/shared/ui/searchbar';
import { UiRoutes } from 'src/constants';
import { deleteClient, getClients } from 'src/redux/client/thunks';
import { RootState } from 'src/redux/store';
import { closeModal, openModal } from 'src/redux/ui/actions';
import { AppDispatch, Resources } from 'src/types';
import { formattedTableData } from 'src/utils/formatters';

import styles from './clients.module.css';
import { clientFilterOptions, header } from './constants';
import { ClientsData, SearchClientData } from './types';

const Clients = () => {
  const [row, setRow] = React.useState({} as ClientsData);
  const showModal = useSelector((state: RootState) => state.ui.showModal);
  const dispatch: AppDispatch<null> = useDispatch();
  const activeClients = useSelector((state: RootState) =>
    state.client?.list.filter((item) => item.isActive),
  );
  const clientError = useSelector((state: RootState) => state.client?.error);
  const navigate = useNavigate();

  const listClientsData = activeClients.map((item) => {
    return {
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
    };
  });

  const handleDelete = async (id) => {
    await dispatch(deleteClient(id));
    dispatch(closeModal());
  };
  const [filteredList, setFilteredList] = useState(listClientsData);

  const buttonsArray = [
    {
      active: true,
      label: 'Editar',
      testId: 'editButton',
      variant: Variant.CONTAINED,
      onClick: (data) => {
        console.log(data);
      },
    },
    {
      active: true,
      label: 'X',
      testId: 'deleteButton',
      variant: Variant.CONTAINED,
      onClick: (data) => {
        dispatch(openModal());
        setRow(data);
      },
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  useEffect(() => {
    dispatch(getClients());
  }, []);

  const showErrorMessage = clientError?.networkError || !listClientsData.length;

  return showErrorMessage ? (
    <EmptyDataHandler
      resource={Resources.Clientes}
      handleReload={() => handleNavigation(`${UiRoutes.ADMIN}${UiRoutes.CLIENTS}`)}
      handleAdd={() => handleNavigation(`${UiRoutes.ADMIN}${UiRoutes.ADD_CLIENTS}`)}
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
            setFilteredList={setFilteredList}
            details={listClientsData}
            mainArray={clientFilterOptions}
          />
        </div>
        <div className={styles.addUserButton}>
          <Button
            materialVariant={Variant.CONTAINED}
            onClick={() => handleNavigation(`${UiRoutes.ADMIN}${UiRoutes.ADD_CLIENTS}`)}
            label={'+ Agregar cliente'}
            testId={'addClientButton'}
            styles={'addButton'}
          />
        </div>
      </div>
      <div className={styles.tableContainer}>
        {filteredList.length ? (
          <Table<ClientsData>
            showButtons
            testId={'clientsTable'}
            headers={header}
            value={filteredList}
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
                  src={`${process.env.PUBLIC_URL}/assets/images/searchNotFound`}
                  alt="Not found"
                ></img>
              </div>
            </div>
          </>
        )}
      </div>
      <Modal
        testId="deleteModal"
        styles={styles.modal}
        isOpen={showModal}
        onClose={() => dispatch(closeModal())}
      >
        <DeleteConfirmation
          resource={Resources.Clientes}
          id={row._id}
          name={row.name}
          handleDelete={handleDelete}
          onClose={() => dispatch(closeModal())}
        />
      </Modal>
    </div>
  );
};

export default Clients;
