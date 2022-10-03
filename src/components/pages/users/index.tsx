import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@mui/material';

import { Button, Modal, Table } from 'src/components/shared/ui';
import { Variant } from 'src/components/shared/ui/button/types';
import { formattedRoleType } from 'src/constants';
import { RootState } from 'src/redux/store';
import { getUsers } from 'src/redux/user/thunks';
import { AccessRoleType, User } from 'src/redux/user/types';
import { AppDispatch } from 'src/types';

import { Headers } from '../../shared/ui/table/types';
import styles from './users.module.css';
const Users = () => {
  const [open, isOpen] = useState(false);
  const dispatch: AppDispatch<null> = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const listUser = useSelector((state: RootState) => state.user?.users);

  const listUserData = listUser.map((item) => {
    return {
      id: item?._id,
      name: `${item?.firstName.substring(0, 1).toUpperCase() + item?.firstName.substring(1)} ${
        item?.lastName.substring(0, 1).toUpperCase() + item?.lastName.substring(1)
      }`,
      accessRoleType: item?.accessRoleType && formattedRoleType[item.accessRoleType],
    };
  });

  console.log(formattedRoleType[AccessRoleType.SUPER_ADMIN]);

  const header: Headers[] = [
    { header: 'Nombre', key: 'name' },
    { header: 'Rol de acceso', key: 'accessRoleType' },
  ];

  return (
    <>
      <div className={styles.welcomeMessage}>
        <Typography variant="h1">¡Bienvenido S.Admin!</Typography>
        <p>¡Esta es la lista de usuarios! Puedes asignarles el acceso que desees!</p>
      </div>
      <div className={styles.tableContainer}>
        <Table<User>
          showButtons={true}
          buttonVariant={Variant.CONTAINED}
          buttonLabel={'Editar Acceso'}
          buttonTestId={'table-button'}
          testId={'userTable'}
          headers={header}
          value={listUserData}
          onClick={() => isOpen(true)}
        />
        <div className={styles.addButton}>
          <Button
            materialVariant={Variant.TEXT}
            onClick={() =>
              console.log('acá se va a abrir el modal con el form que va a hacer la chiqui')
            }
            label={'+ Agregar un nuevo usuario'}
            testId={'addUserButton'}
          />
        </div>
      </div>
      <Modal testId={'User-access-modal'} isOpen={open} onClose={() => isOpen(!open)}>
        <div className={styles.modalMessage}>
          <p>Este es el Modal para cambiar el rol de acceso de cada usuario.</p>
        </div>
      </Modal>
    </>
  );
};

export default Users;
