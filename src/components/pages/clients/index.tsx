import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';

import EmptyDataHandler from 'src/components/shared/common/emptyDataHandler';
import { Button, Modal, Table } from 'src/components/shared/ui';
import { Variant } from 'src/components/shared/ui/buttons/button/types';
import DeleteConfirmation from 'src/components/shared/ui/deleteConfirmation';
import SearchIcon from 'src/components/shared/ui/icons/searchIcon';
import SearchBar from 'src/components/shared/ui/searchbar';
import { deleteClient, getClients } from 'src/redux/client/thunks';
import { RootState } from 'src/redux/store';
import { closeModal, openModal } from 'src/redux/ui/actions';
import { AppDispatch, Resources } from 'src/types';
import { formattedTableData } from 'src/utils/formatters';

import styles from './clients.module.css';
import { clientArray, header } from './constants';
import { ClientsData } from './types';

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
      id: item?._id,
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
      handleReload={() => handleNavigation('/admin/clients')}
      handleAdd={() => handleNavigation('/admin/clients/add')}
      error={clientError}
    />
  ) : (
    <div className={styles.container}>
      <div className={styles.welcomeMessage}>
        <Typography variant="h1">Lista de Clientes</Typography>
      </div>
      <div className={styles.inputsContainer}>
        <div className={styles.searchBar}>
          <SearchBar
            setFilteredList={setFilteredList}
            details={listClientsData}
            mainArray={clientArray}
          />
        </div>
        <div className={styles.addUserButton}>
          <Button
            materialVariant={Variant.CONTAINED}
            onClick={() => handleNavigation('/admin/clients/add')}
            label={'+ Agregar cliente'}
            testId={'addClientButton'}
            styles={'addButton'}
          />
        </div>
      </div>
      <div className={styles.tableContainer}>
        {filteredList.length ? (
          <Table<ClientsData>
            showButtons={true}
            testId={'clientsTable'}
            headers={header}
            value={filteredList}
            buttons={buttonsArray}
          />
        ) : (
          <>
            <div>No encontró nada</div>
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
          id={row.id}
          name={row.name}
          handleDelete={handleDelete}
          onClose={() => dispatch(closeModal())}
        />
      </Modal>
    </div>
  );
};

export default Clients;
