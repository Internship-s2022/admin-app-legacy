import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@mui/material';

import { Button, Modal, Table } from 'src/components/shared/ui';
import { Variant } from 'src/components/shared/ui/button/types';
import { RootState } from 'src/redux/store';
import { getUsers } from 'src/redux/user/thunks';
import { User } from 'src/redux/user/types';
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
      firstName: item?.firstName,
      lastName: item?.lastName,
      accessRoleType: item?.accessRoleType,
    };
  });

  const header: Headers[] = [
    { header: 'Name', key: 'firstName' },
    { header: 'Last Name', key: 'lastName' },
    { header: 'Access Role', key: 'accessRoleType' },
  ];

  return (
    <>
      <div className={styles.welcomeMessage}>
        <Typography variant="h1">Bienvenido S.Admin!</Typography>
        <p>Esta es la lista de usuarios! Puedes asignarles el acceso que desees!</p>
      </div>
      <div className={styles.tableContainer}>
        <Table<User> testId={'userTable'} headers={header} value={listUserData} />
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
