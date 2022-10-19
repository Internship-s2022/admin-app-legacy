import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Table } from 'src/components/shared/ui';
import { Variant } from 'src/components/shared/ui/button/types';
import { getClients } from 'src/redux/client/thunks';
import { RootState } from 'src/redux/store';
import { AppDispatch } from 'src/types';
import { formattedTableData } from 'src/utils/formatters';

import styles from './clients.module.css';
import { header } from './constants';
import { ClientsData } from './types';

const Clients = () => {
  const dispatch: AppDispatch<null> = useDispatch();
  const listClients = useSelector((state: RootState) => state.client?.clients);
  const filteredClients = listClients.filter((item) => item.isActive === true);

  const listClientsData = filteredClients.map((item): ClientsData => {
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

  useEffect(() => {
    dispatch(getClients());
  }, []);

  return !listClients.length ? (
    <div className={styles.noList}>
      <span>No se ha podido cargar lista de clientes</span>
      <div>
        <Button
          materialVariant={Variant.CONTAINED}
          onClick={() => undefined}
          label={'+ Agregar cliente'}
          testId={'addClientButton'}
          styles={'addButton'}
        />
      </div>
    </div>
  ) : (
    <div className={styles.container}>
      <h1>Lista de Clientes</h1>
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
