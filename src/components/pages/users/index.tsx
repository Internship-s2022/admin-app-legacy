import React, { useState } from 'react';
import { Typography } from '@mui/material';

import { Button, Modal, Table } from 'src/components/shared/ui';
import { Variant } from 'src/components/shared/ui/button/types';

import styles from './users.module.css';
const Users = () => {
  const [open, isOpen] = useState(false);
  const users = [
    {
      name: 'Paula',
      role: 'Admin',
    },
  ];
  return (
    <>
      <div className={styles.welcomeMessage}>
        <Typography variant="h1">Bienvenido S.Admin!</Typography>
        <p>Esta es la lista de usuarios! Puedes asignarles el acceso que desees!</p>
      </div>
      <div className={styles.tableContainer}>
        <Table
          applyButton={true}
          buttonLabel={'Asignar acceso'}
          buttonTestId={'UserButton'}
          buttonVariant={Variant.CONTAINED}
          testId={'userTable'}
          headers={['Usuarios']}
          value={users}
          onClick={() => isOpen(true)}
        />
        <Button
          materialVariant={Variant.TEXT}
          onClick={() =>
            console.log('acá se va a abrir el modal con el form que va a hacer la chiqui')
          }
          label={'+ Agregar un nuevo usuario'}
          testId={'addUserButton'}
        />
      </div>
      <Modal testId={'User-access-modal'} isOpen={open} onClose={() => isOpen(!open)}>
        <div className={styles.modalMessage}>
          <p>This is the modal to change user&apos;s access</p>
        </div>
      </Modal>
    </>
  );
};

export default Users;
