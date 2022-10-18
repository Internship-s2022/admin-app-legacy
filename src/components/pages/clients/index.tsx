import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@mui/material';

import { Button, Table } from 'src/components/shared/ui';
import { Variant } from 'src/components/shared/ui/button/types';
import { Headers } from 'src/components/shared/ui/table/types';
import { getClients } from 'src/redux/client/thunks';
import { RootState } from 'src/redux/store';
import { AppDispatch } from 'src/types';

import styles from './clients.module.css';

const Clients = () => {
  const dispatch: AppDispatch<null> = useDispatch();
  const listClients = useSelector((state: RootState) => state.client?.clients);

  const filteredClient = listClients.filter((item) => item.isActive === true);

  const listClientsData = filteredClient.map((item) => {
    return {
      id: item._id,
      name: item.name,
      projects: item.projects,
      clientContact: item.clientContact,
      localContact: item.localContact,
    };
  });

  const header: Headers[] = [
    { header: 'Cliente', key: 'name' },
    { header: 'Projectos', key: 'projects' },
    { header: 'Contacto cliente', key: 'clientContact' },
    { header: 'Contacto Radium', key: 'localContact' },
  ];

  useEffect(() => {
    dispatch(getClients());
  }, []);

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
  return !listClients.length ? (
    <div>
      <Button
        materialVariant={Variant.CONTAINED}
        onClick={() => undefined}
        label={'+ Agregar cliente'}
        testId={'addClientButton'}
        styles={'addButton'}
      />
    </div>
  ) : (
    <div className={styles.container}>
      <Typography variant="h1">Lista de Clientes</Typography>
      <div className={styles.inputsContainer}>
        <input className={styles.searchBar} placeholder="Buscar"></input>
        <Button
          materialVariant={Variant.CONTAINED}
          onClick={() => undefined}
          label={'+ Agregar cliente'}
          testId={'addClientButton'}
          styles={'addButton'}
        />
      </div>
      <div className={styles.tableContainer}>
        <Table
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
