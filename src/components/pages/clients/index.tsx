import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';

import { Button, Table } from 'src/components/shared/ui';
import { Variant } from 'src/components/shared/ui/buttons/button/types';
import SearchIcon from 'src/components/shared/ui/icons/searchIcon/searchIcon';
import { getClients } from 'src/redux/client/thunks';
import { RootState } from 'src/redux/store';
import { AppDispatch } from 'src/types';
import { formattedTableData } from 'src/utils/formatters';

import styles from './clients.module.css';
import { header } from './constants';
import { ClientsData } from './types';

const Clients = () => {
  const dispatch: AppDispatch<null> = useDispatch();
  const activeClients = useSelector((state: RootState) =>
    state.client?.list.filter((item) => item.isActive),
  );
  const clientError = useSelector((state: RootState) => state.client?.error);
  const navigate = useNavigate();

  const listClientsData = activeClients.map((item): ClientsData => {
    return {
      id: item._id,
      name: item.name,
      projects: formattedTableData(item.projects, 'projectName'),
      clientContact: item.clientContact?.name,
      email: item.clientContact?.email,
      localContact: item.localContact?.name,
    };
  });

  const buttonsArray = [
    {
      active: true,
      label: 'Editar',
      testId: 'editButton',
      variant: Variant.CONTAINED,
      onClick: () => {
        undefined;
      },
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  useEffect(() => {
    dispatch(getClients());
  }, []);

  return !activeClients.length ? (
    <div className={styles.noList}>
      <div className={styles.noListTitle}>
        <span>Lista de Clientes</span>
        <div className={styles.noListMessage}>
          <p>No se ha podido cargar la lista de Clientes</p>
          <p className={styles.error}>Error: {clientError}</p>
        </div>
      </div>
    </div>
  ) : (
    <div className={styles.container}>
      <div className={styles.welcomeMessage}>
        <Typography variant="h1">Lista de Clientes</Typography>
      </div>
      <div className={styles.inputsContainer}>
        <div className={styles.searchInputContainer}>
          <div className={styles.iconContainer}>
            <SearchIcon />
          </div>
          <input className={styles.searchInput} placeholder="Busqueda por palabra clave"></input>
        </div>
        <Button
          materialVariant={Variant.CONTAINED}
          onClick={() => handleNavigation('/clients/create')}
          label={'+ Agregar cliente'}
          testId={'addClientButton'}
          styles={'addButton'}
        />
      </div>
      <div className={styles.tableContainer}>
        <Table<ClientsData>
          showButtons={true}
          testId={'clientsTable'}
          headers={header}
          value={listClientsData}
          buttons={buttonsArray}
        />
      </div>
    </div>
  );
};

export default Clients;
